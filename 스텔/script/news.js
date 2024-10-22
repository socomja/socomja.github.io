document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        speed: 750,
        loop: true, // 슬라이드 반복
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // 페이지네이션 클릭 가능하게 설정
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, // 3초마다 자동 슬라이드 전환
        },
    });
});
