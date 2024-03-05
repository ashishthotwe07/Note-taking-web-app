// Constants for keyboard shortcuts
const CTRL_KEY = 17;
const S_KEY = 83;
const D_KEY = 68;
const E_KEY = 69;

// Save Note - Keyboard Shortcut: Ctrl + S
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.keyCode === S_KEY) {
    event.preventDefault();
    saveNote();
  }
});

// Delete Note - Keyboard Shortcut: Ctrl + D
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.keyCode === D_KEY) {
    event.preventDefault();
    deleteNote();
  }
});

// Edit Note - Keyboard Shortcut: Ctrl + E
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.keyCode === E_KEY) {
    event.preventDefault();
    editNote();
  }
});

// Save note button click event
document.getElementById("save-btn").addEventListener("click", saveNote);

function saveNote() {
  const noteInput = document.getElementById("note-input");
  const noteText = noteInput.value.trim();

  if (noteText !== "") {
    const noteItem = document.createElement("li");
    noteItem.className = "note-item";

    const noteParagraph = document.createElement("p");
    noteParagraph.textContent = noteText;
    noteItem.appendChild(noteParagraph);
    

    const deleteButton = createButton("delete-btn", "Delete", () => {
      noteItem.parentNode.removeChild(noteItem);
    });
    noteItem.appendChild(deleteButton);

    const editButton = createButton("edit-btn", "Edit", () => {
      noteParagraph.contentEditable = true;
      noteParagraph.focus();
      editButton.style.display = "none";
      saveButton.style.display = "inline";
    });
    noteItem.appendChild(editButton);

    const saveButton = createButton("save-btn", "Save", () => {
      noteParagraph.contentEditable = false;
      editButton.style.display = "inline";
      saveButton.style.display = "none";
    });
    saveButton.style.display = "none";
    noteItem.appendChild(saveButton);

    document.getElementById("note-list").appendChild(noteItem);

    noteInput.value = "";
  }
}

function deleteNote() {
  const noteList = document.getElementById("note-list");
  const selectedNote = noteList.querySelector(".note-item");
  if (selectedNote) {
    selectedNote.parentNode.removeChild(selectedNote);
  }
}

function editNote() {
  const noteList = document.getElementById("note-list");
  const selectedNote = noteList.querySelector(".note-item");
  if (selectedNote) {
    const noteParagraph = selectedNote.querySelector("p");
    noteParagraph.contentEditable = true;
    noteParagraph.focus();
    const editButton = selectedNote.querySelector(".edit-btn");
    const saveButton = selectedNote.querySelector(".save-btn");
    editButton.style.display = "none";
    saveButton.style.display = "inline";
  }
}

// Function to create button with specified class, text, and click event handler
function createButton(className, text, clickHandler) {
  const button = document.createElement("button");
  button.className = className;
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
}
