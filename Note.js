const vscode = require("vscode");
const path = require("path");

class Note extends vscode.TreeItem {
	constructor(name, location, category, tags, command, collapsibleState, isFolder) {
		super(name, collapsibleState);
		this.name = name;
		this.location = location;
		this.category = category;
		this.tags = tags;
		this.command = command;
		this.iconPath = isFolder
			? {
					light: path.join(__dirname, "resources", "folder.svg"),
					dark: path.join(__dirname, "resources", "folder.svg"),
			  }
			: {
					light: path.join(__dirname, "resources", "file.svg"),
					dark: path.join(__dirname, "resources", "file.svg"),
			  };
		this.tooltip = `${this.name}`;
		this.contextValue = isFolder ? "folder" : "note";
	}
}

module.exports = Note;
