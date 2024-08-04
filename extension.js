const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { NotesProvider } = require("./NotesProvider");

let extId = "gonotes";

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	const notesProvider = new NotesProvider(Notes.getNotesLocation(), Notes.getNotesExtensions());
	notesProvider.init();

	let treeView = vscode.window.createTreeView("gonotes", {
		treeDataProvider: notesProvider,
	});

	context.subscriptions.push(
		vscode.commands.registerCommand("GoNotes.helloWorld", () => {
			vscode.window.showInformationMessage("Hello World from gonotes!");
		})
	);
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.newFolder", () => Notes.newFolder(treeView, notesProvider)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.newNotes", () => Notes.newNote(treeView, notesProvider)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.refresh", () => Notes.refreshNotes(notesProvider)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.rename", (n) => Notes.renameNote(n, notesProvider)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.trash", (n) => Notes.deleteNote(n, notesProvider)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.openFolder", (folderPath) => notesProvider.toggleFolder(folderPath)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.selectLocation", () => Notes.setupNotes()));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.openNote", (n) => Notes.openNote(n)));
	context.subscriptions.push(vscode.commands.registerCommand("GoNotes.editNote", (n) => Notes.editNote(n)));
}

function deactivate() {}

class Notes {
	constructor(settings) {
		this.settings = settings;
		this.settings = vscode.workspace.getConfiguration(extId);
	}

	// new Folder
	static createNewFolder() {}

	// get notes storage location
	static getNotesLocation() {
		return vscode.workspace.getConfiguration("GoNotes").get("notesLocation");
	}
	// get notes default extension
	static getNotesDefaultNoteExtension() {
		return vscode.workspace.getConfiguration("GoNotes").get("notesDefaultNoteExtension");
	}
	// get notes default extension
	static getNotesExtensions() {
		return vscode.workspace.getConfiguration("GoNotes").get("notesExtensions");
	}

	// delete note
	static deleteNote(note, tree) {
		vscode.window.showWarningMessage(`Apakah Anda yakin ingin menghapus '${note.name}'? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.`, "Ya", "Tidak").then((result) => {
			if (result === "Ya") {
				fs.unlink(path.join(path.dirname(note.location), note.name), (err) => {
					if (err) {
						console.log(err);
						vscode.window.showErrorMessage(`Gagal menghapus ${note.name}.`);
					}
					vscode.window.showInformationMessage(`${note.name} Berhasil dihapus.`);
				});
				tree.refresh();
			}
		});
	}

	// list notes
	static listNotes() {
		let notesLocation = String(Notes.getNotesLocation());
		let notesExtensions = String(Notes.getNotesExtensions());
		// read files in storage location
		fs.readdir(String(notesLocation), (err, files) => {
			if (err) {
				// report error
				console.error(err);
				return vscode.window.showErrorMessage("Failed to read the notes folder.");
			} else {
				// show list of notes
				vscode.window.showQuickPick(files).then((file) => {
					// open selected note
					vscode.window.showTextDocument(vscode.Uri.file(path.join(String(notesLocation), String(file))));
				});
			}
		});
	}

	// new folder
	static newFolder(treeView, notesProvider) {
		vscode.window
			.showInputBox({
				prompt: "Tulis Nama Folder...",
				value: "",
			})
			.then((folderName) => {
				if (folderName) {
					let selectedItem = treeView.selection && treeView.selection.length > 0 ? treeView.selection[0] : null;

					// Tentukan folder yang dipilih atau default ke lokasi catatan
					let selectedFolder = selectedItem ? (selectedItem.collapsibleState !== vscode.TreeItemCollapsibleState.None ? selectedItem.location : path.dirname(selectedItem.location)) : notesProvider.notesLocation;

					// Tentukan path folder baru
					let folderPath = path.join(selectedFolder, folderName);

					// Cek apakah folder sudah ada
					if (!fs.existsSync(folderPath)) {
						try {
							// Buat folder baru
							fs.mkdirSync(folderPath);
							vscode.window.showInformationMessage(`Folder '${folderName}' berhasil dibuat.`);

							// Refresh tree setelah membuat folder baru
							notesProvider.refresh();
						} catch (err) {
							console.error(err);
							vscode.window.showErrorMessage("Gagal membuat folder baru.");
						}
					} else {
						vscode.window.showWarningMessage("Folder dengan nama tersebut sudah ada.");
					}
				}
			});
	}

	// new note
	static newNote(treeView, notesProvider) {
		let notesDefaultNoteExtension = String(Notes.getNotesDefaultNoteExtension());

		vscode.window
			.showInputBox({
				prompt: "Tulis Nama Catatan...",
				value: "",
			})
			.then((noteName) => {
				if (noteName) {
					let fileName = `${noteName.replace(/\:/gi, "")}.${notesDefaultNoteExtension}`;

					let selectedItem = treeView.selection && treeView.selection.length > 0 ? treeView.selection[0] : null;

					let selectedFolder = selectedItem ? (selectedItem.collapsibleState !== vscode.TreeItemCollapsibleState.None ? selectedItem.location : path.dirname(selectedItem.location)) : notesProvider.notesLocation;

					let filePath = path.join(selectedFolder, fileName);

					const header = noteName.toUpperCase().replaceAll("-", " ");

					let firstLine = "# " + header + "\n\n";

					let noteExists = fs.existsSync(String(filePath));

					if (!noteExists) {
						fs.writeFile(filePath, firstLine, (err) => {
							if (err) {
								console.error(err);
								return vscode.window.showErrorMessage("Gagal membuat catatan baru.");
							} else {
								let file = vscode.Uri.file(filePath);
								vscode.window.showTextDocument(file).then(() => {
									vscode.commands.executeCommand("cursorMove", {
										to: "viewPortBottom",
									});
								});
							}
						});
						notesProvider.refresh();
					} else {
						return vscode.window.showWarningMessage("Catatan dengan nama tersebut sudah ada.");
					}
				}
			});
	}

	// edit note
	static async editNote(note) {
		const fileUri = vscode.Uri.file(path.join(note.location));

		// Close existing editors for the file
		const activeEditors = vscode.window.visibleTextEditors;

		for (const editor of activeEditors) {
			if (editor.document.uri.toString() === fileUri.toString()) {
				// Close the editor
				await vscode.window.showTextDocument(editor.document.uri, { preview: false });
				await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
			}
		}

		// Close the preview if it exists
		const allEditors = vscode.window.tabGroups.all.flatMap((group) => group.tabs);
		for (const tab of allEditors) {
			if (tab.input instanceof vscode.TabInputText && tab.input.uri.toString() === fileUri.toString()) {
				await vscode.commands.executeCommand("workbench.action.closeActiveEditor");
			}
		}

		// Open the original file
		const document = await vscode.workspace.openTextDocument(fileUri);
		await vscode.window.showTextDocument(document, { preview: false }).then(() => {
			vscode.commands.executeCommand("markdown.showPreviewToSide", fileUri);
		});
	}

	// static editNote(note) {
	// 	const fileUri = vscode.Uri.file(path.join(note.location));
	// 	vscode.workspace.openTextDocument(fileUri).then((document) => {
	// 		vscode.window.showTextDocument(document).then((editor) => {
	// 			vscode.commands.executeCommand("markdown.showPreviewToSide", fileUri);
	// 		});
	// 	});
	// }

	static openNote(notePath) {
		const fileUri = vscode.Uri.file(notePath);

		// Buka pratinjau Markdown
		vscode.commands.executeCommand("markdown.showPreview", fileUri).then(
			() => {
				// Tutup file asli jika ada
				Notes.closeOriginalFile(fileUri);
			},
			(err) => {
				vscode.window.showErrorMessage("Failed to open Markdown preview: " + err.message);
			}
		);
	}

	static closeOriginalFile(fileUri) {
		vscode.window.visibleTextEditors.forEach((editor) => {
			if (editor.document.uri.toString() === fileUri.toString()) {
				vscode.window.showTextDocument(editor.document.uri).then(() => {
					vscode.commands.executeCommand("workbench.action.closeActiveEditor");
				});
			}
		});
	}

	// refresh notes
	static refreshNotes(tree) {
		// refresh tree
		tree.refresh();
	}

	// rename note
	static renameNote(note, tree) {
		vscode.window
			.showInputBox({
				prompt: "Nama baru untuk catatan?",
				value: note.name,
			})
			.then((noteName) => {
				if (noteName && noteName !== note.name) {
					let newNoteName = noteName;
					let newNotePath = path.join(path.dirname(note.location), newNoteName);

					if (fs.existsSync(newNotePath)) {
						vscode.window.showWarningMessage(`'${newNoteName}' sudah ada.`);
						return;
					}

					try {
						fs.renameSync(path.join(path.dirname(note.location), note.name), newNotePath);
						vscode.window.showInformationMessage(`'${note.name}' diubah namanya menjadi '${newNoteName}'.`);
						tree.refresh();
					} catch (err) {
						console.error(err);
						vscode.window.showErrorMessage(`Gagal mengubah nama ${note.name} menjadi ${newNoteName}.`);
					}
				}
			});
	}

	// setup notes
	static setupNotes() {
		// dialog options
		let openDialogOptions = {
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: "Select",
		};

		// display open dialog with above options
		vscode.window.showOpenDialog(openDialogOptions).then((fileUri) => {
			if (fileUri && fileUri[0]) {
				// get Notes configuration
				let notesConfiguration = vscode.workspace.getConfiguration("GoNotes");
				// update Notes configuration with selected location
				notesConfiguration.update("notesLocation", path.normalize(fileUri[0].fsPath), true).then(() => {
					// prompt to reload window so storage location change can take effect
					vscode.window.showWarningMessage(`You must reload the window for the storage location change to take effect.`, "Reload").then((selectedAction) => {
						// if the user selected to reload the window then reload
						if (selectedAction === "Reload") {
							vscode.commands.executeCommand("workbench.action.reloadWindow");
						}
					});
				});
			}
		});
	}
}

module.exports = {
	activate,
	deactivate,
	Notes,
};
