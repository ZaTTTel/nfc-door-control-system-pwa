/**
 * Represents the body of the http request, which might be empty.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export declare class HttpBody {
    private _bodyDict;
    /**
     * creates a new HttpBody object using a specific dictionary
     * @param bodyDict the dictionary containing the body contents
     */
    constructor(bodyDict: any);
    /**
     * sets the body contents to specific dictionary
     * @param value the dictionary containing the new body contents
     */
    set bodyDict(value: {});
    /**
     * gets the body's content in a dictionary
     * @return the dictionary containing the body contents
     */
    get bodyDict(): {};
}
