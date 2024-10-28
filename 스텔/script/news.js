
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
    // const $itemCountSpan = $('.item_count span')
    // const $cards = $('.news-card > li')
    // const maxVisibleCount = $cards.length - 1
    // let currentVisibleCount = 3

    // function updateNewsCard() {
    //     for (let i = 0; i < maxVisibleCount; i++) {
    //         $cards.eq(i).css('display', i < currentVisibleCount ? 'block' : 'none')
    //     }
    //     // $itemCountSpan.textContent = `총 ${currentVisibleCount}건`;
    // }

    // $('.news-card .btn-more').on('click', function (e) {
    //     e.originalEvent.preventDefault()
    //     currentVisibleCount = maxVisibleCount
    //     updateNewsCard()
    // })

    // updateNewsCard()
    const buttons = document.querySelectorAll(".news-tab a");
    const cards = document.querySelectorAll(".news-card li a");
    const itemCount = document.querySelector(".item_count span");
    const initialVisibleCount = 4;

    function updateItemCount(count) {
        itemCount.textContent = `총 ${count}건`;
    }

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const filter = button.querySelector(".news-tab li").textContent.trim();

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
