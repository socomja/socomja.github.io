// 요소 선택
const btnMore = document.querySelector('.btn-more');
const moveN = document.querySelector('.move_n');
const move = document.querySelector('.move');

// hover 시 이벤트 설정
btnMore.addEventListener('mouseover', function () {
    moveN.style.opacity = '0';  // move_n 투명하게
    move.style.opacity = '1';   // move 나타내기
});

// hover 해제 시 이벤트 설정
btnMore.addEventListener('mouseout', function () {
    moveN.style.opacity = '1';  // move_n 다시 보이기
    move.style.opacity = '0';   // move 숨기기
});

