$(() => {
    const defaultVisibleCount = 6;
    const moreCount = 3;
    const defaultCategory = "ALL";

    const $filterButtons = $(".music-tab a");
    const $itemCountLabel = $(".item_count span");
    const $cards = $(".music-card li");
    const $btnMore = $(".btn-more");

    const currentData = {
        count: defaultVisibleCount,
        category: defaultCategory,
    };

    function setItemCount(count) {
        $itemCountLabel.text(`총 ${count}건`);
    }

    function filterItems(category) {
        console.log(`filtering ${category}`);
        let validCount = 0;
        const isAllShow = category === "ALL";
        $cards.each((_, card) => {
            const $card = $(card);
            const cardCategory = $card.find(".song-type span").text().trim().toUpperCase(); // otherwise, .attr()
            const isValidCard = isAllShow || cardCategory === category;

            if (isValidCard) {
                if (validCount < currentData.count) {
                    $card.show();
                } else {
                    $card.hide();
                }
                ++validCount;
            } else {
                $card.hide();
            }
        });
        setItemCount(validCount);
        $btnMore.toggle(validCount > currentData.count);
        AOS.refresh(); // when filtering AOS broken, AOS update...
    }

    $filterButtons.each((_, button) => {
        const $button = $(button);
        const category = $button.children("li").text().trim().toUpperCase();

        $button.on("click", () => {
            currentData.count = defaultVisibleCount;
            currentData.category = category;

            $button.addClass("on");
            $button.siblings().removeClass("on");
            filterItems(category);
            return false; // otherwise, event.originalEvent.preventDefault();
        });
    });
    $btnMore.on("click", () => {
        currentData.count += moreCount;
        filterItems(currentData.category);
        return false;
    });

    filterItems(currentData.category);
});
