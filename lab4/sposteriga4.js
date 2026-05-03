class LightNode {
    constructor() {
        this.listeners = {};
    }
    addEventListener(eventType, listener) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    }
    trigger(eventType) {
        let eventListeners = this.listeners[eventType];
        if (eventListeners) {
            for (let i = 0; i < eventListeners.length; i++) {
                eventListeners[i]();
            }
        }
    }
}

class LightElementNode extends LightNode {
    constructor(tag) {
        super();
        this.tag = tag;
    }
}

let button = new LightElementNode("button");
button.addEventListener("click", function() {
    console.log("Подія click успішно спрацювала!");
});
button.addEventListener("mouseover", function() {
    console.log("Подія mouseover успішно спрацювала!");
});

button.trigger("click");// force update