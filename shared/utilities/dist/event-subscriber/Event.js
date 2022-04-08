"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
/**
 * Represents an event that needs to happen for a {@link EventSubscriber} to be notified.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var Event;
(function (Event) {
    /**
     * The door has been unlocked by a user using the PWA or any other interface that can unlock the door.
     */
    Event["DOOR_OPENED"] = "DOOR_OPENED";
    /**
     * The doorbell has been pressed
     */
    Event["BELL_RUNG"] = "BELL_RUNG";
})(Event = exports.Event || (exports.Event = {}));
