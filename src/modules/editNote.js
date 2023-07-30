import { showCreateNote } from "../..";

export function listenerToEditNote() {
  const notesList = document.getElementById("notes-list");

  notesList.addEventListener("click", clickHandle);

  function clickHandle(e) {
    const buttonType = e.target.classList[0];
    const id = e.target.classList[1].slice(3);

    switch (buttonType) {
      case "edit-button":
        editNote(id);
        break;

      case "archive-button":
        break;

      case "delete-button":
        break;
    }
  }
}

function editNote(id) {
  const notes = JSON.parse(localStorage.getItem("notesData"));
  const actualNote = notes.find((note) => note.id === Number(id));

  showCreateNote();
}
