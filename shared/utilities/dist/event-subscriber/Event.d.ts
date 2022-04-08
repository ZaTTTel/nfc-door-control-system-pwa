/**
 * Represents an event that needs to happen for a {@link EventSubscriber} to be notified.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export declare enum Event {
    /**
     * The door has been unlocked by a user using the PWA or any other interface that can unlock the door.
     */
    DOOR_OPENED = "DOOR_OPENED",
    /**
     * The doorbell has been pressed
     */
    BELL_RUNG = "BELL_RUNG"
}
