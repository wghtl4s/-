class SupportHandler {
    setNext(handler) {
        this.next = handler;
        return handler;
    }
    handle(request) {
        if (this.next) {
            return this.next.handle(request);
        }
        return false;
    }
}

class Level1Support extends SupportHandler {
    handle(request) {
        if (request === 1) {
            console.log("Вирішено на рівні 1: Базові питання.");
            return true;
        } else {
            return super.handle(request);
        }
    }
}

class Level2Support extends SupportHandler {
    handle(request) {
        if (request === 2) {
            console.log("Вирішено на рівні 2: Технічна проблема.");
            return true;
        } else {
            return super.handle(request);
        }
    }
}

class Level3Support extends SupportHandler {
    handle(request) {
        if (request === 3) {
            console.log("Вирішено на рівні 3: Питання оплати.");
            return true;
        } else {
            return super.handle(request);
        }
    }
}

class Level4Support extends SupportHandler {
    handle(request) {
        if (request === 4) {
            console.log("Вирішено на рівні 4: Скарги та пропозиції.");
            return true;
        } else {
            return super.handle(request);
        }
    }
}

let level1 = new Level1Support();
let level2 = new Level2Support();
let level3 = new Level3Support();
let level4 = new Level4Support();
level1.setNext(level2).setNext(level3).setNext(level4);

let choice = 3;
let result = level1.handle(choice);
if (!result) {
    console.log("Правильний рівень не знайдено, меню повторюється.");
}