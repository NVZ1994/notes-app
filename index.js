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

const notesStorage = new NotesStorage(renderNotesFromStorage);
const modal = new Modal(notesStorage);

const notesList = document.getElementById("notes-list");

function createNotesTemplate(note) {
  return `
    <div style="display: flex; gap: 20px;">
        <ul style="display: flex; gap: 20px;">
            <li>
                <p>${note.title}</p>
            </li>
            <li>
                <p>${note.creationTime}</p>
            </li>
            <li>
                <p>${note.category}</p>
            </li>
            <li>
                <p>${note.content}</p>
            </li>
            <li>
                <p>${note.timeStamps}</p>
            </li>
        </ul>
        <div>
            <button class="edit-button id-${note.id}">Edit</button>
            <button class="archive-button id-${note.id}">Archive</button>
            <button class="delete-button id-${note.id}">Delete</button>
        </div>
    </div>
  `;
}

function renderNotesFromStorage() {
  if (notesStorage.notesData.length !== 0) {
    const notesTemplate = notesStorage.notesData
      .map((el) => createNotesTemplate(el))
      .join("");
    return (notesList.innerHTML = notesTemplate);
  }
  notesList.innerHTML = "";
}

function listenerToNotesEvents() {
  notesList.addEventListener("click", clickHandle);

  function clickHandle(e) {
    if (e.target.tagName !== "BUTTON") {
      return;
    }

    const buttonType = e.target.classList[0];
    const id = e.target.classList[1].slice(3);

    switch (buttonType) {
      case "edit-button":
        modal.fillNote(id);
        break;

      case "archive-button":
        notesStorage.archivateNoteById(id);
        break;

      case "delete-button":
        notesStorage.deleteNoteById(id);
        break;
    }
  }
}

renderNotesFromStorage();
listenerToNotesEvents();
