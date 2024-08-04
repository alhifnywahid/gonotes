const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const Note = require("./Note");

class NotesProvider {
  constructor(notesLocation, notesExtensions) {
    this.notesLocation = notesLocation;
    this.notesExtensions = notesExtensions;
    this._onDidChangeTreeData = new vscode.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.selectedFolder = notesLocation;
    this.collapsedFolders = new Set(); // Track collapsed folders
  }

  init() {
    this.refresh();
    return this;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(note) {
    return note;
  }

  getChildren(note) {
    if (!this.notesLocation) {
      return Promise.resolve([]);
    }
    if (note) {
      // Get children for the given note (folder)
      return Promise.resolve(this.getNotes(note.location));
    } else {
      // Get children for the root folder
      return Promise.resolve(this.getNotes(this.notesLocation));
    }
  }

  getNotes(folderPath) {
    if (this.pathExists(folderPath)) {
      const files = fs.readdirSync(folderPath);
      const folders = [];
      const notes = [];

      files.forEach((file) => {
        const fullPath = path.join(folderPath, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          folders.push(
            new Note(
              file,
              fullPath,
              "",
              "",
              {
                command: "GoNotes.openFolder",
                title: "",
                arguments: [fullPath],
              },
              vscode.TreeItemCollapsibleState.Collapsed,
              true
            )
          );
        } else if (this.isValidExtension(file)) {
          notes.push(
            new Note(
              file,
              fullPath,
              "",
              "",
              {
                command: "GoNotes.openNote",
                title: "",
                arguments: [fullPath],
              },
              vscode.TreeItemCollapsibleState.None,
              false
            )
          );
        }
      });

      folders.sort((a, b) => a.label.localeCompare(b.label));
      notes.sort((a, b) => a.label.localeCompare(b.label));

      return [...folders, ...notes];
    } else {
      return [];
    }
  }

  pathExists(p) {
    try {
      fs.accessSync(p);
      return true;
    } catch (err) {
      return false;
    }
  }

  isValidExtension(file) {
    const ext = path.extname(file).slice(1);
    return this.notesExtensions.split(",").includes(ext);
  }

  setSelectedFolder(folderPath) {
    this.selectedFolder = folderPath;
  }

  toggleFolder(folderPath) {
    if (this.collapsedFolders.has(folderPath)) {
        this.collapsedFolders.delete(folderPath);
    } else {
        this.collapsedFolders.add(folderPath);
    }
    this.refresh();
}
}

module.exports = { NotesProvider };
