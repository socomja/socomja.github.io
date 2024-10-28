// 모든 .icon 안의 <a> 태그를 선택
$(() => {
    const icons = document.querySelectorAll('.icon a');

    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-15px)';
            icon.style.transition = 'transform 0.3s ease';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0)';
        });
    });

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
})