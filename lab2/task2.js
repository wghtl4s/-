class Laptop { showInfo() { throw new Error("Метод showInfo() має бути реалізований"); } }
class Netbook { showInfo() { throw new Error("Метод showInfo() має бути реалізований"); } }
class EBook { showInfo() { throw new Error("Метод showInfo() має бути реалізований"); } }
class Smartphone { showInfo() { throw new Error("Метод showInfo() має бути реалізований"); } }

class IProneLaptop extends Laptop { showInfo() { console.log("Laptop: IProne MacBlook"); } }
class IProneNetbook extends Netbook { showInfo() { console.log("Netbook: IProne AirMini"); } }
class IProneEBook extends EBook { showInfo() { console.log("EBook: IProne IPad"); } }
class IProneSmartphone extends Smartphone { showInfo() { console.log("Smartphone: IProne 17 Pro Max"); } }

class KiaomiLaptop extends Laptop { showInfo() { console.log("Laptop: Kiaomi MiBook"); } }
class KiaomiNetbook extends Netbook { showInfo() { console.log("Netbook: Kiaomi NetPad"); } }
class KiaomiEBook extends EBook { showInfo() { console.log("EBook: Kiaomi InkReader"); } }
class KiaomiSmartphone extends Smartphone { showInfo() { console.log("Smartphone: Kiaomi 15T 12"); } }

class BalaxyLaptop extends Laptop { showInfo() { console.log("Laptop: Balaxy Book Pro"); } }
class BalaxyNetbook extends Netbook { showInfo() { console.log("Netbook: Balaxy NetBook"); } }
class BalaxyEBook extends EBook { showInfo() { console.log("EBook: Balaxy NoteReader"); } }
class BalaxySmartphone extends Smartphone { showInfo() { console.log("Smartphone: Balaxy S23 FE Ultra"); } }

class TechFactory {
    createLaptop() { throw new Error("Метод createLaptop() має бути реалізований"); }
    createNetbook() { throw new Error("Метод createNetbook() має бути реалізований"); }
    createEBook() { throw new Error("Метод createEBook() має бути реалізований"); }
    createSmartphone() { throw new Error("Метод createSmartphone() має бути реалізований"); }
}

class IProneFactory extends TechFactory {
    createLaptop() { return new IProneLaptop(); }
    createNetbook() { return new IProneNetbook(); }
    createEBook() { return new IProneEBook(); }
    createSmartphone() { return new IProneSmartphone(); }
}

class KiaomiFactory extends TechFactory {
    createLaptop() { return new KiaomiLaptop(); }
    createNetbook() { return new KiaomiNetbook(); }
    createEBook() { return new KiaomiEBook(); }
    createSmartphone() { return new KiaomiSmartphone(); }
}

class BalaxyFactory extends TechFactory {
    createLaptop() { return new BalaxyLaptop(); }
    createNetbook() { return new BalaxyNetbook(); }
    createEBook() { return new BalaxyEBook(); }
    createSmartphone() { return new BalaxySmartphone(); }
}

function assembleTechSet(factory, brandName) {
    console.log(`\nВиробництво техніки: ${brandName}`);
    const laptop = factory.createLaptop();
    const netbook = factory.createNetbook();
    const ebook = factory.createEBook();
    const smartphone = factory.createSmartphone();

    laptop.showInfo();
    netbook.showInfo();
    ebook.showInfo();
    smartphone.showInfo();
}

function main() {
    const iproneFactory = new IProneFactory();
    assembleTechSet(iproneFactory, "IProne");

    const kiaomiFactory = new KiaomiFactory();
    assembleTechSet(kiaomiFactory, "Kiaomi");

    const balaxyFactory = new BalaxyFactory();
    assembleTechSet(balaxyFactory, "Balaxy");
}

main();