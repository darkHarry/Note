class Note {
    constructor(title, text) {
        const titleEle = document.createElement("div"); 
        const textEle = document.createElement("div");

        titleEle.innerHTML = title;
        textEle.innerHTML = text;
        titleEle.classList.add("note-title");
        textEle.classList.add("note-text");

        const timeEle = document.createElement("time");
        const time = new Date();
        timeEle.setAttribute("datetime", time.toUTCString());
        timeEle.innerHTML = time.toUTCString().split(" ").slice(0, 4).join(" ");

        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        editBtn.innerHTML = "Edit";
        deleteBtn.innerHTML = "Delete";

        this.note = document.createElement("div");
        this.note.classList.add("note");
        for (let child of [timeEle, titleEle, textEle,editBtn, deleteBtn]) {
            this.note.appendChild(child);
        }

        // create a background color for note
        const color = `hsl(${Math.ceil(360*Math.random())},${Math.ceil(71*Math.random())+24}%,${Math.ceil(11*Math.random())+80}%)`;
        this.note.style.backgroundColor = color;

        deleteBtn.addEventListener("click", () => {
            this.note.parentElement.removeChild(this.note);
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

const removeDivs = function(text) {
    return text.split("<div>").join("");
}

const processText = function(text) {
    const processedText = removeDivs(text);
    return processedText;
}

document.addEventListener(
    "DOMContentLoaded",
    function() {
        let notes = new Notes();
        const titleInput = document.querySelector(".input-title");
        const textInput = document.querySelector(".input-text");
        const submitBtn = document.querySelector("#submit-btn");

        submitBtn.addEventListener("click", function() {
            notes.add(titleInput.value, processText(textInput.innerHTML));
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
