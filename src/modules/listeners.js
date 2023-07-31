const notesList = document.getElementById("notes-list");

export function listenerToNotesEvents(modal, notesStorage) {
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
        notesStorage.deleteNoteById(id, notesStorage.storageKeys.notesStorage);
        break;
    }
  }
}
