/* landing-sections.js
 * 상담예약 · 오시는길 · 바로가기 섹션을 모든 페이지에 공통 주입.
 * 각 HTML의 <div id="landing-sections-mount"></div> 에 삽입된다.
 */
(function () {
  var mount = document.getElementById('landing-sections-mount');
  if (!mount) return;

  mount.innerHTML =
    /* ── 상담 예약 ── */
    '<section class="consult-section">' +
      '<div class="section-hd">' +
        '<h2 class="section-big-title">상담 예약</h2>' +
        '<p class="section-lead">편리한 방법으로 상담을 예약해 주세요.</p>' +
        '<p class="section-desc-sm">전문 상담사가 친절하게 안내해 드립니다.</p>' +
      '</div>' +
      '<div class="consult-row">' +
        '<a class="cbtn cbtn--primary" href="#">온라인 상담예약</a>' +
        '<div class="consult-phone">' +
          '<span class="phone-label">전화 상담</span>' +
          '<a class="phone-num" href="tel:031-751-8008">031-751-8008</a>' +
        '</div>' +
      '</div>' +
    '</section>' +

    /* ── 오시는 길 ── */
    '<section class="location-section">' +
      '<div class="section-hd">' +
        '<p class="eyebrow eyebrow--bold">LOCATION</p>' +
        '<h2 class="section-big-title">오시는 길</h2>' +
        '<p class="location-addr">경기 성남시 중원구 광명로 124 5층 하이탑에듀 고등대입전문관</p>' +
        '<a class="map-link-btn" href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%20%EC%84%B1%EB%82%A8%EC%8B%9C%20%EC%A4%91%EC%9B%90%EA%B5%AC%20%EA%B4%91%EB%AA%85%EB%A1%9C%20124" target="_blank" rel="noopener">네이버 지도에서 보기 →</a>' +
      '</div>' +
      '<div class="map-frame-wrap">' +
        '<iframe src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0+%EC%84%B1%EB%82%A8%EC%8B%9C+%EC%A4%91%EC%9B%90%EA%B5%AC+%EA%B4%91%EB%AA%85%EB%A1%9C+124&output=embed&hl=ko&z=17" width="100%" height="360" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="학원 위치 지도"></iframe>' +
      '</div>' +
    '</section>' +

    /* ── 바로가기 ── */
    '<section class="site-links-section">' +
      '<p class="eyebrow">바로가기</p>' +
      '<div class="site-links">' +
        '<a class="site-link-item" href="https://www.hightopedu.kr/?intro=start#intro" target="_blank" rel="noopener">' +
          '<span class="sl-label">학원 홈페이지</span>' +
          '<span class="sl-arrow">→</span>' +
        '</a>' +
        '<a class="site-link-item" href="https://blog.naver.com/hightopmath" target="_blank" rel="noopener">' +
          '<span class="sl-label">학원 블로그</span>' +
          '<span class="sl-arrow">→</span>' +
        '</a>' +
        '<a class="site-link-item" href="https://www.youtube.com/@TV-lz4xi" target="_blank" rel="noopener">' +
          '<span class="sl-label">학원 유튜브</span>' +
          '<span class="sl-arrow">→</span>' +
        '</a>' +
      '</div>' +
    '</section>';
})();
