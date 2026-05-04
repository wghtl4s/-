class LightNode {
    getOuterHTML() {}
    getInnerHTML() {}

    render() {
        this.onCreated();
        let result = this.getOuterHTML();
        this.onRendered();
        return result;
    }

    onCreated() {
        console.log("Елемент почав створюватися");
    }

    onRendered() {
        console.log("Елемент успішно створено");
    }
}
