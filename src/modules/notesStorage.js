import { formatDate } from "./helpers/formatDate";

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

  constructor(renderHTML) {
    this.updateHTML = renderHTML.bind(this);
    this.readStorage(this.storageKeys.notesStorage);
    this.readStorage(this.storageKeys.archiveStorage);
  }

  readStorage(key) {
    try {
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
    } catch (error) {
      console.error("Error while reading data from localStorage:", error);
    }
  }

  setStorage(key) {
    try {
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

      this.updateHTML();
    } catch (error) {
      console.error("Error while writing data to localStorage:", error);
    }
  }

  getArchiveStorage() {
    try {
      const allNotes = localStorage.getItem(this.storageKeys.notesStorage);
      this.notesData = JSON.parse(allNotes);
      return this.notesData;
    } catch (error) {
      console.error(
        "Error while getting archive data from localStorage:",
        error
      );
    }
  }

  setArchiveStorage() {
    try {
      localStorage.setItem(
        this.storageKeys.notesStorage,
        JSON.stringify(notesData)
      );
    } catch (error) {
      console.error("Error while setting archive data to localStorage:", error);
    }
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
    this.deleteNoteById(id);
    this.setStorage(this.storageKeys.archiveStorage);
  }

  deArchivateNoteById(id) {}
}

export default NotesStorage;
