
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        speed: 750,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,
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


    const buttons = document.querySelectorAll(".news-tab a");
    const cards = document.querySelectorAll(".news-card li");
    const itemCount = document.querySelector(".item_count span");
    const initialVisibleCount = 4;

    function updateItemCount(count) {
        itemCount.textContent = `총 ${count}건`;
    }

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const filter = button.querySelector("li").textContent.trim();

            buttons.forEach(btn => btn.classList.remove("on"));
            button.classList.add("on");

            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.querySelector(".event-type span").textContent.trim();

                if (filter === "ALL" || filter === category) {
                    card.parentElement.style.display = "block";
                    visibleCount++;
                } else {
                    card.parentElement.style.display = "none";
                }
            });

            updateItemCount(visibleCount);
        });
    });

    updateItemCount(cards.length);
});
