"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInfo = void 0;
class LoginInfo {
    /**
     * Creates a new LoginInfo object containing a specific username and password.
     * @param username
     * @param password
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    /**
     * gets the password
     */
    get password() {
        return this._password;
    }
    /**
     * sets the password
     * @param value
     */
    set password(value) {
        this._password = value;
    }
    /**
     * gets the username
     */
    get username() {
        return this._username;
    }
    /**
     * sets the username
     * @param value
     */
    set username(value) {
        this._username = value;
    }
}
exports.LoginInfo = LoginInfo;
