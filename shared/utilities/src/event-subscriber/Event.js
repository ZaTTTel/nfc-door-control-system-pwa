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
    Event[Event["DoorOpened"] = 0] = "DoorOpened";
    /**
     * The doorbell has been pressed
     */
    Event[Event["BellRung"] = 1] = "BellRung";
})(Event = exports.Event || (exports.Event = {}));
