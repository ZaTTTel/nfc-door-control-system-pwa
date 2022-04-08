"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Port = void 0;
/**
 * Represents a networking port with the ports number.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var Port = /** @class */ (function () {
    /**
     * Creates a port object with a specific port number
     * @param portNum number of the port
     */
    function Port(portNum) {
        this.portNumber = portNum;
    }
    Object.defineProperty(Port.prototype, "portNumber", {
        /**
         * gets the port number
         *
         * @return {number} the number of the port
         */
        get: function () {
            return this._portNumber;
        },
        /**
         * sets the ports number
         *
         * @param value the new port number
         */
        set: function (value) {
            this._portNumber = value;
        },
        enumerable: false,
        configurable: true
    });
    return Port;
}());
exports.Port = Port;
