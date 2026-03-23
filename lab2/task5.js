class Character {
    constructor() {
        this.name = "";
        this.height = 0;
        this.build = "";
        this.hairColor = "";
        this.eyeColor = "";
        this.clothes = "";
        this.inventory = [];
        this.deeds = [];
    }

    showInfo() {
        console.log(`\nПерс: ${this.name}`);
        console.log(`Зріст: ${this.height} см | Статура: ${this.build}`);
        console.log(`Волосся: ${this.hairColor} | Очі: ${this.eyeColor}`);
        console.log(`Одяг: ${this.clothes}`);
        console.log(`Інвентар: ${this.inventory.join(", ") || "порожньо"}`);
        console.log(`Список справ:\n - ${this.deeds.join("\n - ") || "ще нічого не зроблено"}`);
    }
}

class CharacterBuilder {
    constructor() {
        this.character = new Character();
    }

    setName(name) { this.character.name = name; return this; }
    setHeight(height) { this.character.height = height; return this; }
    setBuild(build) { this.character.build = build; return this; }
    setHairColor(color) { this.character.hairColor = color; return this; }
    setEyeColor(color) { this.character.eyeColor = color; return this; }
    setClothes(clothes) { this.character.clothes = clothes; return this; }
    addInventoryItem(item) { this.character.inventory.push(item); return this; }

    build() {
        const result = this.character;
        this.character = new Character();
        return result;
    }
}

class HeroBuilder extends CharacterBuilder {
    addGoodDeed(deed) {
        this.character.deeds.push(`[Добро] ${deed}`);
        return this;
    }
}

class EnemyBuilder extends CharacterBuilder {
    addEvilDeed(deed) {
        this.character.deeds.push(`[Зло] ${deed}`);
        return this;
    }
}

class Director {
    constructDreamHero(builder) {
        return builder
            .setName("Роман")
            .setHeight(178)
            .setBuild("Стрункий")
            .setHairColor("Русяве")
            .setEyeColor("Сіро-блакитні")
            .setClothes("Роба")
            .addInventoryItem("Камень долі")
            .addInventoryItem("Цеглинка")
            .addGoodDeed("Звергнув злого короля")
            .addGoodDeed("Врятував свого травяного двойника")
            .build();
    }

    constructWorstEnemy(builder) {
        return builder
            .setName("Саша")
            .setHeight(160)
            .setBuild("Мініатюрний")
            .setHairColor("Білявий")
            .setEyeColor("Жовті")
            .setClothes("Плащ")
            .addInventoryItem("Посох")
            .addEvilDeed("Захопив місто")
            .addEvilDeed("Не будував дороги")
            .build();
    }
}

function main() {
    const director = new Director();

    const heroBuilder = new HeroBuilder();
    const myHero = director.constructDreamHero(heroBuilder);
    myHero.showInfo();

    const enemyBuilder = new EnemyBuilder();
    const myEnemy = director.constructWorstEnemy(enemyBuilder);
    myEnemy.showInfo();
}

main();