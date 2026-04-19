class Hero {
    getDescription() { return "Герой"; }
}

class Warrior extends Hero {
    getDescription() { return "Воїн"; }
}

class Mage extends Hero {
    getDescription() { return "Маг"; }
}

class Paladin extends Hero {
    getDescription() { return "Паладин"; }
}

class InventoryDecorator extends Hero {
    constructor(hero) {
        super();
        this.hero = hero;
    }
    getDescription() { return this.hero.getDescription(); }
}

class Weapon extends InventoryDecorator {
    getDescription() { return this.hero.getDescription() + " з мечем"; }
}

class Clothes extends InventoryDecorator {
    getDescription() { return this.hero.getDescription() + " у броні"; }
}

let myHero = new Warrior();
myHero = new Weapon(myHero);
myHero = new Clothes(myHero);
console.log(myHero.getDescription());