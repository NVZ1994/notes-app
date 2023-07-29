import { formatDate } from "../src/modules/helpers/formatDate";
const modalWindow = document.getElementById("create-note-popup");

const noteNameInput = document.getElementById("note-name");
const noteCategorySelect = document.getElementById("note-category");
const noteContentTextarea = document.getElementById("note-content");
const noteDatesInput = document.getElementById("note-dates");
const openModalButton = document.getElementById("create-note-button");
const createNoteBtn = document.getElementById("create-note-confirm");
const cancelNoteBtn = document.getElementById("create-note-cancel");

class Modal {
  storage = null;

  constructor(notesStorage) {
    this.storage = notesStorage;
    openModalButton.addEventListener("click", this.openModal);
    cancelNoteBtn.addEventListener("click", this.closeModal);
    createNoteBtn.addEventListener("click", this.createNewNote.bind(this));
  }

  openModal() {
    modalWindow.style.display = "block";
  }

  getNoteValues() {
    const title = noteNameInput.value;
    const category = noteCategorySelect.value;
    const content = noteContentTextarea.value;
    const timeStamps = noteDatesInput.value
      .split(",")
      .map((date) => date.trim());

    if (!title || !category || !content) {
      alert("Please fill in all the fields.");
      return;
    }

    return {
      id: new Date().getTime(),
      creationTime: formatDate(new Date()),
      title,
      category,
      content,
      timeStamps,
      archived: false,
    };
  }

  closeModal() {
    modalWindow.style.display = "none";
  }

  clearInputs() {
    noteNameInput.value = "";
    noteCategorySelect.value = "Task";
    noteContentTextarea.value = "";
    noteDatesInput.value = "";
  }

  createNewNote() {
    const actualValues = this.getNoteValues();
    console.log(actualValues);
    this.storage.addNote(actualValues);
    this.clearInputs();
    this.closeModal();
  }
}

export default Modal;
