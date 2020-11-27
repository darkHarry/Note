class Note {
    constructor(text) {
        const textEle = document.createElement("div");
        textEle.innerHTML = text;
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
        for (let child of [timeEle, textEle,editBtn, deleteBtn]) {
            this.note.appendChild(child);
        }

        // create a background color for note
        const color = `hsl(${Math.ceil(360*Math.random())},${Math.ceil(71*Math.random())+24}%,${Math.ceil(11*Math.random())+84}%)`;
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

    add(text) {
        const newNote = new Note(text);
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
        const inputForm = document.querySelector(".input-text");
        const submitBtn = document.querySelector("#submit-btn");

        submitBtn.addEventListener("click", function() {
            notes.add(processText(inputForm.innerHTML));
        }); 

        inputForm.addEventListener("focusout", function(event) {
            console.log(inputForm.innerHTML);
            if (/^<br>$/.test(inputForm.innerHTML)) {
                inputForm.innerHTML = "";
            }
        });
    }
);
