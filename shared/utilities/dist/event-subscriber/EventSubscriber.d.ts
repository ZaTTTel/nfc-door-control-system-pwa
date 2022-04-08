import { Endpoint } from "./Endpoint";
import { SubscriberLabel } from "./SubscriberLabel";
import { Event } from "./Event";
/**
 * Represents a specific subscriber defined by its endpoint uri, and containing a subscriber-label, and the type of
 * event needed for the subscriber to be notified.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export declare class EventSubscriber {
    private _endpoint;
    private _event;
    private _label;
    /**
     * creates an event-subscriber object
     * @param endpoint the endpoint uri, at which the subscriber can be accessed
     * @param event the event needed for the subscriber to be notified
     * @param label the label given to the subscriber
     */
    constructor(endpoint: Endpoint, event: Event, label: SubscriberLabel);
    /**
     * returns the label of the event-subscriber as a {@link SubscriberLabel}
     */
    get label(): SubscriberLabel;
    /**
     * sets the label of the event-subscriber to a specific {@link SubscriberLabel}
     * @param value
     */
    set label(value: SubscriberLabel);
    /**
     * returns the {@link Event} needed to notify the EventSubscriber
     */
    get event(): Event;
    /**
     * sets the {@link Event} needed to notify the EventSubscriber
     * @param value
     */
    set event(value: Event);
    /**
     * returns the {@link Endpoint} URI, used to access the subscribers endpoint
     */
    get endpoint(): Endpoint;
    /**
     * sets the {@link Endpoint}
     * @param value
     */
    set endpoint(value: Endpoint);
    /**
     * generate an object from an eventsubscriber to pass into {@see fromJSON}
     * @param value the eventsubscriber
     * @returns the object
     */
    static toJSON(value: EventSubscriber): any;
    /**
     * generates EventSubscriber from a object
     * @param value the value to generate eventsubscriber from
     * @returns the gernerated eventsubscriber
     */
    static fromJSON(value: any): EventSubscriber;
}
