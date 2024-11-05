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
    const buttons = document.querySelectorAll(".music-tab a");
    const cards = document.querySelectorAll(".music-card li");
    const itemCount = document.querySelector(".item_count span");
    const initialVisibleCount = 4;

    function updateItemCount(count) {
        itemCount.textContent = `총 ${count}건`;
    }

    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();

            const filter = button.querySelector(".music-tab li").textContent.trim();

            buttons.forEach(btn => btn.classList.remove("on"));
            button.classList.add("on");

            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.querySelector(".song-type span").textContent.trim();

                if (filter === "ALL" || filter === category) {
                    card.style.display = "inline-flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            updateItemCount(visibleCount);
        });
    });

    function highlightText_Riko(element_Riko) {
        const text_Riko = element_Riko.textContent;
        const regex_Riko = /Yuzuha Riko/g;
        const newHTML_Riko = text_Riko.replace(regex_Riko, (match) => `<span class="Yuzuha_Riko">${match}</span>`);
        element_Riko.innerHTML = newHTML_Riko;
    }

    // Highlight the text initially
    cards.forEach(card => {
        const textElement_Riko = card.querySelector("p");
        highlightText_Riko(textElement_Riko);

        // Add hover effect to the entire li element
        card.addEventListener("mouseenter", () => {
            const highlighted_Riko = textElement_Riko.querySelectorAll(".Yuzuha_Riko");
            highlighted_Riko.forEach(span => {
                span.style.color = "#33b08d"; // Change color on hover
                span.style.transition = "0.2s"; // Add transition for color change
            });
        });

        card.addEventListener("mouseleave", () => {
            const highlighted_Riko = textElement_Riko.querySelectorAll(".Yuzuha_Riko");
            highlighted_Riko.forEach(span => {
                span.style.color = "#424242"; // Reset to default color
                span.style.transition = "0.2s";
            });
        });
    });

    // function highlightText(element) {
    //     const text = element.textContent;
    //     const regex = /Aokumo Rin/g;
    //     const newHTML = text.replace(regex, (match) => `<span class="Aokumo_Rin">${match}</span>`);
    //     element.innerHTML = newHTML;
    // }

    // // Highlight the text initially
    // cards.forEach(card => {
    //     const textElement = card.querySelector("p");
    //     highlightText(textElement);

    //     // Add hover effect to the entire li element
    //     card.addEventListener("mouseenter", () => {
    //         const highlighted = textElement.querySelectorAll(".Aokumo_Rin");
    //         highlighted.forEach(span => {
    //             span.style.color = "#0dd"; // Change color on hover
    //             span.style.transition = "0.2s"; // Add transition for color change
    //         });
    //     });

    //     card.addEventListener("mouseleave", () => {
    //         const highlighted = textElement.querySelectorAll(".Aokumo_Rin");
    //         highlighted.forEach(span => {
    //             span.style.color = "#424242"; // Reset to default color
    //             span.style.transition = "0.2s";
    //         });
    //     });
    // });


    // const data = {
    //     "Yuzuha Riko": { color: "#33b08d", transition: "0.2s" },
    //     "Aokumo Rin": { color: "#0e1841", transition: "0.2s" },
    //     "Third Keyword": { color: "green", transition: "0.2s" }
    // };

    // // const cards = document.querySelectorAll(".music-card li");

    // cards.forEach(card => {
    //     card.addEventListener("mouseover", () => {
    //         const text = card.textContent;
    //         for (const key in data) {
    //             if (text.includes(key)) {
    //                 const regex = new RegExp(`(${key})`, 'g');
    //                 const highlightedText = text.replace(regex, `<span class="highlight">${key}</span>`);
    //                 card.innerHTML = highlightedText;
    //                 const highlightSpan = card.querySelector('.highlight');
    //                 highlightSpan.style.color = data[key].color;
    //                 highlightSpan.style.transition = data[key].transition;
    //                 break; // 첫 번째 일치만 찾고 종료
    //             }
    //         }
    //     });

    //     card.addEventListener("mouseout", () => {
    //         card.innerHTML = card.textContent; // 원래 텍스트로 되돌리기
    //     });
    // });

    updateItemCount(cards.length);
});
