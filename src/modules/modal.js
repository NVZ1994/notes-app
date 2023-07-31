const modalWindow = document.getElementById("create-note-popup");

const noteNameInput = document.getElementById("note-name");
const noteCategorySelect = document.getElementById("note-category");
const noteContentTextarea = document.getElementById("note-content");

const openModalButton = document.getElementById("create-note-button");
const confirmNoteBtn = document.getElementById("create-note-confirm");
const cancelNoteBtn = document.getElementById("create-note-cancel");

class Modal {
  storage = null;
  currentNoteId = null;

  constructor(notesStorage) {
    this.storage = notesStorage;
    this.createNewNote = this.createNewNote.bind(this);
    this.confirmOfUpdate = this.confirmOfUpdate.bind(this);
    this.confirmBtnListener = this.confirmBtnListener.bind(this);
    this.closeModal = this.closeModal.bind(this);
    openModalButton.addEventListener("click", this.openModal);
    cancelNoteBtn.addEventListener("click", this.closeModal);
    confirmNoteBtn.addEventListener("click", this.createNewNote);
  }

  openModal() {
    modalWindow.style.display = "block";
  }

  getTimeStamps(content) {
    const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    const dates = content.match(datePattern);
    return dates ? dates.join(", ") : "";
  }

  getNoteValues() {
    const title = noteNameInput.value;
    const category = noteCategorySelect.value;
    const content = noteContentTextarea.value;
    const timeStamps = this.getTimeStamps(content);

    if (!title || !category || !content) {
      alert("Please fill in all the fields.");
      return;
    }

    return {
      title,
      category,
      content,
      timeStamps,
    };
  }

  closeModal() {
    this.clearInputs();
    modalWindow.style.display = "none";
  }

  clearInputs() {
    noteNameInput.value = "";
    noteCategorySelect.value = "Task";
    noteContentTextarea.value = "";
  }

  fillNote(id) {
    this.openModal();
    this.confirmBtnListener("edit");
    const currentNote = this.storage.findNoteById(id);
    this.currentNoteId = id;
    noteNameInput.value = currentNote.title;
    noteCategorySelect.value = currentNote.category;
    noteContentTextarea.value = currentNote.content;
  }

  confirmOfUpdate() {
    const actualValues = this.getNoteValues();

    if (!actualValues) {
      return;
    }
    this.storage.updateNoteById(this.currentNoteId, actualValues);
    this.closeModal();
  }

  confirmBtnListener(param) {
    if (param === "edit") {
      confirmNoteBtn.removeEventListener("click", this.createNewNote);
      confirmNoteBtn.addEventListener("click", this.confirmOfUpdate);
    } else {
      confirmNoteBtn.removeEventListener("click", this.confirmOfUpdate);
      confirmNoteBtn.addEventListener("click", this.createNewNote);
    }
  }

  createNewNote() {
    this.confirmBtnListener();
    const actualValues = this.getNoteValues();
    if (!actualValues) {
      return;
    }
    this.storage.addNote(actualValues);
    this.closeModal();
  }
}

export default Modal;
