/**
DISCLOSURE: help of ChatGPT for checking some js,bom and dom functions
- Key areas of inquiry included:
  - Dynamically positioning buttons within the viewport using the `shuffleButtons` method.
  - Implementing game logic for sequence validation in the `enableMemoryTest` method.
  - Implement delays for better game flow through promises and `async/await`.
*/

class NoteWriter {
    constructor(notes, addNote,timestamp) {
        this.notesContainer = document.getElementById(notes);
        this.addNoteButton = document.getElementById(addNote);
        this.timestampElement = document.getElementById(timestamp);
        this.init();
    }

    // 初始化
    init() {
        this.loadNotes();
        this.addNoteButton.addEventListener('click', () => this.addNote());
        setInterval(() => this.saveNotes(), 2000); // 每 2 秒保存
    }

    // 更新时间戳
    updateTimestamp() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        this.timestampElement.textContent = `Stored at: ${formattedTime}`;
    }

    // 保存笔记到 localStorage
    saveNotes() {
        const notes = [];
        const noteElements = this.notesContainer.querySelectorAll('.note textarea');
        noteElements.forEach(note => notes.push(note.value));
        localStorage.setItem('notes', JSON.stringify(notes));
        this.updateTimestamp();
    }

    // 从 localStorage 加载笔记
    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotes.forEach(content => this.createNoteElement(content));
        this.updateTimestamp();
    }

    // 创建单个笔记元素
    createNoteElement(content = '') {
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

        // 绑定删除按钮事件
        const removeButton = noteElement.querySelector('.remove');
        removeButton.addEventListener('click', () => {
            noteElement.remove();
            this.saveNotes();
        });
    }

    // 添加新笔记
    addNote() {
        this.createNoteElement();
        this.saveNotes();
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    new NoteWriter('notes', 'addNote', 'timestamp');
});