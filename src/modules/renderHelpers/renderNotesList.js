export function renderNotesList() {
  const notesList = document.getElementById("notes-list");
  notesList.innerHTML = "";

  for (const note of notesData) {
    const noteItem = document.createElement("li");

    const timeParagraph = document.createElement("p");
    timeParagraph.textContent = `Time: ${note.time}`;
    noteItem.appendChild(timeParagraph);

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `Category: ${note.category}`;
    noteItem.appendChild(categoryParagraph);

    const contentParagraph = document.createElement("p");
    contentParagraph.textContent = `Content: ${note.content}`;
    noteItem.appendChild(contentParagraph);

    const datesParagraph = document.createElement("p");
    datesParagraph.textContent = `Dates: ${note.dates.join(", ")}`;
    noteItem.appendChild(datesParagraph);

    notesList.appendChild(noteItem);
  }
}
