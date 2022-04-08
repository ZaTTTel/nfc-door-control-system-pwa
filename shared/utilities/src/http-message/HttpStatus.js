"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatus = void 0;
/**
 * Represents the status of a completed request, containing the triple digit code, signaling the status.
 * The class itself does not check if the code is a valid http status code, its usage simply signals the context in
 * which it is to be used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var HttpStatus = /** @class */ (function () {
    function HttpStatus(code) {
        this._code = code;
    }
    Object.defineProperty(HttpStatus.prototype, "code", {
        /**
         * Gets the Status code
         *
         * @return {number} the code
         */
        get: function () {
            return this._code;
        },
        /**
         * sets the status code
         * @param value the new status code
         */
        set: function (value) {
            this._code = value;
        },
        enumerable: false,
        configurable: true
    });
    return HttpStatus;
}());
exports.HttpStatus = HttpStatus;
