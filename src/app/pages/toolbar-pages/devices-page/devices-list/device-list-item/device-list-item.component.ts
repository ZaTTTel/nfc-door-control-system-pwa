import {Component, Inject, Input} from '@angular/core';
import {Event, EventSubscriber} from '../../../../../../shared-utilities';
import {DevicesListComponent} from "../devices-list.component";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {InputDeviceInfoDialog} from "../../input-device-info-dialog/input-device-info-dialog.component";
import {DevicesManagerService} from "../../../../../common/services/devices-list/devices-manager.service";

@Component({
    selector: 'app-device-list-item',
    templateUrl: './device-list-item.component.html'
})
/**
 * This Component represents a single item in the {@link DevicesListComponent}, containing a single
 * {@link EventSubscriber} to be displayed.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DeviceListItemComponent {

    /**
     * This is a public copy of the enum {@link Event} from shared-utilities.
     * It is here, so that it can be accessed in the template.
     */
    Event = Event;

    /**
     * The device that this list item represents. REQUIRED
     */
    @Input() device!: EventSubscriber;


    /**
     * The following injectables are required:
     * @param _popUp to inform the user of a successful edit/delete or of an error
     * @param _dialog to ask for confirmation of deletion
     * @param _devicesManager to refresh the devices
     */
    constructor(private _popUp: PopUpService,
                private _dialog: MatDialog,
                private _devicesManager: DevicesManagerService) {
    }

    /**
     * Is run when the edit button is pressed.
     * Opens the {@link InputDeviceInfoDialog} to get the device info from the user, and gets the
     * {@link DevicesManagerService} to edit it
     */
    editHandler() {
        const dialogRef = this._dialog.open(InputDeviceInfoDialog, {data: this.device, width: "700px", maxWidth: "90%"})
        dialogRef.afterClosed().subscribe((editedDevice: EventSubscriber) => {
            if (!editedDevice) {
                return
            }
            this._devicesManager.editDevice(this.device, editedDevice);
        })
    }

    /**
     * Is run when the delete-device button is pressed.
     * Opens the dialog asking for confirmation ({@link DeleteDeviceConfirmationDialog}) and then gets the
     * {@link DevicesManagerService} to delete it
     */
    deleteHandler() {
        const dialogRef = this._dialog.open(DeleteDeviceConfirmationDialog, {data: this.device})
        dialogRef.afterClosed().subscribe(confirmed => {
            // if the delete-button in the dialog was pressed
            if (confirmed) {
                this._devicesManager.removeDevice(this.device).catch(() => void 0);
            }
        })
    }
}

@Component({
    selector: 'app-delete-device-confirmation-dialog',
    templateUrl: './delete-device-confirmation-dialog.html',
})
/**
 * The dialog contents that ask the user if they are sure they want to delete the device.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DeleteDeviceConfirmationDialog {

    /**
     * Accepts the device that will be deleted, to display it to the user
     * @param device the device to be deleted
     */
    constructor(@Inject(MAT_DIALOG_DATA) public device: EventSubscriber) {
    }
}
