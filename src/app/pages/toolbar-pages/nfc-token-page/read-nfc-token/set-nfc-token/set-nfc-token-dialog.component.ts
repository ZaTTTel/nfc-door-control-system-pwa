import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NfcToken} from "../../../../../../shared-utilities";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";

@Component({
    selector: 'app-set-nfc-token',
    templateUrl: './set-nfc-token-dialog.component.html'
})
/**
 * This component acts as the content of a {@link MatDialog} object. To open it, call open() on the
 * {@link MatDialog} instance and pass a NfcToken object as the passed data. This will return a
 * {@link MatDialogRef} that can be used later.
 *
 * The {@link SetNfcTokenDialog} instance messages the communicator and passes the resulting promise along to the
 * component that opened the {@link SetNfcTokenDialog} instance. This promise can be gotten by calling
 * afterClosed.subscribe() on the {@link MatDialogRef} from above.
 *
 * This component should only be used inside a {@link MatDialog} instance, not by itself.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class SetNfcTokenDialog {

    /**
     * The user whose token will be set
     */
    user = this._switchUserStatus.user!;

    /**
     * The first injectable is the input from the calling component. It is the new token, that should be displayed
     * and set
     * @param newNfcToken
     *
     * The following other injectables are needed:
     * @param _communicator the communicator used to inform the midware of the change
     * @param _dialogRef the {@link MatDialogRef} that refers to the dialog displaying this component
     * @param _popUp to inform the user of success/errors
     * @param _switchUserStatus
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public newNfcToken: NfcToken,
        private _communicator: CommunicatorService,
        private _dialogRef: MatDialogRef<SetNfcTokenDialog>,
        private _popUp: PopUpService,
        private _switchUserStatus: SwitchUserStatusService
    ) {
    }

    /**
     * Is called when the confirm button is pressed.
     * This messages the communicator that a NFC-Token is to be added to a user, and displays its
     * success/error.
     *
     * The promise is also passed to the caller of the dialog
     */
    confirmButtonHandler() {
        const addNfcTokenPromise = this._communicator.addNfcToken(this.user, this.newNfcToken);
        addNfcTokenPromise.then(() => {
            this._popUp.show($localize`:@@NfcTags.Add.Success:The NFC Tag has been updated.`)
        }).catch(e => {
            // display the error to the user
            this._popUp.show(e)
        })
        // pass along the promise, so that the component calling the dialog can display a loading bar
        this._dialogRef.close(addNfcTokenPromise);
    }

}
