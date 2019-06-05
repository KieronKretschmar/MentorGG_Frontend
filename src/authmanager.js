class AuthManager {
    constructor() {
        this.isLoggedIn = true;
    }

    getLoginState() {
        return this.isLoggedIn;
    }
}

export default new AuthManager();