


document.addEventListener("DOMContentLoaded", (event) => {
    // obtener referencias a los elementos del DOM
    const noteForm = document.getElementById("note_form");
    const notesListContainer = document.getElementById("existing_notes_container");
    const noteTitleInput = document.getElementById("note_title");
    const noteContentInput = document.getElementById("note_content");
    const noteDateInput = document.getElementById("note_date");
    const noteColorInput = document.getElementById("note_color");
    const noteUrgencySelect = document.getElementById("note_urgency");
    const noteSortSelect = document.getElementById("note_sort");


    const figuresContainer = document.getElementById("animation-container");
    const shapeType = ["square", "circle", "triangle"];



    // crear figuras

    function createFigures() {
        for (let i = 0; i < 80; i++) {
            const shapeDiv = document.createElement("div");
            // asignar una clase de forma aleatoria
            shapeDiv.className = shapeType[i % shapeType.length];
            figuresContainer.appendChild(shapeDiv);
        }
    }


    // crear y añadir nueva nota
    function createNote(event) {
        event.preventDefault();
        const title = noteTitleInput.value.trim(); // .trim()quitar espacios inicio/final
        const content = noteContentInput.value.trim();
        const date = noteDateInput.value;
        const color = noteColorInput.value;
        const urgency = noteUrgencySelect.value;

        // valida que haya titulo o contlenido
        if (!title && !content) {
            alert("Error: por favor, ingresa un titulo o contenido para la nota.");
            return;
        }

        // crear el elemento div para la nota
        let noteItem = document.createElement("div");
        noteItem.classList.add("note-item");


        // crear el p con el contenido de la nota
        let noteParagraph = document.createElement("p");
        noteParagraph.textContent = `${title ? title + ': ' : ''}${content} - ${date} - ${urgency}`;
        noteParagraph.style.color = color;

        // crear el button de eliminar
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar Nota";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            noteItem.remove();
            saveNotes(); // guarda los cambios en localStorage
            console.log("Nota eliminada");
        };

        // add el p y el boton al div de la nota
        noteItem.appendChild(noteParagraph);
        noteItem.appendChild(deleteButton);

        // Add la nueva nota al contenedor de notas existentes
        notesListContainer.appendChild(noteItem);

        // guarda la nota en localStorage
        saveNotes();

        // limpiar tras crear la nota
        noteForm.reset();
        noteTitleInput.focus();


    }


    // Add el event listener x crear nota
    noteForm.addEventListener("submit", createNote);

    // eliminar notas 
    notesListContainer.addEventListener("click", function (event) {
        event.target.closest(".note-item").remove();
        console.log("Nota eliminada");
    });


    //guardar notas en el localStorage 

    function saveNotes() {
        const notes = [];

        // Selecciona todos los elementos de nota
        document.querySelectorAll(".note-item").forEach(noteItem => {
            const paragraphText = noteItem.querySelector("p").textContent;
            const noteTextColor = noteItem.querySelector("p").style.color;

            const parts = paragraphText.split(' - ');
            let title = "";
            let content = "";
            let date = "";
            let urgency = "";
            //  let color = noteColorInput.value;

            if (parts.length >= 3) {
                date = parts[parts.length - 2];
                urgency = parts[parts.length - 1];
                const contentAndTitle = parts.slice(0, parts.length - 2).join("" - "");
                const titleSeparatorIndex = contentAndTitle.indexOf(": ");
                if (titleSeparatorIndex !== -1) {
                    title = contentAndTitle.substring(0, titleSeparatorIndex);
                    content = contentAndTitle.substring(titleSeparatorIndex + 2);
                } else {
                    content = contentAndTitle;
                }
            }

            // Guarda en el []
            notes.push({
                title: title,
                content: content,
                date: date,
                color: noteTextColor, // color de la nota
                urgency: urgency
            });
        });

        // el array de notas a una cadena JSON y garda
        localStorage.setItem("myNotesApp_notes", JSON.stringify(notes));
        console.log("Notas guardadas en localStorage");

    }


    // carga notas
    function loadNotes() {
        const storedNotes = localStorage.getItem("myNotesApp_notes");

        if (storedNotes) { // Si hay notas 
            const notes = JSON.parse(storedNotes);

            notes.forEach(noteData => {

                let noteItem = document.createElement("div");
                noteItem.classList.add("note-item");


                let noteParagraph = document.createElement("p");
                // rconstruye el texto da nota
                noteParagraph.textContent = `${noteData.title ? noteData.title + ': ' : ''}${noteData.content} - ${noteData.date} - ${noteData.urgency}`;
                noteParagraph.style.color = noteData.color;

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar Nota";
                deleteButton.classList.add("delete-btn");
                deleteButton.onclick = function () {

                    noteItem.remove();
                    saveNotes();
                    console.log("Nota eliminada");
                };

                noteItem.appendChild(noteParagraph);
                noteItem.appendChild(deleteButton);

                notesListContainer.appendChild(noteItem);


            });
            console.log("Notas cargadas desde localStorage!");
        }
    }



    // carga notas
    function loadNotes() {
        const storedNotes = localStorage.getItem("myNotesApp_notes");

        if (storedNotes) { // Si hay notas 
            const notes = JSON.parse(storedNotes);

            notes.forEach(noteData => {

                let noteItem = document.createElement("div");
                noteItem.classList.add("note-item");


                let noteParagraph = document.createElement("p");
                // rconstruye el texto da nota
                noteParagraph.textContent = `${noteData.title ? noteData.title + ': ' : ''}${noteData.content} : ${noteData.date} : ${noteData.urgency}`;
                // noteParagraph.textContent = `${noteData.title ? noteData.title + ': ' : ''}${noteData.content} - ${noteData.date} - ${noteData.urgency}`;
                noteParagraph.style.color = noteData.color;

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar Nota";
                deleteButton.classList.add("delete-btn");
                deleteButton.onclick = function () {

                    noteItem.remove();
                    saveNotes();
                    console.log("Nota eliminada");
                };

                noteItem.appendChild(noteParagraph);
                noteItem.appendChild(deleteButton);

                notesListContainer.appendChild(noteItem);


            });
            console.log("Notas cargadas desde localStorage!");
        }
    }


    // Ordenar notas por título
    function sortNotesByTitle() {
        let notes = Array.from(document.querySelectorAll(".note-item"));
        notes.sort((a, b) => {
            const titleA = a.querySelector("p").textContent.split(":")[0].toLowerCase();
            const titleB = b.querySelector("p").textContent.split(":")[0].toLowerCase();
            return titleA.localeCompare(titleB);
        });
        notes.forEach(note => {
            notesListContainer.appendChild(note);
        });
    }


    // Ordenar notas por fecha
    function sortNotesByDate() {
        let notes = Array.from(document.querySelectorAll(".note-item"));
        notes.sort((a, b) => {
            const dateA = Date.parse(a.querySelector("p").textContent.split(": ")[2]);
            console.log(dateA);
            const dateB = Date.parse(b.querySelector("p").textContent.split(": ")[2]);
            console.log(dateB);
            return new Date(dateA) - new Date(dateB);
        });
        notes.forEach(note => {
            notesListContainer.appendChild(note);
        });
    }

    // Add el event listener para ordenar por título
    noteSortSelect.addEventListener("change", function () {
        if (noteSortSelect.value === "titulo") {
            sortNotesByTitle();
        } else if (noteSortSelect.value === "fecha") {
            sortNotesByDate();
        }
    });

    /*
        //fondo
        function randomValues() {
            anime({
                targets: ".square, .circle, .triangle",
                translateX: function () {
                    return anime.random(-500, window.innerWidth + 500);
                },
                translateY: function () {
                    return anime.random(-300, window.innerHeight + 300);
                },
                rotate: function () {
                    return anime.random(0, 360);
                },
                scale: function () {
                    return anime.random(0.5, 2);
                },
                duration: function () { return anime.random(2000, 5000); },
                easing: "easeInOutQuad",
                loop: true
            });
        }
    */

    createFigures()
    loadNotes();
    createFigures();
    sortNotesByTitle();

    // randomValues();


});






