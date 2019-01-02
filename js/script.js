function Note (title, content) {
    this.title = title;
    this.content = content
};

let preparNoteHTML = function (note) {
    (!note.title) ? title = "" : title = note.title;
    (note.content == undefined) ? content = "" : content = note.content;

    return '<button class="remove"></button>' +
    '<input type="text" value="' + title + '" class="title" placeholder="Note Title"/>' + 
    '<textarea rows="10" cols="25" class="content" placeholder="Note Content" >' + content + '</textarea>';
    
};

let putNoteInToHTML = function (note) {

    if (!note) {
        note = new Note("", "");
    }

    let div = document.createElement('div');
    div.setAttribute('class', 'note');
    div.innerHTML = preparNoteHTML(note);
    document.getElementById("table").appendChild(div);

    let buttonsDeleteArray = document.querySelectorAll('.remove');
   
    for (let i=0; i < buttonsDeleteArray.length; i++) {

        buttonsDeleteArray[i].addEventListener('click', deleteNote);
    }

    let nodeNoteList = document.querySelectorAll("div.note"); 
    
    for (let i=0; i < nodeNoteList.length; i++) {
    
        let titleNote = nodeNoteList[i].querySelector("input.title");
        let contentNote = nodeNoteList[i].querySelector("textarea.content");
        
        titleNote.addEventListener("change", updateLocalStorage);
        contentNote.addEventListener("change", updateLocalStorage);
    };
};

let deleteNote = function(event) {
    
    let child = event.target.parentNode;
    let parent = child.parentNode;
    parent.removeChild(child);
    updateLocalStorage();
};

let updateLocalStorage = function() {
    console.log('updateLocalStorage');
   
    let nodeNoteList = document.querySelectorAll("div.note");  
    let toJson = "";
    let noteArray = [];
   
    for (let i=0; i < nodeNoteList.length; i++) {
    
        let nodeNote = nodeNoteList[i];
        let titleNote = nodeNote.querySelector("input.title").value;
        let contentNote = nodeNote.querySelector("textarea.content").value;
        //let contentNote = nodeNote.querySelector("input.content").value;

        let note = new Note(titleNote, contentNote);
        noteArray.push(note);
    };
    localStorage.setItem("noteJSON", JSON.stringify(noteArray));
};

let readLocalStorage = function() {
    let noteArray = [];
    let htmlNotes = "";
    let json = localStorage.getItem("noteJSON");
    
    if (json != null) {
        noteArray = JSON.parse(json);
    }

    for (let i=0; i < noteArray.length; i++) {
        putNoteInToHTML(noteArray[i]);
    }
};

let buttonAddNote = document.querySelector('#add');
buttonAddNote.addEventListener('click', putNoteInToHTML);


readLocalStorage();





