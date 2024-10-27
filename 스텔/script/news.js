
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

    AOS.init();

    $('.btn-more').each(function () {
        const $btnMore = $(this);
        const $path = $btnMore.find('.btn_line');
        const $circle = $btnMore.find('.move');
        const moveSpeed = 0.005;

        let animationId;
        let currentPoint = 0;

        function updatePosition() {
            currentPoint = (currentPoint + moveSpeed) % 1;
            const pathLength = $path[0].getTotalLength();
            const point = $path[0].getPointAtLength(currentPoint * pathLength);

            $circle.attr({
                cx: point.x,
                cy: point.y
            });

            animationId = requestAnimationFrame(updatePosition);
        }

        $btnMore.on('mouseover', updatePosition);
        $btnMore.on('mouseout', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = undefined;
            }
        });
    });

    // 모든 버튼과 카드를 선택합니다.
    const buttons = document.querySelectorAll('.news-tab a');
    const cards = document.querySelectorAll('.news-card a');
    const itemCount = document.querySelector('.item_count span'); // 항목 수 표시 요소
    const btnMore = document.querySelector('.btn-more'); // "더보기" 버튼
    const initialVisibleCount = 4; // 처음 표시할 카드 수
    let visibleCount = initialVisibleCount; // 현재 표시되는 카드 수

    // 카테고리별 항목 수를 계산하여 업데이트하는 함수
    const updateItemCount = (category) => {
        let count = 0;

        cards.forEach(card => {
            const categoryText = card.querySelector('.event-type span').innerText.trim();
            if (category === "ALL" || categoryText === category) {
                count++;
            }
        });

        // 총 항목 수 업데이트
        itemCount.innerText = `총 ${count}건`;
    };

    // 카드를 표시하는 함수
    const showCards = (filterText) => {
        let count = 0;

        cards.forEach((card, index) => {
            const category = card.querySelector('.event-type span').innerText.trim();

            // 조건에 맞게 표시 또는 숨깁니다.
            if (filterText === "ALL" || category === filterText) {
                if (count < visibleCount) {
                    card.style.display = "block"; // 표시
                    count++;
                } else {
                    card.style.display = "none"; // 숨기기
                }
            } else {
                card.style.display = "none"; // 숨기기
            }
        });

        // 항목 수 업데이트
        updateItemCount(filterText);
    };

    // 버튼 클릭 시 필터링 함수
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 기본 동작을 막습니다.

            // 선택한 버튼의 텍스트를 가져옵니다.
            const filterText = button.innerText.trim();

            // 모든 카드를 표시합니다.
            showCards(filterText);

            // 선택된 버튼 스타일 업데이트 (선택된 버튼만 'on' 클래스 추가)
            buttons.forEach(btn => btn.classList.remove('on'));
            button.classList.add('on');
        });
    });

    // "더보기" 버튼 클릭 시 추가 카드 표시
    btnMore.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 동작을 막습니다.

        // 표시할 카드 수 증가
        visibleCount += 4;

        // 현재 선택된 탭의 버튼을 가져옵니다.
        const activeButton = document.querySelector('.news-tab a.on');
        const filterText = activeButton.innerText.trim();

        // 카드를 다시 표시합니다.
        showCards(filterText);
    });

    // 초기 상태에서 ALL 버튼 클릭 시 항목 수 업데이트
    showCards("ALL");

})