/**
 * Represents the combination of username and password, as entered by the user.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
import { Password } from "./Password";
import { Username } from "./Username";
export declare class LoginInfo {
    private _username;
    private _password;
    /**
     * Creates a new LoginInfo object containing a specific username and password.
     * @param username
     * @param password
     */
    constructor(username: String, password: String);
    /**
     * gets the password
     */
    get password(): Password;
    /**
     * sets the password
     * @param value
     */
    set password(value: Password);
    /**
     * gets the username
     */
    get username(): Username;
    /**
     * sets the username
     * @param value
     */
    set username(value: Username);
}
