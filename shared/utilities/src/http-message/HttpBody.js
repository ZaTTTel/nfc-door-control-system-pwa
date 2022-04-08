"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBody = void 0;
/**
 * Represents the body of the http request, which might be empty.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var HttpBody = /** @class */ (function () {
    /**
     * creates a new HttpBody object using a specific dictionary
     * @param bodyDict the dictionary containing the body contents
     */
    function HttpBody(bodyDict) {
        this._bodyDict = {};
        this.bodyDict = bodyDict;
    }
    Object.defineProperty(HttpBody.prototype, "bodyDict", {
        /**
         * gets the body's content in a dictionary
         * @return the dictionary containing the body contents
         */
        get: function () {
            return this._bodyDict;
        },
        /**
         * sets the body contents to specific dictionary
         * @param value the dictionary containing the new body contents
         */
        set: function (value) {
            this._bodyDict = value;
        },
        enumerable: false,
        configurable: true
    });
    return HttpBody;
}());
exports.HttpBody = HttpBody;
