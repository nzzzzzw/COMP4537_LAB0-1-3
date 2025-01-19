/**
DISCLOSURE: help of ChatGPT for checking some js,bom and dom functions
Key functionalities implemented:
- JSON strings in localStorage.
- Parsing JSON strings from localStorage.
- JavaScript's Date object like isplaying and updating time.
*/

class NoteWriter {
    constructor(notes, addNote,timestamp) {
        this.notesContainer = document.getElementById(notes);
        this.addNoteButton = document.getElementById(addNote);
        this.timestampElement = document.getElementById(timestamp);
        this.init();
    }

    init() {
        this.loadNotes();
        this.addNoteButton.addEventListener('click', () => this.addNote());
        setInterval(() => this.saveNotes(), 2000); 
    }

    // function to update timestamp
    updateTimestamp() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        this.timestampElement.textContent = `Stored at: ${formattedTime}`;
    }

    // fucntion to save the notes arrary to localStorage as a json string
    saveNotes() {
        const notes = [];
        const noteElements = this.notesContainer.querySelectorAll('.note textarea');
        noteElements.forEach(note => notes.push(note.value));
        localStorage.setItem('notes', JSON.stringify(notes));
        this.updateTimestamp();
    }

    // fucntion to load the notes from localStorage
    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(content => this.createNoteElement(content));
        this.updateTimestamp();
    }

    // dynamically create a new note element and a remove button
    createNoteElement(content = '') { // default content is an empty string
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <textarea class="note-textarea" >${content}</textarea>
            <br>
            <button class="remove">Remove</button>
            <br>
            <br>
        `;
        this.notesContainer.appendChild(noteElement);

        // add event listener to remove button
        const removeButton = noteElement.querySelector('.remove');
        removeButton.addEventListener('click', () => {
            noteElement.remove();
            this.saveNotes();
        });
    }

    // add a new note element to the notes container
    addNote() {
        this.createNoteElement();
        this.saveNotes();
    }
}

// create a new instance of NoteWriter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NoteWriter('notes', 'addNote', 'timestamp');
});