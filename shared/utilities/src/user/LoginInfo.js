"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInfo = void 0;
var LoginInfo = /** @class */ (function () {
    /**
     * Creates a new LoginInfo object containing a specific username and password.
     * @param username
     * @param password
     */
    function LoginInfo(username, password) {
        this.username = username;
        this.password = password;
    }
    Object.defineProperty(LoginInfo.prototype, "password", {
        /**
         * gets the password
         */
        get: function () {
            return this._password;
        },
        /**
         * sets the password
         * @param value
         */
        set: function (value) {
            this._password = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LoginInfo.prototype, "username", {
        /**
         * gets the username
         */
        get: function () {
            return this._username;
        },
        /**
         * sets the username
         * @param value
         */
        set: function (value) {
            this._username = value;
        },
        enumerable: false,
        configurable: true
    });
    return LoginInfo;
}());
exports.LoginInfo = LoginInfo;
