class Visitor {
    visitElement(node) {
        console.log("Я відвідав тег: " + node.tag);
    }
    visitText(node) {
        console.log("Я відвідав текст: " + node.text);
    }
}

class LightNode {
    getOuterHTML() {}
    getInnerHTML() {}
    accept(visitor) {}
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
    }
    accept(visitor) {
        visitor.visitText(this);
    }
    getOuterHTML() {
        return this.text;
    }
    getInnerHTML() {
        return this.text;
    }
}

class LightElementNode extends LightNode {
    constructor(tag, displayType, closingType, cssClasses) {
        super();
        this.tag = tag;
        this.displayType = displayType;
        this.closingType = closingType;
        this.cssClasses = cssClasses;
        this.children = [];
    }
    addChild(node) {
        this.children.push(node);
    }
    accept(visitor) {
        visitor.visitElement(this);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].accept(visitor);
        }
    }
    getInnerHTML() {
        let html = "";
        for (let i = 0; i < this.children.length; i++) {
            html += this.children[i].getOuterHTML();
        }
        return html;
    }
    getOuterHTML() {
        let classString = "";
        if (this.cssClasses.length > 0) {
            let classesJoined = "";
            for (let i = 0; i < this.cssClasses.length; i++) {
                classesJoined += this.cssClasses[i];
                if (i < this.cssClasses.length - 1) {
                    classesJoined += " ";
                }
            }
            classString = ' class="' + classesJoined + '"';
        }

        let openTag = "<" + this.tag + classString + ">";

        if (this.closingType === "single") {
            return "<" + this.tag + classString + " />";
        }

        let inner = this.getInnerHTML();
        let closeTag = "</" + this.tag + ">";

        return openTag + inner + closeTag;
    }
}

let table = new LightElementNode("table", "block", "paired", ["table-class"]);
let tr = new LightElementNode("tr", "block", "paired", []);
let thText = new LightTextNode("Заголовок");

tr.addChild(thText);
table.addChild(tr);

let myVisitor = new Visitor();
table.accept(myVisitor);