class Renderer {
    renderShape(name) {}
}

class VectorRenderer extends Renderer {
    renderShape(name) {
        console.log("Drawing " + name + " as vector");
    }
}

class RasterRenderer extends Renderer {
    renderShape(name) {
        console.log("Drawing " + name + " as pixels");
    }
}

class Shape {
    constructor(renderer) {
        this.renderer = renderer;
    }
    draw() {}
}

class Circle extends Shape {
    draw() {
        this.renderer.renderShape("Circle");
    }
}

class Square extends Shape {
    draw() {
        this.renderer.renderShape("Square");
    }
}

class Triangle extends Shape {
    draw() {
        this.renderer.renderShape("Triangle");
    }
}

let vectorRenderer = new VectorRenderer();
let rasterRenderer = new RasterRenderer();

let circle = new Circle(vectorRenderer);
let square = new Square(rasterRenderer);
let triangle = new Triangle(rasterRenderer);

circle.draw();
square.draw();
triangle.draw();