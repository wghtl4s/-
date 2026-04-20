class CommandCentre {
    constructor() {
        this.runways = [];
    }
    addRunway(runway) {
        this.runways.push(runway);
    }
    requestLanding(aircraft) {
        let availableRunway = null;
        for (let i = 0; i < this.runways.length; i++) {
            if (this.runways[i].isFree) {
                availableRunway = this.runways[i];
                break;
            }
        }
        if (availableRunway) {
            availableRunway.isFree = false;
            console.log("Дозвіл на посадку надано.");
        } else {
            console.log("Всі смуги зайняті, очікуйте.");
        }
    }
}

class Runway {
    constructor() {
        this.isFree = true;
    }
}

class Aircraft {
    constructor(centre) {
        this.centre = centre;
    }
    land() {
        this.centre.requestLanding(this);
    }
}

let centre = new CommandCentre();
let runway1 = new Runway();
centre.addRunway(runway1);

let plane = new Aircraft(centre);
plane.land();