// // 요소 선택
// const btnMore = document.querySelectorAll('.btn-more');
// const moveN = document.querySelectorAll('.move_n');
// const move = document.querySelectorAll('.move');

// // hover 시 이벤트 설정
// btnMore.addEventListener('mouseover', function () {
//     moveN.style.opacity = '0';  // move_n 투명하게
//     move.style.opacity = '1';   // move 나타내기
// });

// // hover 해제 시 이벤트 설정
// btnMore.addEventListener('mouseout', function () {
//     moveN.style.opacity = '1';  // move_n 다시 보이기
//     move.style.opacity = '0';   // move 숨기기
// });

$(() => {
    const newsItems = document.querySelectorAll('.news-list li a');

    newsItems.forEach(item => {
        const date = item.parentElement.querySelector('.date'); // <a> 요소의 부모 <li>에서 .date 요소 선택

        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
            date.style.transform = 'translate(-6%, -125%)';
            date.style.transition = 'transform 0.3s ease';// .date 위치 조정
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            date.style.transform = 'translateY(-100%)'; // 원래 위치로 복구
        });
    });






    // const $btnMore = $('.btn-more')
    // const $moveN = $(".move_n")

    // let test = 0

    // $btnMore.on('mouseover', function () {
    //     const currentBtn = $(this)
    //     // currentBtn.find($move).css('opacity', 1)
    //     // currentBtn.find($moveN).css('opacity', 0)

    //     setPositionAtRatio(path[0], circle[0], path[0].getTotalLength(), Math.random())
    // })
    // $btnMore.on('mouseout', function () {
    //     const currentBtn = $(this)
    //     // currentBtn.find($move).css('opacity', 0)
    //     // currentBtn.find($moveN).css('opacity', 1)
    // })

    // function setPositionAtRatio(path, circle, ratio) {
    //     const point = path.getPointAtLength(ratio * path.getTotalLength());
    //     circle.setAttribute('cx', point.x)
    //     circle.setAttribute('cy', point.y)
    // }

    // function updateTest() {
    //     const path = $btnMore.find($('.btn_line'))
    //     const circle = $btnMore.find($moveN)

    //     test = (test + 0.005) % 1

    //     setPositionAtRatio(path[0], circle[0], test)
    //     requestAnimationFrame(updateTest)
    // }
    // updateTest()

    // const path = document.getElementById('line');
    // const circle = document.getElementById('circle');
    // const pathLength = path.getTotalLength();

    // // 0~1 사이의 비율에 해당하는 좌표 구하기
    // function setPositionAtRatio(ratio) {
    //     const point = path.getPointAtLength(ratio * pathLength);
    //     circle.setAttribute('cx', point.x);
    //     circle.setAttribute('cy', point.y);
    // }
})