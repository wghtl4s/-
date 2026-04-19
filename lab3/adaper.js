class Logger {
    log(msg) { console.log("\x1b[32m" + msg + "\x1b[0m"); }
    error(msg) { console.log("\x1b[31m" + msg + "\x1b[0m"); }
    warn(msg) { console.log("\x1b[33m" + msg + "\x1b[0m"); }
}

class FileWriter {
    write(text) { console.log("Запис: " + text); }
    writeLine(text) { console.log("Запис рядка: " + text); }
}

class FileLoggerAdapter {
    constructor(fileWriter) {
        this.fileWriter = fileWriter;
    }
    log(msg) { this.fileWriter.writeLine("LOG: " + msg); }
    error(msg) { this.fileWriter.writeLine("ERROR: " + msg); }
    warn(msg) { this.fileWriter.writeLine("WARN: " + msg); }
}

let writer = new FileWriter();
let adapter = new FileLoggerAdapter(writer);
adapter.log("Повідомлення");