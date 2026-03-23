class Authenticator {
    static #instance = null;

    constructor() {
        if (Authenticator.#instance) {
            return Authenticator.#instance;
        }

        this.isLoggedIn = false;
        this.currentUser = null;
        Authenticator.#instance = this;
    }

    login(username) {
        this.isLoggedIn = true;
        this.currentUser = username;
        console.log(`[система] користувач '${username}'  увійшов.`);
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        console.log(`[Система] Користувач вийшов.`);
    }

    getStatus() {
        if (this.isLoggedIn) {
            console.log(`[Статус] акт. користувач: ${this.currentUser}`);
        } else {
            console.log(`[Статус] Ніхто не авторизований`);
        }
    }
}

function main() {
    console.log("створюємо перший екземпляр і заходимо");
    const auth1 = new Authenticator();
    auth1.login("Eleena");
    auth1.getStatus();

    console.log("\nнамагаємося створити другий екземпляр");
    const auth2 = new Authenticator();

    auth2.getStatus();

    console.log("\nфінальна перевірка на ідентичність:");
    if (auth1 === auth2) {
        console.log("це 1 й той самий обэкт");
    } else {
        console.log("створено різні обєкти");
    }
}

main();