let cards = [];

// 🔹 모달 생성 함수 (카드 수 조절 가능)
function showCardModal(card) {
    // 기존 모달 제거
    let existingModal = document.getElementById('card-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'card-modal';
    modal.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.7); display:flex;
        justify-content:center; align-items:center; z-index:9999;
    `;

    modal.innerHTML = `
        <div style="background:#fff; padding:20px; border-radius:12px; max-width:500px; width:90%; text-align:center; position:relative;">
            <button id="closeModal" style="position:absolute; top:10px; right:10px;">X</button>
            <img src="${card.image}" alt="${card.name}" style="width:100%; border-radius:12px; margin-bottom:10px;">
            <h3>${card.character}</h3>
            <p>${card.name}</p>
            <div style="display:flex; justify-content:center; align-items:center; gap:10px; margin-top:10px;">
                <button id="minusBtn">-</button>
                <input type="number" id="cardCount" value="${card.count}" min="0" style="width:60px; text-align:center;">
                <button id="plusBtn">+</button>
            </div>
            <button id="saveCount" style="margin-top:10px;">저장</button>
        </div>
    `;

    document.body.appendChild(modal);

    const input = modal.querySelector('#cardCount');

    modal.querySelector('#minusBtn').addEventListener('click', () => {
        if (input.value > 0) input.value = parseInt(input.value) - 1;
    });

    modal.querySelector('#plusBtn').addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
    });

    modal.querySelector('#saveCount').addEventListener('click', () => {
        const newCount = parseInt(input.value);
        card.count = newCount;
        card.owned = newCount > 0; // 0이면 false, 1 이상이면 true

        // localStorage에 갱신
        localStorage.setItem('cardsData', JSON.stringify(cards));

        modal.remove();
        const setNumber = card.image.match(/img\/(\d+)탄/)[1];
        changeSet(setNumber);
    });

    modal.querySelector('#closeModal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
}

// 🔹 카드 렌더링
function changeSet(setNumber) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    // 버튼 active 처리 (Swiper 구조 기준)
    document.querySelectorAll('.set-swiper .button').forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.set-swiper .button[onclick="changeSet(${setNumber})"]`);
    if (activeButton) activeButton.classList.add('active');

    const filtered = cards.filter(card => card.image.startsWith(`img/${setNumber}탄`));

    const grades = [
        { grade: '4성', img: 'img/grade/star_4.png' },
        { grade: '3성', img: 'img/grade/star_3.png' },
        { grade: '2성', img: 'img/grade/star_2.png' }
    ];

    grades.forEach(({ grade, img: gradeImg }) => {
    const gradeCards = filtered.filter(card => card.image.includes(`/${grade}/`));
    if (gradeCards.length > 0) {
        // grade-header 생성
        const gradeHeader = document.createElement('div');
        gradeHeader.className = 'grade-header';

        // inner div 생성
        const innerDiv = document.createElement('div');
        innerDiv.className = 'inner';

        // 이미지 삽입
        const img = document.createElement('img');
        img.src = gradeImg;
        img.alt = grade;

        innerDiv.appendChild(img);
        gradeHeader.appendChild(innerDiv);

        container.appendChild(gradeHeader);

        // 등급별 카드 컨테이너
        const gradeContainer = document.createElement('div');
        gradeContainer.className = 'card-container';

        gradeCards.forEach(card => {
            const div = document.createElement('div');
            div.className = `card ${card.owned ? 'owned' : 'not-owned'}`;
            div.innerHTML = `
                <a href="#" class="card-link">
                    <img src="${card.image}" alt="${card.name}">
                    <div class="card-info">
                        <span class="character">${card.character}</span>
                        <span class="name">${card.name}</span>
                        <span class="count">${card.count}장</span>
                    </div>
                </a>
            `;
            div.querySelector('.card-link').addEventListener('click', (e) => {
                e.preventDefault();
                showCardModal(card);
            });
            gradeContainer.appendChild(div);
        });

        container.appendChild(gradeContainer);
    }
});

}

// 🔹 JSON 불러오기 및 localStorage 체크
async function loadCards() {
    const saved = localStorage.getItem('cardsData');
    if (saved) {
        cards = JSON.parse(saved);
    } else {
        const res = await fetch('cards.json');
        cards = await res.json();
        localStorage.setItem('cardsData', JSON.stringify(cards));
    }
    changeSet(1);
}

loadCards();


