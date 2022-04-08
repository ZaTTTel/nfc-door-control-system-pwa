/**
 * Represents the combination of username and password, as entered by the user.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
import {Password} from "./Password";
import {Username} from "./Username";

export class LoginInfo {

    private _username: Username;
    private _password: Password;

    /**
     * Creates a new LoginInfo object containing a specific username and password.
     * @param username
     * @param password
     */
    constructor(username: String, password: String) {
        this.username = username;
        this.password = password;
    }

    /**
     * gets the password
     */
    get password(): Password {
        return this._password;
    }

    /**
     * sets the password
     * @param value
     */
    set password(value: Password) {
        this._password = value;
    }

    /**
     * gets the username
     */
    get username(): Username {
        return this._username;
    }

    /**
     * sets the username
     * @param value
     */
    set username(value: Username) {
        this._username = value;
    }
}