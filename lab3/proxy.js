class SmartTextReader {
    read(fileName, text) {
        let result = [];
        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            result.push(lines[i].split(''));
        }
        return result;
    }
}

class SmartTextChecker {
    constructor(reader) {
        this.reader = reader;
    }
    read(fileName, text) {
        console.log("Відкрито файл: " + fileName);
        let result = this.reader.read(fileName, text);
        let charsCount = 0;
        for (let i = 0; i < result.length; i++) {
            charsCount += result[i].length;
        }
        console.log("Прочитано рядків: " + result.length + ", символів: " + charsCount);
        console.log("Закрито файл: " + fileName);
        return result;
    }
}

class SmartTextReaderLocker {
    constructor(reader, regex) {
        this.reader = reader;
        this.regex = regex;
    }
    read(fileName, text) {
        if (fileName.match(this.regex)) {
            console.log("Access denied!");
            return null;
        } else {
            return this.reader.read(fileName, text);
        }
    }
}

let baseReader = new SmartTextReader();

let checker = new SmartTextChecker(baseReader);
let arrayResult = checker.read("document.txt", "Перший рядок\nДругий рядок");
console.log(arrayResult);

let locker = new SmartTextReaderLocker(baseReader, /secret/);
locker.read("secret_data.txt", "Цей текст ніхто не побачить");
locker.read("public_data.txt", "Цей текст можна читати");