/**
DISCLOSURE: help of ChatGPT for checking some js,bom and dom functions
Key functionalities implemented:
- JSON strings in localStorage.
- Parsing JSON strings from localStorage.
- JavaScript's Date object like isplaying and updating time.
*/
class NoteReader {
    constructor(notes, timestamp) {
        this.notesContainer = document.getElementById(notes);
        this.timestampElement = document.getElementById(timestamp);
        this.init();
    }

    // init function to load notes and update timestamp
    init() {
        this.loadNotes();
        setInterval(() => this.loadNotes(), 2000); 
    }

    // function to update timestamp
    updateTimestamp() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        this.timestampElement.textContent = `Updated at: ${formattedTime}`;
    }

    // fucntion to load notes from localStorage
    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        this.renderNotes(savedNotes);
        this.updateTimestamp();
    }

    // function to render notes
    renderNotes(notes) {
        this.notesContainer.innerHTML = ''; 
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = note;
            this.notesContainer.appendChild(noteElement);
        });
    }
}

// create a new instance of NoteReader when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NoteReader('notes', 'timestamp');
});