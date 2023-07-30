import { formatDate } from "../src/modules/helpers/formatDate";

class NotesStorage {
  storageKeys = {
    notesStorage: "notesData",
    archiveStorage: "archivatedNotes",
  };
  categoriesId = { task: "Task", thoughts: "Random Thoughts", idea: "Idea" };
  notesData = [];
  updateHTML = null;
  archive = [
    { categorieTitle: this.categoriesId.task, notes: [] },
    { categorieTitle: this.categoriesId.thoughts, notes: [] },
    { categorieTitle: this.categoriesId.idea, notes: [] },
  ];

  constructor(renderNotesFromStorage) {
    this.updateHTML = renderNotesFromStorage.bind(this);
    this.readStorage(this.storageKeys.notesStorage);
    this.readStorage(this.storageKeys.archiveStorage);
  }

  readStorage(key) {
    const data = localStorage.getItem(key);

    if (key === this.storageKeys.notesStorage) {
      if (data !== null) {
        this.notesData = JSON.parse(data);
      }
      return this.notesData;
    } else if (key === this.storageKeys.archiveStorage) {
      if (data !== null) {
        this.archive = JSON.parse(data);
      }
      return this.archive;
    }
  }

  setStorage(key) {
    if (key === this.storageKeys.notesStorage) {
      localStorage.setItem(
        this.storageKeys.notesStorage,
        JSON.stringify(this.notesData)
      );
      console.log("this.notesData", this.notesData);
    } else if (key === this.storageKeys.archiveStorage) {
      localStorage.setItem(
        this.storageKeys.archiveStorage,
        JSON.stringify(this.archive)
      );
    }

    this.updateHTML();
  }

  getArchiveStorage() {
    const allNotes = localStorage.getItem(this.storageKeys.notesStorage);
    this.notesData = JSON.parse(allNotes);
    return notesData;
  }

  setArchiveStorage() {
    localStorage.setItem(
      this.storageKeys.notesStorage,
      JSON.stringify(notesData)
    );
  }

  addNote(data) {
    const newNote = {
      ...data,
      id: new Date().getTime(),
      creationTime: formatDate(new Date()),
      archived: false,
    };
    this.readStorage(this.storageKeys.notesStorage).push(newNote);
    this.setStorage(this.storageKeys.notesStorage);
  }

  findNoteById(id) {
    return this.readStorage(this.storageKeys.notesStorage).find(
      (note) => note.id === Number(id)
    );
  }

  updateNoteById(id, data) {
    this.notesData = this.notesData.map((el) => {
      if (el.id === Number(id)) {
        return { ...el, ...data };
      }
      return el;
    });
    this.setStorage(this.storageKeys.notesStorage);
  }

  deleteNoteById(id) {
    const filteredNotes = this.readStorage(
      this.storageKeys.notesStorage
    ).filter((note) => note.id !== Number(id));
    this.notesData = filteredNotes;
    this.setStorage(this.storageKeys.notesStorage);
  }

  archivateNoteById(id) {
    const noteToArchivate = this.findNoteById(id);
    noteToArchivate.archived = true;
    this.archive
      .find((category) => noteToArchivate.category === category.categorieTitle)
      .notes.push(noteToArchivate);
    // this.setStorage(this.storageKeys.notesStorage);
    this.deleteNoteById(id);
    this.setStorage(this.storageKeys.archiveStorage);
  }

  dearchivateNoteById(id) {}
}

export default NotesStorage;
