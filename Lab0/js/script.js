/**
DISCLOSURE: help of ChatGPT. 
- Clarifications were sought on the usage of specific BOM (Browser Object Model) and DOM (Document Object Model) functions.
- Key areas of inquiry included:
  - Dynamically positioning buttons within the viewport using the `shuffleButtons` method.
  - Implementing game logic for sequence validation in the `enableMemoryTest` method.
*/

class Button{
    constructor() {
        this.correctOrder = [];
    }
    createButton(input) {
        const container = document.getElementById("button-container");
        container.innerHTML = "";
        this.correctOrder = [];
        for (let i = 1; i <= input; i++) {
            const button = document.createElement("button");
            button.textContent = `${i}`;
            button.className = "dynamic-button";
            button.style.backgroundColor = this.getRandomColor();
            this.correctOrder.push(i);
            container.appendChild(button);
        }
    } 
    
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

class Game{
    constructor(buttonInstance) {
        this.buttonInstance = buttonInstance; 
    }
    shuffleButtons() {
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

    hideNumbers() {
        const buttons = document.querySelectorAll(".dynamic-button");
        buttons.forEach(button => {
            button.textContent = "";
        });
    }

    enableMemoryTest() {
        const buttons = document.querySelectorAll(".dynamic-button");
        let userClicks = []; 
        let currentIndex = 0; 

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const buttonIndex = Array.from(buttons).indexOf(button) + 1;
                if (buttonIndex === this.buttonInstance.correctOrder[currentIndex]) {
                    userClicks.push(buttonIndex); 
                    button.textContent = buttonIndex;
                    currentIndex++; 
                    if (userClicks.length === this.buttonInstance.correctOrder.length) {
                        alert(messages.correctOrder);
                    }
                } else {
                    alert(messages.wrongOrder);
                    window.location.reload(); 
                }
            });
        });
    }
}


class GameController {
    constructor() {
        this.button = new Button();
        this.game = new Game(this.button);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async gameStart() {
        const input = Number(document.getElementById('user-input').value);
        if (!input || isNaN(input) || input < 3 || input > 7) {
            alert(messages.invalidInput);
            return false
        } else {
            this.button.createButton(input);
            await this.sleep(input * 1000);
            
            for (let i = 0; i < input - 1; i++) {
                this.game.shuffleButtons();
                await this.sleep(2000);
            }
            
            this.game.shuffleButtons();
            this.game.hideNumbers();
            this.game.enableMemoryTest();
            return true;
        }
    }
}
const gameController = new GameController();

function GameStart() {
    gameController.gameStart();
}