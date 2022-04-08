"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubscriber = void 0;
/**
 * Represents a specific subscriber defined by its endpoint uri, and containing a subscriber-label, and the type of
 * event needed for the subscriber to be notified.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
class EventSubscriber {
    /**
     * creates an event-subscriber object
     * @param endpoint the endpoint uri, at which the subscriber can be accessed
     * @param event the event needed for the subscriber to be notified
     * @param label the label given to the subscriber
     */
    constructor(endpoint, event, label) {
        this.endpoint = endpoint;
        this.event = event;
        this.label = label;
    }
    /**
     * returns the label of the event-subscriber as a {@link SubscriberLabel}
     */
    get label() {
        return this._label;
    }
    /**
     * sets the label of the event-subscriber to a specific {@link SubscriberLabel}
     * @param value
     */
    set label(value) {
        this._label = value;
    }
    /**
     * returns the {@link Event} needed to notify the EventSubscriber
     */
    get event() {
        return this._event;
    }
    /**
     * sets the {@link Event} needed to notify the EventSubscriber
     * @param value
     */
    set event(value) {
        this._event = value;
    }
    /**
     * returns the {@link Endpoint} URI, used to access the subscribers endpoint
     */
    get endpoint() {
        return this._endpoint;
    }
    /**
     * sets the {@link Endpoint}
     * @param value
     */
    set endpoint(value) {
        this._endpoint = value;
    }
    /**
     * generate an object from an eventsubscriber to pass into {@see fromJSON}
     * @param value the eventsubscriber
     * @returns the object
     */
    static toJSON(value) {
        return {
            endpoint: value.endpoint,
            label: value.label,
            event: value.event
        };
    }
    /**
     * generates EventSubscriber from a object
     * @param value the value to generate eventsubscriber from
     * @returns the gernerated eventsubscriber
     */
    static fromJSON(value) {
        return new EventSubscriber(value.endpoint, value.event, value.label);
    }
}
exports.EventSubscriber = EventSubscriber;
