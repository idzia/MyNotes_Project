function Note (title, content) {
    this.title = title;
    this.content = content
};

var preparNoteHTML = function (note) {
    (!note.title) ? title = "" : title = note.title;
    (note.content == undefined) ? content = "" : content = note.content;

    return '<div class="note">' +
    '<button class="remove"></button>' +
    '<input type="text" value="' + title + '" class="title" placeholder="Note Title"/>' + 
    '<textarea rows="10" cols="25" class="content" placeholder="Note Content" >' + content +' </textarea>' +
    '</div>';
    //'<input type="text"  value="' + content + '" class="content" placeholder="Note Content" />' + 
};

var putNoteInToHTML = function (note) {
    if (!note) {
        note = new Note("", "");
    }
        
    var noteHTML = preparNoteHTML(note);
    document.getElementById("table").innerHTML += noteHTML;
    
    var buttonsDeleteArray = document.querySelectorAll('.remove');
   
    for (var i=0; i < buttonsDeleteArray.length; i++) {

        buttonsDeleteArray[i].addEventListener('click', deleteNote);
    }

    var nodeNoteList = document.querySelectorAll("div.note"); 
    
    for (var i=0; i < nodeNoteList.length; i++) {
    
        var titleNote = nodeNoteList[i].querySelector("input.title");
        var contentNote = nodeNoteList[i].querySelector("textarea.content");
        
        titleNote.addEventListener("change", updateLocalStorage);
        contentNote.addEventListener("change", updateLocalStorage);
    };
};

var deleteNote = function(event) {
    
    var child = event.target.parentNode;
    var parent = child.parentNode;
    parent.removeChild(child);
    updateLocalStorage();
};

var updateLocalStorage = function() {
   
    var nodeNoteList = document.querySelectorAll("div.note");  
    var toJson = "";
    var noteArray = [];
   
    for (var i=0; i < nodeNoteList.length; i++) {
    
        var nodeNote = nodeNoteList[i];
        var titleNote = nodeNote.querySelector("input.title").value;
        var contentNote = nodeNote.querySelector("textarea.content").value;
        //var contentNote = nodeNote.querySelector("input.content").value;

        var note = new Note(titleNote, contentNote);
        noteArray.push(note);
    };
    localStorage.setItem("noteJSON", JSON.stringify(noteArray));
};

var readLocalStorage = function() {
    var noteArray = [];
    var htmlNotes = "";
    var json = localStorage.getItem("noteJSON");
    
    if (json != null) {
        noteArray = JSON.parse(json);
    };
    
    for (var i=0; i < noteArray.length; i++) {
        putNoteInToHTML(noteArray[i]);
    };
};

var buttonAddNote = document.querySelector('#add');
buttonAddNote.addEventListener('click', putNoteInToHTML);

// var buttonSave = document.querySelector('#save');
// buttonSave.addEventListener('click', updateLocalStorage);

readLocalStorage();





