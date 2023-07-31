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
    const findCondition = (note) => note?.id === Number(id);

    const noteFromStorage = this.readStorage(
      this.storageKeys.notesStorage
    ).find(findCondition);

    const notesFromArchive = this.readStorage(this.storageKeys.archiveStorage)
      .map((category) => {
        return category.notes.find(findCondition);
      })
      .find(findCondition);

    return noteFromStorage || notesFromArchive;
  }

  updateNoteById(id, data) {
    this.notesData = this.notesData.map((el) => {
      if (el.id === Number(id)) {
        return { ...el, ...data };
      }
      return el;
    });
    this.setStorage(this.storageKeys.notesStorage);

    this.archive.forEach((category) => {
      category.notes = category.notes.map((note) => {
        if (note.id === Number(id)) {
          return { ...note, ...data };
        }
        return note;
      });
    });
    this.setStorage(this.storageKeys.archiveStorage);
  }

  deleteNoteById(id, key) {
    const result = this.readStorage(key);

    if (key === this.storageKeys.notesStorage) {
      this.notesData = result.filter((note) => note.id !== Number(id));
    } else {
      result.forEach((category) => {
        category.notes = category.notes.filter(
          (note) => note.id !== Number(id)
        );
      });
    }

    this.setStorage(key);
  }

  archivateNoteById(id) {
    const noteToArchivate = this.findNoteById(id);
    noteToArchivate.archived = true;
    this.archive
      .find((category) => noteToArchivate.category === category.categorieTitle)
      .notes.push(noteToArchivate);
    this.deleteNoteById(id, this.storageKeys.notesStorage);
    this.setStorage(this.storageKeys.archiveStorage);
  }

  deArchivateNoteById(id) {
    const noteToDeArchivate = this.findNoteById(id);
    noteToDeArchivate.archived = false;
    this.archive.forEach((category) => {
      category.notes = category.notes.filter((note) => note.id !== Number(id));
    });

    this.notesData.push(noteToDeArchivate);
    this.setStorage(this.storageKeys.notesStorage);
    this.setStorage(this.storageKeys.archiveStorage);
  }
}

export default NotesStorage;
