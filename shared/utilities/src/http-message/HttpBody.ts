/**
 * Represents the body of the http request, which might be empty.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class HttpBody {

    private _bodyDict = {};

    /**
     * creates a new HttpBody object using a specific dictionary
     * @param bodyDict the dictionary containing the body contents
     */
    constructor(bodyDict) {
        this.bodyDict = bodyDict;
    }

    /**
     * sets the body contents to specific dictionary
     * @param value the dictionary containing the new body contents
     */
    set bodyDict(value: {}) {
        this._bodyDict = value;
    }

    /**
     * gets the body's content in a dictionary
     * @return the dictionary containing the body contents
     */
    get bodyDict(): {} {
        return this._bodyDict;
    }


}