/* ============================================================
 * app.js — 렌더링 + 전공 선택 강조 로직
 * 전역 함수만 사용 (모듈 없음). data.js 의 전역을 참조한다.
 * ============================================================ */

/* 현재 선택된 전공 id (없으면 null) */
let _selectedMajorId = null;

/* 전공 선택 칩 묶음 렌더 -------------------------------------- */
function renderMajorPicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const groups = [
    { label: '이공계열',     cat: '이공' },
    { label: '인문·사회계열', cat: '인문사회' },
  ];

  let html = '';
  groups.forEach(g => {
    const list = MAJORS.filter(m => m.category === g.cat);
    html += `<div class="major-group-label">${g.label}</div><div class="chips">`;
    list.forEach(m => {
      html += `<button class="chip" data-major="${m.id}" onclick="selectMajor('${m.id}')">${m.name}</button>`;
    });
    html += `</div>`;
  });
  el.innerHTML = html;
}

/* 전공 선택 → 강조 갱신 -------------------------------------- */
function selectMajor(majorId) {
  // 같은 칩 다시 누르면 해제(토글)
  _selectedMajorId = (_selectedMajorId === majorId) ? null : majorId;

  // 칩 active 상태 갱신
  document.querySelectorAll('.chip[data-major]').forEach(c => {
    c.classList.toggle('active', c.dataset.major === _selectedMajorId);
  });

  applyHighlight();
  updateHint();
}

/* 강조 적용 (과목 칩에 core/recommend 클래스 부여) ------------ */
function applyHighlight() {
  const major = MAJORS.find(m => m.id === _selectedMajorId);
  document.querySelectorAll('.subj').forEach(s => {
    s.classList.remove('core', 'recommend');
    if (!major) return;
    const name = s.dataset.subject;
    if (major.core.includes(name))           s.classList.add('core');
    else if (major.recommend.includes(name)) s.classList.add('recommend');
  });
}

/* 선택 안내 문구 갱신 ---------------------------------------- */
function updateHint() {
  const el = document.getElementById('hint');
  if (!el) return;
  const major = MAJORS.find(m => m.id === _selectedMajorId);
  if (!major) {
    el.textContent = '👆 전공(계열)을 선택하면 각 학교에서 들어야 할 핵심·권장 과목이 강조됩니다.';
    return;
  }
  el.innerHTML =
    `📌 <strong>${major.name}</strong> — ` +
    `핵심: ${major.core.join(', ')}` +
    (major.recommend.length ? ` &nbsp;/&nbsp; 권장: ${major.recommend.join(', ')}` : '');
}

/* 학교 목록 페이지 렌더 (type 별) ---------------------------- */
function renderSchoolPage(type) {
  const meta = SCHOOL_TYPES[type];
  const titleEl = document.getElementById('pageTitle');
  if (titleEl && meta) titleEl.textContent = `${meta.emoji} ${meta.label}`;

  const wrap = document.getElementById('schools');
  if (!wrap) return;

  const list = SCHOOLS.filter(s => s.type === type);
  let html = '';
  list.forEach(school => {
    html += `<section class="school"><h2>${school.name}</h2><div class="subjects">`;
    school.subjects.forEach(sub => {
      html += `<span class="subj" data-subject="${sub}">${sub}</span>`;
    });
    html += `</div><div class="todo">※ 더미 데이터 — 실제 학년·학기·단위수 편성표로 교체 예정</div></section>`;
  });
  wrap.innerHTML = html;

  applyHighlight(); // 초기 상태 반영
  updateHint();
}

/* ============================================================
 * 테마 토글 (라이트 기본 ↔ 다크). 선택은 localStorage 저장.
 * FOUC 방지용 적용은 각 페이지 <head> 인라인 스크립트가 담당.
 * ============================================================ */
const _hteThemeKey = 'hte_theme';

function toggleTheme() {
  const html = document.documentElement;
  const toDark = html.getAttribute('data-theme') !== 'dark';
  if (toDark) html.setAttribute('data-theme', 'dark');
  else        html.removeAttribute('data-theme');
  try { localStorage.setItem(_hteThemeKey, toDark ? 'dark' : 'light'); } catch (e) {}
  _syncThemeToggle();
}

function _syncThemeToggle() {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-toggle').forEach(b => {
    b.textContent = dark ? '☀️' : '🌙';
    b.title = dark ? '라이트 모드로 전환' : '다크 모드로 전환';
  });
}

// 헤더 버튼은 스크립트보다 먼저 파싱되므로 즉시 동기화 가능
_syncThemeToggle();
