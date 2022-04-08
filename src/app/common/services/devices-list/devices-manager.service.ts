import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventSubscriber} from "../../../../shared-utilities";
import {CommunicatorService} from "../communicators/CommunicatorService";
import {PopUpService} from "../pop-up/pop-up.service";

@Injectable({
    providedIn: 'root'
})
/**
 * This service manages the devices in the system. It can edit the list (add, delete or edit a device) by first
 * informing the communicator to perform the action, and then getting an updated list from the communicator.
 *
 * It also provides an observable that notifies subscribers of a change in the list and an observable that emits the
 * newest promise that is active while an action is loading.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DevicesManagerService {

    /**
     * The devices saved in the manager
     * @private
     */
    private _devicesSource = new BehaviorSubject<EventSubscriber[]>([])
    /**
     * When this service is loading, this contains a promise resolving when the loading is done
     * @private
     */
    private _loadingSource = new BehaviorSubject<Promise<any>>(new Promise(() => {
    }))

    /**
     * The following injectables are required:
     * @param _communicator to get, add, or remove devices
     * @param _popUp to display success/errors to the user
     */
    constructor(private _communicator: CommunicatorService,
                private _popUp: PopUpService) {
    }

    /**
     * the observable emitting the updated devices list when changed
     * @private
     */
    private _devicesObservable = this._devicesSource.asObservable();

    /**
     * get an observable that emits when the devices change
     */
    get devicesObservable(): Observable<EventSubscriber[]> {
        return this._devicesObservable;
    }

    /**
     * an observable emitting the loading promise when it is changed
     * @private
     */
    private _loadingObservable = this._loadingSource.asObservable();

    /**
     * gets an observable that emits when the manager starts loading. The emitted promise resolves on completion of
     * the activity
     */
    get loadingObservable(): Observable<Promise<any>> {
        return this._loadingObservable;
    }

    /**
     * Refreshes the list of devices by getting them from the communicator.
     * Informs {@link devicesObservable} subscribers and {@link loadingObservable} subscribers
     */
    refresh() {
        const promise = this._communicator.getDevices()
        this._loadingSource.next(promise);
        promise.then(devices => {
            this._devicesSource.next(devices);
        }).catch(e => {
            this._popUp.show(e)
        })
    }

    /**
     * adds a device, informs the {@link loadingObservable} subscribers and refreshes the list
     *
     * @param newDevice the new device
     */
    addDevice(newDevice: EventSubscriber): Promise<void> {
        const promise = this._communicator.addDevice(newDevice);
        this._loadingSource.next(promise);
        promise.then(() => {
            this._popUp.show(`The device with the label ${newDevice.label} has been added!`);
            this.refresh();
        }).catch(e => {
            this._popUp.show(e);
        })
        return promise;
    }

    /**
     * removes a device, informs the {@link loadingObservable} subscribers and refreshes the list
     *
     *
     * @param device the device to be removed
     */
    removeDevice(device: EventSubscriber): Promise<void> {
        // ping the communicator
        const promise = this._communicator.removeDevice(device)
        this._loadingSource.next(promise);
        promise.then(() => {
            this._popUp.show(`${device.label} has been deleted!`)
            this.refresh();
        }).catch(e => {
            this._popUp.show(e)
        })
        return promise;
    }

    /**
     * Changes the details of a device by removing it, then adding it with the new details
     *
     * The existing {@link removeDevice} and {@link addDevice} methods are not used, because the list should not be
     * refreshed in between actions, and only the delete-popup should be shown
     * @param oldDevice
     * @param newDevice
     */
    editDevice(oldDevice: EventSubscriber, newDevice: EventSubscriber) {
        const removePromise = this._communicator.removeDevice(oldDevice)
        this._loadingSource.next(removePromise);
        removePromise.then(() => {
            const addPromise = this._communicator.addDevice(newDevice)
            this._loadingSource.next(addPromise);
            addPromise.then(() => {
                this._popUp.show("Device Edited!")
                this.refresh()
            }).catch(e => {
                this._popUp.show(e)
            })
        }).catch(e => {
            this._popUp.show(e)
            this.refresh()
        });
    }
}
