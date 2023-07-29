import { formatDate } from "./currentDate";
import { renderNotesList } from "./renderHelpers/renderNotesList";
import { renderSummaryTable } from "./renderHelpers/renderSummaryTable";

function hideCreateNotePopup() {
  createNotePopup.style.display = "none";
}

export function createNewNote() {
  const currentDate = new Date();

  const time = formatDate(currentDate);
  const category = noteCategorySelect.value;
  const content = noteContentTextarea.value;
  const dates = noteDatesInput.value.split(",").map((date) => date.trim());

  const newNote = {
    time,
    category,
    content,
    dates,
    archived: false,
  };

  notesData.push(newNote);

  renderNotesList();
  renderSummaryTable();

  hideCreateNotePopup();
}
