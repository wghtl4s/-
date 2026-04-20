class LightNode {
    getOuterHTML() {}
}

class LightTextNode extends LightNode {
    constructor(text) {
        super();
        this.text = text;
    }
    getOuterHTML() {
        return this.text;
    }
}

class LightElementNode extends LightNode {
    constructor(tag) {
        super();
        this.tag = tag;
        this.displayType = "block";
        this.closingType = "paired";
    }

    getOuterHTML(innerHTML) {
        return `<${this.tag}>${innerHTML}</${this.tag}>`;
    }
}

class ElementFactory {
    constructor() {
        this.elements = {};
    }
    getElement(tag) {
        if (!this.elements[tag]) {
            this.elements[tag] = new LightElementNode(tag);
        }
        return this.elements[tag];
    }
}

const bookText = `ACT V
Scene I. Mantua. A Street.
Scene II. Friar Lawrence's Cell.
Scene III. A churchyard.
 Dramatis Personae
ESCALUS, Prince of Verona.
MERCUTIO, kinsman to the Prince.`;

function renderWithoutFlyweight(text) {
    let lines = text.split('\n');
    let totalObjects = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let tag = "p";

        if (i === 0) tag = "h1";
        else if (line.length < 20) tag = "h2";
        else if (line.startsWith(" ")) tag = "blockquote";

        let element = new LightElementNode(tag);
        let textNode = new LightTextNode(line);
        totalObjects += 2;
    }
    console.log(`[Пам'ять] БЕЗ Легковаговика створено об'єктів: ${totalObjects}`);
}

function renderWithFlyweight(text) {
    let lines = text.split('\n');
    let factory = new ElementFactory();
    let totalObjects = 0;
    let htmlResult = "";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let tag = "p";

        if (i === 0) {
            tag = "h1";
        } else if (line.length < 20) {
            tag = "h2";
        } else if (line.startsWith(" ")) {
            tag = "blockquote";
        }

        let element = factory.getElement(tag);
        let textNode = new LightTextNode(line);
        totalObjects += 1;

        htmlResult += element.getOuterHTML(textNode.getOuterHTML()) + "\n";
    }

    let cachedTagsCount = Object.keys(factory.elements).length;
    totalObjects += cachedTagsCount;

    console.log(`[Пам'ять] З Легковаговиком створено об'єктів: ${totalObjects} (з них тегів у кеші: ${cachedTagsCount})`);
    console.log("\n--- Результат верстки ---");
    console.log(htmlResult);
}

renderWithoutFlyweight(bookText);
renderWithFlyweight(bookText);