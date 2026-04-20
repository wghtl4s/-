class NetworkLoadStrategy {
    load(href) {
        console.log("Завантаження картинки з мережі: " + href);
    }
}

class FileSystemLoadStrategy {
    load(href) {
        console.log("Завантаження картинки з диску: " + href);
    }
}

class LightImageNode {
    constructor(href) {
        this.href = href;
        if (href.indexOf("http") === 0) {
            this.strategy = new NetworkLoadStrategy();
        } else {
            this.strategy = new FileSystemLoadStrategy();
        }
    }
    display() {
        this.strategy.load(this.href);
    }
}

let webImage = new LightImageNode("http://site.com/img.jpg");
webImage.display();

let localImage = new LightImageNode("images/pic.jpg");
localImage.display();