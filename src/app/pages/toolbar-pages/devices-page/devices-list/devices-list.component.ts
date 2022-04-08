import {Component} from '@angular/core';
import {EventSubscriber} from '../../../../../shared-utilities'
import {DevicesManagerService} from "../../../../common/services/devices-list/devices-manager.service";

@Component({
    selector: 'app-devices-list',
    templateUrl: './devices-list.component.html',
    styleUrls: ['./devices-list.component.css']
})
/**
 * Represents the list that displays all the devices in the system.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DevicesListComponent {

    /**
     * a list of the devices represented in the list
     */
    devices: EventSubscriber[] = [];

    /**
     * The following injection is required:
     * @param _devicesManager to access the devices in the system and to get notified on a change
     */
    constructor(private _devicesManager: DevicesManagerService) {
        this._devicesManager.devicesObservable.subscribe(newDevices => {
            this.devices = newDevices;
        })
    }

}
