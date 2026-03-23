class Virus {
    constructor(weight, age, name, species) {
        this.weight = weight;
        this.age = age;
        this.name = name;
        this.species = species;
        this.children = [];
    }

    addChild(childVirus) {
        this.children.push(childVirus);
    }

    clone() {
        const clonedVirus = new Virus(this.weight, this.age, this.name, this.species);
        clonedVirus.children = this.children.map(child => child.clone());

        return clonedVirus;
    }

    printFamilyTree(level = 0) {
        const indent = "  ".repeat(level);
        console.log(`${indent}- ${this.name} (${this.species}) | Вік: ${this.age}, Вага: ${this.weight}`);

        for (const child of this.children) {
            child.printFamilyTree(level + 1);
        }
    }
}

function main() {
    console.log("створюємо віруси:");

    const grandParentVirus = new Virus(0.5, 10, "А", "Вовчанка");

    const child1 = new Virus(0.2, 5, "А", "Вовчанка");
    const child2 = new Virus(0.3, 6, "Б", "Вовчанка");

    const grandChild1 = new Virus(0.1, 1, "Ц", "Вовчанка");
    const grandChild2 = new Virus(0.1, 2, "Д", "Вовчанка");

    child1.addChild(grandChild1);
    child1.addChild(grandChild2);

    grandParentVirus.addChild(child1);
    grandParentVirus.addChild(child2);

    console.log("оригінальний вірус та його нащадки");
    grandParentVirus.printFamilyTree();

    console.log("\nклонуємо прабатька");
    const clonedGrandParent = grandParentVirus.clone();

    clonedGrandParent.name = "клон_A";
    clonedGrandParent.children[0].children[0].name = "клон_Д";

    console.log("\nклон:");
    clonedGrandParent.printFamilyTree();

    console.log("\nоригінал:");
    grandParentVirus.printFamilyTree();

    console.log("\nперевірка: Якщо оригінал не змінився після модифікації клону, глибоке клонування працює!");
}

main();