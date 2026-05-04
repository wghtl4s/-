class SimpleIterator {
    constructor(elements) {
        this.elements = elements;
        this.index = 0;
    }
    hasNext() {
        return this.index < this.elements.length;
    }
    next() {
        let current = this.elements[this.index];
        this.index = this.index + 1;
        return current;
    }
}

class LightNode {
    getOuterHTML() {}
    getInnerHTML() {}
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
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
    getIterator() {
        return new SimpleIterator(this.children);
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
let td1 = new LightElementNode("td", "inline", "paired", []);
let td2 = new LightElementNode("td", "inline", "paired", []);

tr.addChild(td1);
tr.addChild(td2);
table.addChild(tr);

let iterator = tr.getIterator();
while (iterator.hasNext()) {
    let node = iterator.next();
    console.log("Знайдено дочірній тег:", node.tag);
}