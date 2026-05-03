class Visitor {
    visitElementNode(node) {}
    visitTextNode(node) {}
}

class HtmlExportVisitor extends Visitor {
    visitElementNode(node) {
        console.log(`Аналіз елемента: <${node.tag}>`);
    }
    visitTextNode(node) {
        console.log(`Аналіз тексту: "${node.text}"`);
    }
}

class NodeState {
    render(node) {
        throw new Error("Метод має бути перевизначений");
    }
}

class VisibleState extends NodeState {
    render(node) {
        return node.buildHTML();
    }
}

class HiddenState extends NodeState {
    render(node) {
        return `<!-- Прихований вузол: ${node.tag || 'текст'} -->`;
    }
}

class Command {
    execute() {}
    undo() {}
}

class AddNodeCommand extends Command {
    constructor(parent, child) {
        super();
        this.parent = parent;
        this.child = child;
    }
    execute() {
        this.parent.children.push(this.child);
    }
    undo() {
        this.parent.children.pop();
    }
}

class DepthIterator {
    constructor(root) {
        this.stack = [root];
    }
    hasNext() {
        return this.stack.length > 0;
    }
    next() {
        if (!this.hasNext()) return null;
        let current = this.stack.pop();
        if (current instanceof LightElementNode) {
            for (let i = current.children.length - 1; i >= 0; i--) {
                this.stack.push(current.children[i]);
            }
        }
        return current;
    }
}

class LightNode {
    constructor() {
        this.state = new VisibleState();
    }

    render() {
        this.onCreated();
        const result = this.state.render(this);
        this.onRendered();
        return result;
    }

    buildHTML() {
        throw new Error("Метод має бути перевизначений");
    }

    accept(visitor) {
        throw new Error("Метод має бути перевизначений");
    }

    onCreated() {}
    onRendered() {}

    changeState(newState) {
        this.state = newState;
    }
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
    }

    buildHTML() {
        return this.text;
    }

    accept(visitor) {
        visitor.visitTextNode(this);
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

    buildHTML() {
        let classString = "";
        if (this.cssClasses.length > 0) {
            classString = ' class="' + this.cssClasses.join(" ") + '"';
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

    accept(visitor) {
        visitor.visitElementNode(this);
        for (let child of this.children) {
            child.accept(visitor);
        }
    }

    getIterator() {
        return new DepthIterator(this);
    }

    onCreated() {
    }

    onRendered() {
    }
}

let table = new LightElementNode("table", "block", "paired", ["table-class"]);
let tr = new LightElementNode("tr", "block", "paired", []);
let th = new LightElementNode("th", "inline", "paired", []);
let thText = new LightTextNode("Заголовок");
let td = new LightElementNode("td", "inline", "paired", []);
let tdText = new LightTextNode("Дані");

new AddNodeCommand(th, thText).execute();
new AddNodeCommand(td, tdText).execute();
new AddNodeCommand(tr, th).execute();
new AddNodeCommand(tr, td).execute();
new AddNodeCommand(table, tr).execute();

console.log("--- Звичайний рендер (Шаблонний метод) ---");
console.log(table.render());

console.log("\n--- Зміна стану (State) ---");
td.changeState(new HiddenState());
console.log(table.render());


console.log("\n--- Обхід дерева (Ітератор) ---");
let iterator = table.getIterator();
while (iterator.hasNext()) {
    let node = iterator.next();
    if (node instanceof LightElementNode) {
        console.log(`Знайдено тег: ${node.tag}`);
    } else if (node instanceof LightTextNode) {
        console.log(`Знайдено текст: ${node.text}`);
    }
}

console.log("\n--- Відвідувач (Visitor) ---");
let exportVisitor = new HtmlExportVisitor();
table.accept(exportVisitor);
