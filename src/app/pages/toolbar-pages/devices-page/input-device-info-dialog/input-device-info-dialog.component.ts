import {Component, Inject} from '@angular/core';
import {Endpoint, Event, EventSubscriber, SubscriberLabel} from "../../../../../shared-utilities";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";

@Component({
    selector: 'app-input-device-info-dialog',
    templateUrl: './input-device-info-dialog.component.html',
    styleUrls: ['./input-device-info-dialog.component.css']
})
/**
 * This component can be displayed inside a {@link MatDialogRef}, to ask the user for the detail of a new/edited device
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class InputDeviceInfoDialog {

    /**
     * The value of the label-input
     */
    labelValue: SubscriberLabel = "";
    /**
     * The value of the endpoint-input
     */
    endpointValue: Endpoint = "";
    /**
     * The value of the event-input
     */
    eventValue?: Event;

    /**
     * A list of possible triggers that maps an event from {@link Event} to a user-friendly string.
     */
    triggerTypes: { eventLabel: string, event: Event }[] = [
        {eventLabel: $localize`:@@Devices.Input.Trigger.Door:Door has opened`, event: Event.DOOR_OPENED},
        {eventLabel: $localize`:@@Devices.Input.Trigger.Bell:Doorbell has been rung`, event: Event.BELL_RUNG}
    ]

    /**
     * Sets the input values to the deviceToEdit values to fill the fields, if a device to edit has been given
     *
     * The following injections are required:
     * @param _dialogRef to close the dialog, in which this is contained
     * @param _popUp to inform the user of an incorrect input
     * @param deviceToEdit an optional device that should be edited. It will fill all fields with its data
     */
    constructor(private _dialogRef: MatDialogRef<InputDeviceInfoDialog>,
                private _popUp: PopUpService,
                @Inject(MAT_DIALOG_DATA) private deviceToEdit?: EventSubscriber | undefined) {
        if (deviceToEdit) {
            this.labelValue = deviceToEdit.label as string;
            this.endpointValue = deviceToEdit.endpoint as string;
            this.eventValue = deviceToEdit.event;
        }
    }

    /**
     * Is run when the confirm button is pressed.
     * Checks if the inputted data is valid, and closes the dialog with it
     */
    confirmHandler() {
        if (!this.isEmptyInput()) {
            const newDevice = new EventSubscriber(this.endpointValue, this.eventValue!, this.labelValue);
            if (!this.isSameAsToEdit(newDevice)) {
                this._dialogRef.close(newDevice);
            } else {
                // if there were no edits, nothing needs to be changed
                this._dialogRef.close();
            }
        } else {
            this._popUp.show("Please fill all fields!")
        }
    }

    /**
     * Checks if there is an empty field
     * @private
     */
    private isEmptyInput(): boolean {
        return !this.labelValue || !this.endpointValue || (this.eventValue == undefined)
    }

    /**
     * Checks if the entered device to edit has been edited
     * @param newDevice
     * @private
     */
    private isSameAsToEdit(newDevice: EventSubscriber): boolean {
        if (this.deviceToEdit) {
            return (JSON.stringify(this.deviceToEdit) === JSON.stringify(newDevice))
        } else {
            return false;
        }
    }

}
