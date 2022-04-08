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
var EventSubscriber = /** @class */ (function () {
    /**
     * creates an event-subscriber object
     * @param endpoint the endpoint uri, at which the subscriber can be accessed
     * @param event the event needed for the subscriber to be notified
     * @param label the label given to the subscriber
     */
    function EventSubscriber(endpoint, event, label) {
        this.endpoint = endpoint;
        this.event = event;
        this.label = label;
    }
    Object.defineProperty(EventSubscriber.prototype, "label", {
        /**
         * returns the label of the event-subscriber as a {@link SubscriberLabel}
         */
        get: function () {
            return this._label;
        },
        /**
         * sets the label of the event-subscriber to a specific {@link SubscriberLabel}
         * @param value
         */
        set: function (value) {
            this._label = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventSubscriber.prototype, "event", {
        /**
         * returns the {@link Event} needed to notify the EventSubscriber
         */
        get: function () {
            return this._event;
        },
        /**
         * sets the {@link Event} needed to notify the EventSubscriber
         * @param value
         */
        set: function (value) {
            this._event = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventSubscriber.prototype, "endpoint", {
        /**
         * returns the {@link Endpoint} URI, used to access the subscribers endpoint
         */
        get: function () {
            return this._endpoint;
        },
        /**
         * sets the {@link Endpoint}
         * @param value
         */
        set: function (value) {
            this._endpoint = value;
        },
        enumerable: false,
        configurable: true
    });
    return EventSubscriber;
}());
exports.EventSubscriber = EventSubscriber;
