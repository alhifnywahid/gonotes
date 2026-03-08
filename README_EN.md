# GoNotes

**GoNotes** is a note-taking extension for Visual Studio Code that lets you create, manage, and organize Markdown-based notes directly inside your editor without switching to another application.

> Documentation available in: [Bahasa Indonesia](./README.md) | **English**

---

## Preview

<img alt="GoNotes Preview" align="center" width="100%" src="https://raw.githubusercontent.com/alhifnywahid/dummy/master/gonotes-video.gif" />

---

## Features

- **Select Storage Location** - Choose the folder where all your notes are saved.
- **New Note** - Create a new note with a configurable file extension (default: `.md`).
- **New Folder** - Organize your notes into folders as needed.
- **Edit Note** - Open a note in edit mode with a side-by-side Markdown preview.
- **Rename** - Rename any note or folder at any time.
- **Delete** - Remove notes or folders that are no longer needed.
- **Refresh** - Manually refresh the notes panel to reflect file system changes.
- **Multi-Extension Support** - Display files with extensions such as `md`, `markdown`, `txt`, or any custom extensions you define.
- **Light and Dark Theme Icons** - Icons automatically adapt to the active VSCode theme.

---

## Requirements

- Visual Studio Code version `1.92.0` or later.

---

## Installation

### Via Visual Studio Marketplace

1. Open VSCode.
2. Go to the **Extensions** tab (`Ctrl+Shift+X`).
3. Search for **"GoNotes"**.
4. Click **Install**.

### Via VSIX (Manual)

1. Download the `.vsix` file from the [Releases](https://github.com/alhifnywahid/gonotes/releases) page.
2. In VSCode, open the **Command Palette** (`Ctrl+Shift+P`).
3. Run the command `Extensions: Install from VSIX...`.
4. Select the downloaded `.vsix` file.

---

## Usage

### 1. Select a Storage Location

After installation, GoNotes does not have a storage location set. The first step is:

- Click the **GoNotes** icon in the **Activity Bar** (left panel of VSCode).
- Click the **Select Storage Location** button (the settings icon in the panel toolbar).
- Choose the folder you want to use as the notes directory.
- Click **Reload** when prompted to restart the window.

### 2. Create a New Note

- Click the **New Note** button (file icon) in the GoNotes panel toolbar.
- Type the note name in the input box that appears.
- The note will be opened immediately with a Markdown preview.

### 3. Create a New Folder

- Select a target folder in the GoNotes panel (optional). If nothing is selected, the folder is created in the root directory.
- Click the **New Folder** button (folder icon) in the panel toolbar.
- Enter the desired folder name.

### 4. Edit a Note

- Click the **Edit** icon next to a note name to open the file in edit mode with a side-by-side Markdown preview.
- Or click the note name directly to open the read-only Markdown preview.

### 5. Rename a Note

- Hover over the note you want to rename.
- Click the **Rename** icon that appears next to the note.
- Enter the new name and press Enter.

### 6. Delete a Note

- Hover over the note you want to delete.
- Click the **Delete** icon (trash icon) next to the note.
- Confirm the deletion in the warning dialog that appears.

---

## Configuration

GoNotes settings can be changed via VSCode **Settings** (`Ctrl+,`) or directly in your `settings.json` file:

```json
{
  "GoNotes.notesLocation": "/path/to/notes/folder",
  "GoNotes.notesDefaultNoteExtension": "md",
  "GoNotes.notesExtensions": "md,markdown,txt"
}
```

| Setting | Type | Default | Description |
|---|---|---|---|
| `GoNotes.notesLocation` | `string` | `""` | Absolute path to the notes storage folder. |
| `GoNotes.notesDefaultNoteExtension` | `string` | `"md"` | Default file extension for new notes. Do not include the dot. |
| `GoNotes.notesExtensions` | `string` | `"md,markdown,txt"` | Comma-separated list of file extensions shown in the panel. Do not include dots or spaces. |

---

## Project Structure

```
gonotes/
├── extension.js        # Extension entry point, registers all commands
├── NotesProvider.js    # TreeDataProvider for the notes panel in the Activity Bar
├── Note.js             # TreeItem model representing individual notes and folders
├── resources/          # Icon assets (SVG and PNG) for light and dark themes
└── package.json        # VSCode extension manifest
```

---

## Contributing

Contributions are welcome. Please follow these steps:

1. **Fork** this repository.
2. Create a new **branch**: `git checkout -b feature/your-feature-name`.
3. Make your changes and **commit**: `git commit -m "feat: add your feature name"`.
4. **Push** to your branch: `git push origin feature/your-feature-name`.
5. Open a **Pull Request** to the `main` branch.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for full details.

---

## Links

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=alhifnywahid.gonotes)
- [GitHub Repository](https://github.com/alhifnywahid/gonotes)
- [Report an Issue](https://github.com/alhifnywahid/gonotes/issues)
