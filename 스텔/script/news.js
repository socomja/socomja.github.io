
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

$(() => {
    // 모든 버튼과 카드를 선택합니다.
    const buttons = document.querySelectorAll('.news-tab a');
    const cards = document.querySelectorAll('.news-card a');

    // 버튼 클릭 시 필터링 함수
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작을 막습니다.

            // 선택한 버튼의 텍스트를 가져옵니다.
            const filterText = button.innerText.trim();

            // 모든 카드를 순회하면서 조건에 맞게 표시 또는 숨깁니다.
            cards.forEach(card => {
                const category = card.querySelector('.event-type span').innerText.trim();

                if (filterText === "ALL" || category === filterText) {
                    card.style.display = "block"; // 표시
                } else {
                    card.style.display = "none"; // 숨기기
                }
            });

            // 선택된 버튼 스타일 업데이트 (선택된 버튼만 'on' 클래스 추가)
            buttons.forEach(btn => btn.classList.remove('on'));
            button.classList.add('on');
        });
    });

})