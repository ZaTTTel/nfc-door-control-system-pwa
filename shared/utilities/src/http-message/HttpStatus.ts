/**
 * Represents the status of a completed request, containing the triple digit code, signaling the status.
 * The class itself does not check if the code is a valid http status code, its usage simply signals the context in
 * which it is to be used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class HttpStatus {

    private _code: number;

    constructor(code: number) {
        this._code = code;
    }

    /**
     * Gets the Status code
     *
     * @return {number} the code
     */
    get code(): number {
        return this._code;
    }

    /**
     * sets the status code
     * @param value the new status code
     */
    set code(value: number) {
        this._code = value;
    }


}