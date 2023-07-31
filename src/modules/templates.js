export function createNotesTemplate(note) {
  return `
    <div >
        <ul class="note">
            <li>
                <p class="title">${note.title}</p>
            </li>
            <li>
                <p>${note.creationTime}</p>
            </li>
            <li>
                <p>${note.category}</p>
            </li>
            <li>
                <p class="text">${note.content}</p>
            </li>
            <li>
                <p>${note.timeStamps}</p>
            </li>
        
        <div>
            <button class="edit-button id-${note.id}">Edit</button>
            <button class="archive-button id-${note.id}">Archive</button>
            <button class="delete-button id-${note.id}">Delete</button>
        </div>
        </ul>
    </div>
  `;
}

export function createSummaryTemplate(category, active, archieved) {
  return `
    <li class="categoryItem">
        <ul  >
            <li>
                <p class="title">${category}</p>
            </li>
            <li>
                <p>${active}</p>
            </li>
            <li>
                <p>${archieved}</p>
            </li>
        </ul>
    </li>
  `;
}

export function archivedNoteTemplate(note) {
  return `
    <div  id="archivedNote">
        <ul >
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
            <button class="dearchivate-button id-${note.id}">Remove from archive</button>
            <button class="delete-button id-${note.id}">Delete</button>
        </div>
    </div>
  `;
}
