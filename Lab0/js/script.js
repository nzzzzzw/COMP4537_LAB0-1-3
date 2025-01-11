function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function GameStart() {
    let input = Number(document.getElementById('user-input').value);
    if (!input || isNaN(input) || input < 3 || input > 7) {
        alert(messages.invalidInput);
        return false
    } else {
        createButton(input);
        await sleep(input * 1000);
        for (let i = 0; i < input - 1; i++) {
            shuffleButtons();
            await sleep(2000);
        }
        shuffleButtons();
        hideNumbers();
        enableMemoryTest();
        return true;
    }
}
function createButton(input) {
    const container = document.getElementById("button-container");
    container.innerHTML = "";
    correctOrder = [];
    for (let i = 1; i <= input; i++) {
        const button = document.createElement("button");
        button.textContent = `${i}`;
        button.className = "dynamic-button";
        button.style.backgroundColor = getRandomColor();
        correctOrder.push(i);
        container.appendChild(button);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function shuffleButtons() {
    const buttons = document.querySelectorAll(".dynamic-button");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    buttons.forEach(button => {
        const randomTop = Math.floor(Math.random() * (windowHeight - button.offsetHeight));
        const randomLeft = Math.floor(Math.random() * (windowWidth - button.offsetWidth));
        button.style.position = "absolute";
        button.style.top = `${randomTop}px`;
        button.style.left = `${randomLeft}px`;
    });
}

function hideNumbers() {
    const buttons = document.querySelectorAll(".dynamic-button");
    buttons.forEach(button => {
        button.textContent = "";
    });
}

function enableMemoryTest() {
    const buttons = document.querySelectorAll(".dynamic-button");
    let userClicks = []; // 用于记录用户点击的顺序
    let currentIndex = 0; // 当前需要点击的正确顺序索引

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // 获取当前按钮在正确顺序中的编号
            const buttonIndex = Array.from(buttons).indexOf(button) + 1;

            // 检查用户点击是否与正确顺序匹配
            if (buttonIndex === correctOrder[currentIndex]) {
                // 点击正确
                userClicks.push(buttonIndex); // 记录用户的点击
                button.textContent = buttonIndex; // 显示数字
                currentIndex++; // 更新到下一个正确的索引

                // 检查是否完成所有点击
                if (userClicks.length === correctOrder.length) {
                    alert(messages.correctOrder);
                }
            } else {
                // 点击错误
                alert(messages.wrongOrder);
                window.location.reload(); // 重新加载页面
            }
        });
    });
}