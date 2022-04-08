/**
 * Represents a networking port with the ports number.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export declare class Port {
    private _portNumber;
    /**
     * Creates a port object with a specific port number
     * @param portNum number of the port
     */
    constructor(portNum: number);
    /**
     * sets the ports number
     *
     * @param value the new port number
     */
    set portNumber(value: number);
    /**
     * gets the port number
     *
     * @return {number} the number of the port
     */
    get portNumber(): number;
}
