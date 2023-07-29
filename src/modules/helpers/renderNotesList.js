const notesList = document.getElementById("notes-list");

export function renderNotesList() {
  notesList.innerHTML = "";
  const dataFromStorage = localStorage.getItem("notesData");

  if (dataFromStorage) {
    const notesData = JSON.parse(dataFromStorage);

    notesData.forEach((note) => {
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
        <button class="edit-button id-${note.id}">Edit</button>
        <button class="archive-button id-${note.id}">Archive</button>
        <button class="delete-button id-${note.id}">Delete</button>
      </div>
    `;
      notesList.appendChild(noteItem);
    });
  }
}
