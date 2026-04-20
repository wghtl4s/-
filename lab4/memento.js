class TextDocumentMemento {
    constructor(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
}

class TextDocument {
    constructor() {
        this.text = "";
    }
    write(newText) {
        this.text += newText;
    }
    save() {
        return new TextDocumentMemento(this.text);
    }
    restore(memento) {
        this.text = memento.getContent();
    }
}

class TextEditor {
    constructor(document) {
        this.document = document;
        this.history = [];
    }
    saveDocument() {
        this.history.push(this.document.save());
        console.log("Документ збережено.");
    }
    undo() {
        if (this.history.length > 0) {
            let lastSave = this.history.pop();
            this.document.restore(lastSave);
            console.log("Зміни скасовано.");
        }
    }
}

let doc = new TextDocument();
let editor = new TextEditor(doc);

doc.write("Перша частина. ");
editor.saveDocument();

doc.write("Друга частина.");
console.log("Поточний стан: " + doc.text);

editor.undo();
console.log("Після відміни: " + doc.text);