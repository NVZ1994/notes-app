class NotesStorage {
  storageKeys = {
    notesStorage: "notesData",
    archiveStorage: "archivatedNotes",
  };
  categoriesId = { task: "Task", thoughts: "Random Thoughts", idea: "Idea" };
  notesData = [];
  archive = [
    { categorieTitle: this.categoriesId.task, notes: [] },
    { categorieTitle: this.categoriesId.thoughts, notes: [] },
    { categorieTitle: this.categoriesId.idea, notes: [] },
  ];

  constructor() {
    this.readStorage(this.storageKeys.notesStorage);
    this.readStorage(this.storageKeys.archiveStorage);
  }

  readStorage(key) {
    const data = localStorage.getItem(key);
    if (key === this.storageKeys.notesStorage) {
      console.log(key, data);
      if (data !== null) {
        this.notesData = JSON.parse(data);
      }
      return this.notesData;
    } else if (key === this.storageKeys.archiveStorage) {
      this.archive = JSON.parse(data);
      return this.archive;
    }
  }

  setStorage(key) {
    if (key === this.storageKeys.notesStorage) {
      localStorage.setItem(
        this.storageKeys.notesStorage,
        JSON.stringify(this.notesData)
      );
    } else if (key === this.storageKeys.archiveStorage) {
      localStorage.setItem(
        this.storageKeys.archiveStorage,
        JSON.stringify(this.archive)
      );
    }
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
    console.log("storage", data);
    this.readStorage(this.storageKeys.notesStorage).push(data);
    this.setStorage(this.storageKeys.notesStorage);
  }

  findNoteById(id) {
    return this.readStorage(this.storageKeys.notesStorage).find(
      (note) => note.id === Number(id)
    );
  }

  updateNoteById(id, data) {
    let noteToUpdate = this.findNoteById(id);
    noteToUpdate = {
      ...data,
      id: noteToUpdate.id,
      creationTime: noteToUpdate.creationTime,
    };
    this.setStorage(this.storageKeys.notesStorage);
  }

  deleteNoteById(id) {
    const filteredNotes = this.readStorage(
      this.storageKeys.notesStorage
    ).filter((note) => note.id === Number(id));
    this.notesData = filteredNotes;
    this.setStorage(this.storageKeys.notesStorage);
  }

  archivateNote(id) {
    const noteToArchivate = this.findNoteById(id);
    this.archive
      .find((category) => noteToArchivate.category === category.categorieTitle)
      .notes.push(noteToArchivate);

    this.deleteNoteById(id);
  }
}

export default NotesStorage;
