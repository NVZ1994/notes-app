import "./styles.css";
import Modal from "./src/modules/modal";
import NotesStorage from "./src/modules/notesStorage";
import {
  createNotesTemplate,
  createSummaryTemplate,
  archivedNoteTemplate,
} from "./src/modules/templates";
import { listenerToNotesEvents } from "./src/modules/listeners";

const notesStorage = new NotesStorage(renderHTML);
const modal = new Modal(notesStorage);

const notesList = document.getElementById("notes-list");
const summaryList = document.getElementById("summary-table");

function updateNotesList() {
  if (notesStorage.notesData.length !== 0) {
    const notesTemplate = notesStorage.notesData
      .map((el) => createNotesTemplate(el))
      .join("");
    return (notesList.innerHTML = notesTemplate);
  }
  notesList.innerHTML = "";
}

function renderHTML() {
  updateNotesList();
  renderSummaryInfo();
}

function getActiveNotesByCategory(category) {
  const activeNotesByCategory = notesStorage.notesData;
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

renderHTML();
listenerToNotesEvents(modal, notesStorage);
renderSummaryInfo();

function onSummaryItemClick(event) {
  const summaryItem = event.target.closest(".categoryItem");
  if (!summaryItem) return;

  const newArchivedNote = summaryItem.nextElementSibling;

  if (newArchivedNote && newArchivedNote.id === "archivedNotesContainer") {
    newArchivedNote.remove();
    return;
  }

  const titleElement = summaryItem.querySelector(".title");
  if (!titleElement) return;
  const title = titleElement.textContent;

  const archivedNotesByCategory = notesStorage.archive.filter(
    (el) => el.categorieTitle === title
  );
  const notesHTML = archivedNotesByCategory
    .map((category) => {
      return category.notes.map((note) => archivedNoteTemplate(note)).join("");
    })
    .join("");

  const newArchivedNoteElement = document.createElement("div");
  newArchivedNoteElement.setAttribute("id", "archivedNotesContainer");
  newArchivedNoteElement.innerHTML = notesHTML;

  summaryItem.insertAdjacentElement("afterend", newArchivedNoteElement);
  listenerToArchivedNotesEvents();
}

summaryList.addEventListener("click", onSummaryItemClick);

function listenerToArchivedNotesEvents() {
  const summaryItems = document.querySelectorAll("#archivedNotesContainer");
  summaryItems.forEach((summaryItem) => {
    summaryItem.addEventListener("click", handleClick);
  });

  function handleClick(e) {
    if (e.target.tagName !== "BUTTON") {
      return;
    }

    const buttonType = e.target.classList[0];
    const id = e.target.classList[1].slice(3);

    switch (buttonType) {
      case "dearchivate-button":
        notesStorage.deArchivateNoteById(id);
        break;

      case "delete-button":
        notesStorage.deleteNoteById(
          id,
          notesStorage.storageKeys.archiveStorage
        );
        break;
    }
  }
}

listenerToArchivedNotesEvents();

document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll(".text, .title");

  paragraphs.forEach(function (paragraph) {
    const text = paragraph.textContent;
    const truncatedText = text.length > 20 ? text.slice(0, 20) + "..." : text;
    paragraph.textContent = truncatedText;
  });
});
