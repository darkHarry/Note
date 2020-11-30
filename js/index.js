class Note {
    constructor(title, text) {
        const titleEle = document.createElement("input");
        const textEle = document.createElement("textarea");

        titleEle.setAttribute("type", "text");
        titleEle.setAttribute("maxlength", "25");
        titleEle.setAttribute("disabled", "");
        textEle.setAttribute("disabled", "");

        titleEle.value = title;
        textEle.value = text;
        titleEle.classList.add("note-title");
        textEle.classList.add("note-text");

        const timeEle = document.createElement("time");
        const time = new Date();
        timeEle.setAttribute("datetime", time.toUTCString());
        timeEle.innerHTML = time.toUTCString().split(" ").slice(0, 4).join(" ");

        const btns = document.createElement("div");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn);
        btns.classList.add("note-btns");

        editBtn.innerHTML = "Edit";
        deleteBtn.innerHTML = "Delete";

        this.note = document.createElement("div");
        this.note.classList.add("note");
        for (let child of [timeEle, titleEle, textEle, btns]) {
            this.note.appendChild(child);
        }

        // create a background color for note
        const color = `hsl(${Math.ceil(360*Math.random())},${Math.ceil(71*Math.random())+24}%,${Math.ceil(11*Math.random())+80}%)`;
        this.note.style.backgroundColor = color;

        deleteBtn.addEventListener("click", () => {
            this.note.parentElement.removeChild(this.note);
            document.querySelector(".overlay").style.display = "none";
        });

        editBtn.addEventListener("click", () => {
            const title = this.note.querySelector(".note-title");
            const text = this.note.querySelector(".note-text");
            const overlay = document.querySelector(".overlay");
            if (editBtn.innerHTML === "Edit") {
                this.note.classList.add("note-overlay");
                overlay.style.display = "block";
                title.setAttribute("placeholder", "Title");
                text.setAttribute("placeholder", "Take a note...");
                title.removeAttribute("disabled");
                text.removeAttribute("disabled");
                editBtn.innerHTML = "Done";
                title.focus();
            } else if (editBtn.innerHTML === "Done") {
                this.note.classList.remove("note-overlay");
                title.setAttribute("disabled", "");
                text.setAttribute("disabled", "");
                editBtn.innerHTML = "Edit";
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
