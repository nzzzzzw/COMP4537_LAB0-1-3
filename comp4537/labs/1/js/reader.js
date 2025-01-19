class NoteReader {
    constructor(notes, timestamp) {
        this.notesContainer = document.getElementById(notes);
        this.timestampElement = document.getElementById(timestamp);

        this.init();
    }

    // 初始化逻辑
    init() {
        this.loadNotes();
        setInterval(() => this.loadNotes(), 2000); // 每 2 秒自动更新
    }

    // 更新时间戳
    updateTimestamp() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        this.timestampElement.textContent = `Updated at: ${formattedTime}`;
    }

    // 加载笔记
    loadNotes() {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        this.renderNotes(savedNotes);
        this.updateTimestamp();
    }

    // 渲染笔记到页面
    renderNotes(notes) {
        this.notesContainer.innerHTML = ''; // 清空容器
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.textContent = note;
            this.notesContainer.appendChild(noteElement);
        });
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    new NoteReader('notes', 'timestamp');
});