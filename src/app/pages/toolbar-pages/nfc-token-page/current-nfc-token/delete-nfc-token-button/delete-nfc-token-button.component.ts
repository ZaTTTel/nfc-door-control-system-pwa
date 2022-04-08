import {Component, EventEmitter, Inject, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {User} from "../../../../../common/util-types/user/User";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {NfcToken} from "../../../../../../shared-utilities";


@Component({
    selector: 'app-delete-nfc-token-button',
    templateUrl: './delete-nfc-token-button.component.html',
    styleUrls: ['./delete-nfc-token-button.component.css']
})
/**
 * This component wraps a button that, when pressed, deletes the NFC-Token of the user currently registered in the
 * {@link SwitchUserStatusService}, by sending a message to the {@link CommunicatorService}.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DeleteNfcTokenButtonComponent {

    /**
     * the onDelete event emitter is called when the communicator has been messaged to delete the {@link NfcToken}. The
     * resulting promise is emitted. (This is to let the parent class know when to show the loading bar.)
     */
    @Output() onDelete: EventEmitter<Promise<void>> = new EventEmitter<Promise<void>>();

    /**
     * The following injections are needed:
     * @param _communicator to message the midware that a (and whose) {@link NfcToken} is to be deleted.
     * @param _dialog to confirm with the user that the {@link NfcToken} will be deleted
     * @param _popUp to inform the user that the {@link NfcToken} has been deleted
     * @param _switchUserStatus to get the current {@link User} being edited in the {@link NfcTokenPageComponent}
     */
    constructor(private _communicator: CommunicatorService,
                private _dialog: MatDialog,
                private _popUp: PopUpService,
                private _switchUserStatus: SwitchUserStatusService) {
    }

    /**
     * is run when the wrapped button is clicked. This method opens the confirmation dialog. If the dialog is
     * accepted with the "Delete" button, the {@link deleteNfcToken} method is called.
     */
    clickHandler() {
        // check if there even is a user. This should always be the case, if the user is able to click the button.
        if (this._switchUserStatus.user) {
            // open confirmation dialog
            const dialogRef = this._dialog.open(DeleteNfcTokenConfirmationDialog, {data: this._switchUserStatus.user});
            dialogRef.afterClosed().subscribe(result => {
                // if and when the dialog was accepted, run deleteNfcToken() with the specific user
                if (result) {
                    this.deleteNfcToken(this._switchUserStatus.user!)
                }
            })
        }

    }

    /**
     * Sends a message to the midware, over the {@link CommunicatorService}, to remove a users NFC-Token. When the
     * resulting {@link Promise} is resolved, a popup is shown, notifying the user that the deletion was successful.
     * This promise is also emitted to the parent.
     * @param user the user, whose {@link NfcToken} will be deleted
     */
    deleteNfcToken(user: User) {
        this.onDelete.emit(
            this._communicator.removeNfcToken(user).then(() => {
                this._popUp.show(`The NFC Tag of ${user.name} has been deleted.`)
            }).catch(e => {
                this._popUp.show(e)
            })
        )
    }

}

@Component({
    selector: 'delete-nfc-token-confirmation-dialog',
    templateUrl: 'delete-nfc-token-confirmation-dialog.html'
})
/**
 * This component is displayed inside the confirmation dialog, which is opened in the
 * {@link DeleteNfcTokenButtonComponent}. It contains two buttons, 'delete' closes the dialog with 'true' and 'cancel'
 * closes the dialog with 'false'
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class DeleteNfcTokenConfirmationDialog {
    /**
     * The data passed into the dialog is the user whose {@link NfcToken} is being deleted.
     * @param user
     */
    constructor(@Inject(MAT_DIALOG_DATA) public user: User) {
    }
}
