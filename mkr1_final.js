class Command {
    execute() {}
}
class AddChildCommand extends Command {
    constructor(parent, child) {
        super();
        this.parent = parent;
        this.child = child;
    }
    execute() {
        this.parent.children.push(this.child);
    }
}

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

class Visitor {
    visitElement(node) {
        console.log("Відвідувач зайшов у тег: " + node.tag);
    }
    visitText(node) {
        console.log("Відвідувач побачив текст: " + node.text);
    }
}

class NodeState {
    renderHTML(node) {}
}
class VisibleState extends NodeState {
    renderHTML(node) {
        return node.getActualHTML();
    }
}
class HiddenState extends NodeState {
    renderHTML(node) {
        return "<!-- прихований елемент -->";
    }
}

class LightNode {
    constructor() {
        this.state = new VisibleState();
    }
    changeState(newState) {
        this.state = newState;
    }
    render() {
        this.onCreated();
        let result = this.state.renderHTML(this);
        this.onRendered();
        return result;
    }
    onCreated() {
        console.log("Хук: початок рендерингу...");
    }
    onRendered() {
        console.log("Хук: рендеринг завершено!");
    }
    getActualHTML() {}
    accept(visitor) {}
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
    }
    getActualHTML() {
        return this.text;
    }
    accept(visitor) {
        visitor.visitText(this);
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
        let command = new AddChildCommand(this, node);
        command.execute();
    }
    getIterator() {
        return new SimpleIterator(this.children);
    }
    accept(visitor) {
        visitor.visitElement(this);
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].accept(visitor);
        }
    }
    getActualHTML() {
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

        let inner = "";
        for (let i = 0; i < this.children.length; i++) {
            inner += this.children[i].render();
        }

        let closeTag = "</" + this.tag + ">";

        return openTag + inner + closeTag;
    }
}

let table = new LightElementNode("table", "block", "paired", ["table-class"]);
let tr = new LightElementNode("tr", "block", "paired", []);
let thText = new LightTextNode("Заголовок");

tr.addChild(thText);
table.addChild(tr);

console.log("--- Вивід HTML ---");
console.log(table.render());

console.log("\n--- Робота Відвідувача ---");
let myVisitor = new Visitor();
table.accept(myVisitor);