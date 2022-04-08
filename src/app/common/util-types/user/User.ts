import {Username} from "../../../../shared-utilities";

/**
 * This class represents a user. Currently, it only contains a username, which is used as an identifier.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class User {

    /**
     * Creates a user with a specific name
     * @param _name users name
     */
    constructor(private readonly _name: Username) {
    }

    /**
     * gets the users name
     */
    get name(): Username {
        return this._name;
    }
}
