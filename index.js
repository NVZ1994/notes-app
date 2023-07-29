// import { createNote } from "./src/modules/createNote";
// import { listenerToEditNote } from "./src/modules/editNote";
// import { hideCreateNotePopup } from "./src/modules/helpers/hidePopup";
// import { renderNotesList } from "./src/modules/helpers/renderNotesList";

// const confirmNote = document.getElementById("create-note-confirm");
// const cancelNote = document.getElementById("create-note-cancel");
// const createNotePopup = document.getElementById("create-note-popup");

// window.addEventListener("load", () => {
//   const notesFromStorage = localStorage.getItem("notesData");
//   if (notesFromStorage) {
//     renderNotesList();
//   }
//   createButton.addEventListener("click", showCreateNote);
// });

// export function showCreateNote() {
//   createNotePopup.style.display = "block";
// }

// confirmNote.addEventListener("click", createNote);
// cancelNote.addEventListener("click", hideCreateNotePopup);

// listenerToEditNote();

// ----------------------------------------------------------------

import Modal from "./alex/modal";
import NotesStorage from "./alex/notesStorage";

const notesStorage = new NotesStorage();
const modal = new Modal(notesStorage);
