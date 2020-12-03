class Note {
    constructor(title, text) {
        // Create Card Title and Text Elements
        const titleEle = document.createElement("input");
        const textEle = document.createElement("textarea");

        // Set attributes to Title and Text
        titleEle.setAttribute("type", "text");
        titleEle.setAttribute("maxlength", "25");
        titleEle.setAttribute("disabled", "");
        textEle.setAttribute("disabled", "");

        titleEle.value = title;
        textEle.value = text;
        titleEle.classList.add("note-title");
        textEle.classList.add("note-text");

        // Create card addition timestamp
        const timeEle = document.createElement("time");
        const timeIcon = document.createElement("span");
        timeIcon.classList.add("material-icons");
        timeIcon.innerHTML = "calendar_today";
        const time = new Date();
        timeEle.setAttribute("datetime", time.toUTCString());
        timeEle.appendChild(timeIcon);
        timeEle.innerHTML += time.toUTCString().split(" ").slice(0, 4).join(" ");

        // create card button elements
        const btns = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn);
        btns.classList.add("note-btns");

        // add material icons to card buttons
        const editIcon = document.createElement("span");
        editIcon.classList.add("material-icons");
        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-icons");
        editIcon.innerHTML = "edit";
        deleteIcon.innerHTML = "delete";
        editBtn.appendChild(editIcon);
        deleteBtn.appendChild(deleteIcon);

        // add all card elements to card
        this.note = document.createElement("div");
        this.note.classList.add("note");
        for (let child of [timeEle, titleEle, textEle, btns]) {
            this.note.appendChild(child);
        }

        // create a background color for card
        const color = `hsl(${Math.ceil(360*Math.random())},${Math.ceil(71*Math.random())+24}%,${Math.ceil(11*Math.random())+80}%)`;
        this.note.style.backgroundColor = color;

        // attach delete event for card
        deleteBtn.addEventListener("click", () => {
            this.note.parentElement.removeChild(this.note);
            document.querySelector(".overlay").style.display = "none";
        });

        // attach overlay editor for card
        editBtn.addEventListener("click", () => {
            const title = this.note.querySelector(".note-title");
            const text = this.note.querySelector(".note-text");
            const overlay = document.querySelector(".overlay");
            if (editIcon.innerHTML === "edit") {
                this.note.classList.add("note-overlay");
                overlay.style.display = "block";
                title.setAttribute("placeholder", "Title");
                text.setAttribute("placeholder", "Take a note...");
                title.removeAttribute("disabled");
                text.removeAttribute("disabled");
                editIcon.innerHTML = "check_circle";
                title.focus();
            } else if (editIcon.innerHTML === "check_circle") {
                this.note.classList.remove("note-overlay");
                title.setAttribute("disabled", "");
                text.setAttribute("disabled", "");
                editIcon.innerHTML = "edit";
                title.removeAttribute("placeholder");
                text.removeAttribute("placeholder");
                overlay.style.display = "none";
            }
        });
    }
}

class Notes {
    // assumes you have a .notes section
    constructor() {
        this.notes = document.querySelector(".notes");
    }

    add(title, text) {
        const newNote = new Note(title, text);
        this.notes.prepend(newNote.note);
    }
}

const replaceNewLines = function(text) {
    return text.replace(/\\n/g, String.fromCharCode(13, 10));
}

const processText = function(text) {
    const processedText = replaceNewLines(text);
    return processedText;
}

document.addEventListener(
    "DOMContentLoaded",
    function() {
        let notes = new Notes();
        const titleInput = document.querySelector(".input-title");
        const textInput = document.querySelector(".input-text");
        const submitBtn = document.querySelector(".submit-btn");

        submitBtn.addEventListener("click", function() {
            notes.add(titleInput.value, processText(textInput.innerText));
        }); 

        textInput.addEventListener("focus", function(event) {
            titleInput.classList.remove("hidden");
        });

        textInput.addEventListener("focusout", function(event) {
            if (/^<br>$/.test(textInput.innerHTML)) {
                textInput.innerHTML = "";
            }
        });
    }
);
