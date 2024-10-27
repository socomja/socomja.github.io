
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

    // 모든 버튼과 카드 요소들을 선택
    const buttons = document.querySelectorAll(".news-tab a");
    const cards = document.querySelectorAll(".news-card");


    // 각 버튼에 클릭 이벤트 추가
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            // 클릭된 버튼 텍스트 가져오기
            const filter = button.textContent.trim();

            // 모든 버튼에서 활성화 클래스를 제거하고 클릭된 버튼에만 추가
            buttons.forEach(btn => btn.classList.remove("on"));
            button.classList.add("on");

            // 각 카드의 내용을 확인하여 표시/숨김 처리
            cards.forEach(card => {
                // 각 카드의 카테고리 가져오기
                const category = card.querySelector(".event-type span").textContent.trim();

                if (filter === "ALL" || filter === category) {
                    card.style.display = "block"; // 해당 카테고리가 맞으면 표시
                } else {
                    card.style.display = "none"; // 아니면 숨김 처리
                }
            });
        });
    });

})