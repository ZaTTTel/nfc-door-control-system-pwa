import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EventSubscriber} from "../../../../../shared-utilities";
import {InputDeviceInfoDialog} from "../input-device-info-dialog/input-device-info-dialog.component";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";
import {DevicesManagerService} from "../../../../common/services/devices-list/devices-manager.service";

@Component({
    selector: 'app-add-device-button',
    templateUrl: './add-device-button.component.html'
})
/**
 * A round button, used to add a notification device to the system.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class AddDeviceButtonComponent {

    /**
     * The following injections are required:
     * @param _dialog to open a dialog containing the {@link InputDeviceInfoDialog}, to get the info from the user
     * @param _popUp to inform the user of an error or of success
     * @param _devicesManager to refresh the devices after adding
     */
    constructor(private _dialog: MatDialog,
                private _popUp: PopUpService,
                private _devicesManager: DevicesManagerService) {
    }

    /**
     * is run when the button is clicked.
     * Opens the dialog that gets the device details, and gets the {@link DevicesManagerService} to add it
     */
    clickHandler() {
        const dialogRef = this._dialog.open(InputDeviceInfoDialog, {data: undefined, width: "700px", maxWidth: "90%"})
        dialogRef.afterClosed().subscribe((newDevice: EventSubscriber) => {
            if (!newDevice) {
                return
            }
            this._devicesManager.addDevice(newDevice).then().catch(() => void 0);
        })
    }
}
