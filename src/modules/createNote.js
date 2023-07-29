import { formatDate } from "./helpers/formatDate";
import { hideCreateNotePopup } from "./helpers/hidePopup";
import { saveData, notesData } from "./helpers/saveData";

const notesList = document.getElementById("notes-list");

const noteNameInput = document.getElementById("note-name");
const noteCategorySelect = document.getElementById("note-category");
const noteContentTextarea = document.getElementById("note-content");
const noteDatesInput = document.getElementById("note-dates");

function clearInputs() {
  noteNameInput.value = "";
  noteCategorySelect.value = "Task";
  noteContentTextarea.value = "";
  noteDatesInput.value = "";
}

export function createNote() {
  const name = noteNameInput.value;
  const category = noteCategorySelect.value;
  const content = noteContentTextarea.value;
  const dates = noteDatesInput.value.split(",").map((date) => date.trim());

  if (!name || !category || !content) {
    alert("Please fill in all the fields.");
    return;
  }

  const newNote = {
    id: new Date().getTime(),
    name,
    time: formatDate(new Date()),
    category,
    content,
    dates,
    archived: false,
  };

  notesData.push(newNote);

  const noteItem = document.createElement("li");
  noteItem.innerHTML = `
    <ul>
        <li>
            <p>${newNote.name}</p>
        </li>
        <li>
            <p>${newNote.time}</p>
        </li>
        <li>
            <p>${newNote.category}</p>
        </li>
        <li>
            <p>${newNote.content}</p>
        </li>
        <li>
            <p>${newNote.dates.join(", ")}</p>
        </li>
    </ul>
    <div>
      <button class="edit-button id-${newNote.id}">Edit</button>
      <button class="archive-button id-${newNote.id}">Archive</button>
      <button class="delete-button id-${newNote.id}">Delete</button>
    </div>
  `;
  notesList.appendChild(noteItem);

  saveData(notesData);
  clearInputs();
  hideCreateNotePopup();
}
