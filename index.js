import { createNote } from "./src/modules/createNote";
import { listenerToEditNote } from "./src/modules/editNote";
import { hideCreateNotePopup } from "./src/modules/helpers/hidePopup";
import { renderNotesList } from "./src/modules/helpers/renderNotesList";

const createButton = document.getElementById("create-note-button");
const confirmNote = document.getElementById("create-note-confirm");
const cancelNote = document.getElementById("create-note-cancel");
const createNotePopup = document.getElementById("create-note-popup");

window.addEventListener("load", () => {
  const notesFromStorage = localStorage.getItem("notesData");
  if (notesFromStorage) {
    renderNotesList();
  }
  createButton.addEventListener("click", showCreateNote);
});

export function showCreateNote() {
  createNotePopup.style.display = "block";
}

confirmNote.addEventListener("click", createNote);
cancelNote.addEventListener("click", hideCreateNotePopup);

listenerToEditNote();
