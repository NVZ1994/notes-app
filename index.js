let notesData = [];

window.addEventListener("load", loadNotesFromLocalStorage);

function loadNotesFromLocalStorage() {
  const notesFromStorage = localStorage.getItem("notesData");
  if (notesFromStorage) {
    notesData = JSON.parse(notesFromStorage);
    renderNotesList();
  }
}

const createNoteButton = document.getElementById("create-note-button");
createNoteButton.addEventListener("click", showCreateNotePopup);

const createNoteConfirmButton = document.getElementById("create-note-confirm");
createNoteConfirmButton.addEventListener("click", createNote);

const createNoteCancelButton = document.getElementById("create-note-cancel");
createNoteCancelButton.addEventListener("click", hideCreateNotePopup);

const createNotePopup = document.getElementById("create-note-popup");
const noteNameInput = document.getElementById("note-name");
const noteCategorySelect = document.getElementById("note-category");
const noteContentTextarea = document.getElementById("note-content");
const noteDatesInput = document.getElementById("note-dates");

function showCreateNotePopup() {
  noteNameInput.value = "";
  noteCategorySelect.value = "Task";
  noteContentTextarea.value = "";
  noteDatesInput.value = "";

  createNotePopup.style.display = "block";
}

function hideCreateNotePopup() {
  createNotePopup.style.display = "none";
}

function createNote() {
  const name = noteNameInput.value;
  const category = noteCategorySelect.value;
  const content = noteContentTextarea.value;
  const dates = noteDatesInput.value.split(",").map((date) => date.trim());

  if (!name || !category || !content || !dates) {
    alert("Please fill in all the fields.");
    return;
  }

  const newNote = {
    name,
    time: formatDate(new Date()),
    category,
    content,
    dates,
    archived: false,
  };

  notesData.push(newNote);

  const notesList = document.getElementById("notes-list");
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
      <button class="edit-button">Edit</button>
      <button class="archive-button">Archive</button>
      <button class="delete-button">Delete</button>
    </div>
  `;
  notesList.appendChild(noteItem);

  localStorage.setItem("notesData", JSON.stringify(notesData));
  hideCreateNotePopup();
}

function formatDate(date) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function renderNotesList() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  notesData.forEach((note, index) => {
    const noteItem = document.createElement("li");
    noteItem.innerHTML = `
      <ul>
          <li>
              <p>${note.name}</p>
          </li>
          <li>
              <p>${note.time}</p>
          </li>
          <li>
              <p>${note.category}</p>
          </li>
          <li>
              <p>${note.content}</p>
          </li>
          <li>
              <p>${note.dates.join(", ")}</p>
          </li>
      </ul>
      <div>
        <button class="edit-button">Edit</button>
        <button class="archive-button">Archive</button>
        <button class="delete-button">Delete</button>
      </div>
    `;
    notesList.appendChild(noteItem);
  });
}
