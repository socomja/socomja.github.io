document.getElementById("saveJsonBtn").addEventListener("click", () => {
    if (!cards || cards.length === 0) {
        alert("저장할 카드 데이터가 없습니다.");
        return;
    }

    const now = new Date();
    const formatted =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + "_" +
        String(now.getHours()).padStart(2, "0") + "-" +
        String(now.getMinutes()).padStart(2, "0") + "-" +
        String(now.getSeconds()).padStart(2, "0");

    const filename = `cards_${formatted}.json`;

    const blob = new Blob([JSON.stringify(cards, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`JSON 파일로 저장됨: ${filename}`);
});

// 🔹 불러오기 버튼
document.getElementById("loadJsonBtn").addEventListener("click", () => {
    document.getElementById("loadJsonInput").click();
});

document.getElementById("loadJsonInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const loaded = JSON.parse(e.target.result);
            if (!Array.isArray(loaded)) throw new Error("JSON 형식이 올바르지 않습니다.");

            cards = loaded;
            localStorage.setItem("cardsData", JSON.stringify(cards));
            alert("카드 데이터가 불러와졌습니다!");
            changeSet(1); // 기본 1탄 갱신
        } catch (err) {
            alert("JSON 파일을 읽는 중 오류가 발생했습니다.");
            console.error(err);
        }
    };
    reader.readAsText(file);
});