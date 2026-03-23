class Subscription {
    constructor(monthlyFee, minPeriod, channels) {
        this.monthlyFee = monthlyFee;
        this.minPeriod = minPeriod;
        this.channels = channels;
    }

    getDescription() {
        return `ціна: ${this.monthlyFee} грн/міс, період: ${this.minPeriod} міс, канали: ${this.channels.join(", ")}`;
    }
}
class DomesticSubscription extends Subscription {
    constructor() {
        super(150, 1, ["СК1", "1+1", "ТЕТ"]);
    }
}
class EducationalSubscription extends Subscription {
constructor() {
    super(100, 6, ["National Geographic","Mathematical"]);
}
}

class PremiumSubscription extends Subscription {
constructor() {
    super(400, 1, ["K1","Новий канал"]);
}
}
class VideoProvider {
    createSubscription(type) {
        throw new Error("Метод має бути реалізований");
    }
}

class WebSite extends VideoProvider {
    createSubscription(type) {
        console.log("Створення через WebSite...");
        if (type === "domestic") return new DomesticSubscription();
        if (type === "premium") return new PremiumSubscription();
    }
}

class MobileApp extends VideoProvider {
    createSubscription(type) {
        console.log("Створення через MobileApp...");
        if (type === "educational") return new EducationalSubscription();
    }
}

const site = new WebSite();
const mySub = site.createSubscription("premium");
console.log(mySub);


