"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Port = void 0;
/**
 * Represents a networking port with the ports number.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
class Port {
    /**
     * Creates a port object with a specific port number
     * @param portNum number of the port
     */
    constructor(portNum) {
        this.portNumber = portNum;
    }
    /**
     * sets the ports number
     *
     * @param value the new port number
     */
    set portNumber(value) {
        this._portNumber = value;
    }
    /**
     * gets the port number
     *
     * @return {number} the number of the port
     */
    get portNumber() {
        return this._portNumber;
    }
}
exports.Port = Port;
