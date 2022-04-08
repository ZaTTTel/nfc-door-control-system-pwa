import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SetNfcTokenDialog} from "../../set-nfc-token/set-nfc-token-dialog.component";
import {SwitchUserStatusService} from "../../../../../../common/services/switch-user-status/switch-user-status.service";

@Component({
    selector: 'app-manual-nfc-entry',
    templateUrl: './manual-token-entry-dialog.component.html'
})
/**
 * This component can be used inside a MatDialog open() call, to display a form field, in which the user can add an
 * NFC Token without using the phones NFC scanner, but by entering it manually.
 *
 * Entered Tokens can be of any format, meaning that colons will be ignored.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ManualTokenEntryDialog {

    /**
     * the following injections are required:
     * @param _dialog to display the {@link SetNfcTokenDialog} in which the user will be asked if they are sure.
     * @param _switchUserStatus to get the user that is currently being edited
     * @param _dialogRef to close the dialog
     */
    constructor(private _dialog: MatDialog,
                private _switchUserStatus: SwitchUserStatusService,
                private _dialogRef: MatDialogRef<ManualTokenEntryDialog>) {
    }

    /**
     * Is run when the confirm-button is pressed. Opens a dialog containing the {@link SetNfcTokenDialog} component
     * @param token the token which the user has entered
     */
    buttonHandler(token: string) {
        // this should never be the case, as a user has to be logged in to scan.
        if (!this._switchUserStatus.user) {
            return;
        }

        const dialogRef = this._dialog.open(SetNfcTokenDialog, {
            data: token
        })

        dialogRef.afterClosed().subscribe((addNfcTokenPromise: Promise<void> | undefined) => {
            this._dialogRef.close(addNfcTokenPromise);
        })
    }
}
