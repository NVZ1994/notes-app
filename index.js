import Modal from "./src/modules/modal";
import NotesStorage from "./src/modules/notesStorage";
import {
  createNotesTemplate,
  createSummaryTemplate,
} from "./src/modules/templates";

const notesStorage = new NotesStorage(renderNotesFromStorage);
const modal = new Modal(notesStorage);

const notesList = document.getElementById("notes-list");
const summaryList = document.getElementById("summary-table");

function renderNotesFromStorage() {
  if (notesStorage.notesData.length !== 0) {
    const notesTemplate = notesStorage.notesData
      .map((el) => createNotesTemplate(el))
      .join("");
    return (notesList.innerHTML = notesTemplate);
  }
  notesList.innerHTML = "";
}

function getActiveNotesByCategory(category) {
  const activeNotesByCategory = notesStorage.notesData;
  console.log(activeNotesByCategory);
  return activeNotesByCategory.filter((el) => el.category === category).length;
}

function renderSummaryInfo() {
  const categories = notesStorage.archive;

  const markup = categories
    .map((category) => {
      const activeNotes = getActiveNotesByCategory(category.categorieTitle);
      const archivedNoted = category.notes.length;
      const renderedList = createSummaryTemplate(
        category.categorieTitle,
        activeNotes,
        archivedNoted
      );
      return renderedList;
    })
    .join("");
  summaryList.innerHTML = markup;
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
renderSummaryInfo();
