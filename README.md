# COMP4537
# Button Memory Game

This is a simple memory game implemented using HTML, CSS, and JavaScript. The player is asked to remember the order of buttons that are displayed on the screen. After the buttons are scrambled and their labels hidden, the player must click them in the correct order to win the game.

## Features

- **Dynamic Button Generation**: Users can input a number between 3 and 7 to create buttons dynamically.
- **Random Colors**: Each button is assigned a random background color.
- **Scrambling Logic**: Buttons are moved to random positions within the browser window after a delay.
- **Memory Test**: The labels on the buttons are hidden, and users must recall the correct order by clicking the buttons.
- **Feedback**:
  - If the order is correct, the message "Excellent memory!" is displayed.
  - If the order is wrong, the message "Wrong order!" is displayed, and the correct order is revealed.

---

## Project Structure
project-folder/
├── index.html         # Main HTML file
├── css/
│   └── style.css      # Styling for the game
├── js/
│   └── script.js      # Main game logic
├── lang/
│   └── messages/
│       └── en/
│           └── user.js # Message constants
└── README.md          # Project documentation

---

## How to Use

1. Clone this repository
2. Navigate to the project directory and open the index.html file in your browser.
3. Enter a number (between 3 and 7) in the input box and click Go.
4. Wait for the buttons to scramble, then click them in the original order.