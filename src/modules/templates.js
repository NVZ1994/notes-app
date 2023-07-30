export function createNotesTemplate(note) {
  return `
    <div style="display: flex; gap: 20px;">
        <ul style="display: flex; gap: 20px;">
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
            <button class="edit-button id-${note.id}">Edit</button>
            <button class="archive-button id-${note.id}">Archive</button>
            <button class="delete-button id-${note.id}">Delete</button>
        </div>
    </div>
  `;
}

export function createSummaryTemplate(category, active, archieved) {
  return `
    <div style="display: flex; gap: 20px;">
        <ul style="display: flex; gap: 20px;">
            <li>
                <p>${category}</p>
            </li>
            <li>
                <p>${active}</p>
            </li>
            <li>
                <p>${archieved}</p>
            </li>
            
        </ul>
        
    </div>
  `;
}
