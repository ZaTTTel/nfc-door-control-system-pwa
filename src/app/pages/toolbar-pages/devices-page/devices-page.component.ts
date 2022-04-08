import {Component} from '@angular/core';
import {ToolbarPageComponent} from "../ToolbarPageComponent";
import {DevicesManagerService} from "../../../common/services/devices-list/devices-manager.service";

@Component({
    selector: 'app-devices-page',
    templateUrl: './devices-page.component.html',
    styleUrls: ['./devices-page.component.css']
})

/**
 * Represents the page on which the user can edit the notification devices.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DevicesPageComponent implements ToolbarPageComponent {

    /**
     * is true if any subcomponent is currently waiting for a communicator and displays a loading bar
     */
    isLoading = false;

    /**
     * Subscribes to the deviceManagers loadingStatus to display it as a loading bar
     * Refreshed the deviceManager
     *
     * The following injection is required:
     * @param _devicesManager to refresh the devices and to know when it's loading
     */
    constructor(private _devicesManager: DevicesManagerService) {
        _devicesManager.loadingObservable.subscribe(loadingPromise => {
            this.isLoading = true;
            loadingPromise.then(() => {
                this.isLoading = false;
            }).catch(() => {
                this.isLoading = false;
            })
        })
        this._devicesManager.refresh()
    }
}
