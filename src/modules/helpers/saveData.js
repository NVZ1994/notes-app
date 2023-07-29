export let notesData = [];

export function saveData() {
  localStorage.setItem("notesData", JSON.stringify(notesData));
}
