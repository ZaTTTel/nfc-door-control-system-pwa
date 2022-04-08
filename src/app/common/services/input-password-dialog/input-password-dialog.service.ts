import {Component, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Password} from "../../../../shared-utilities";

@Injectable({
    providedIn: 'root'
})
/**
 * This Service can open a dialog that queries the user for a password. This is used to set the Authentication
 * header when making requests that require it.
 *
 * @author Alex Suddendorf
 */
export class InputPasswordDialogService {

    /**
     * The following injection is required:
     * @param _dialog to query the user
     */
    constructor(private _dialog: MatDialog) {
    }

    /**
     * Open the dialog, returns a promise that resolves with the password when the user has entered it
     */
    open(): Promise<Password> {
        return new Promise<Password>((resolve) => {
            const dialogRef = this._dialog.open(InputPasswordDialog);
            dialogRef.afterClosed().subscribe({
                next: pw => {
                    resolve(pw);
                }
            })
        })
    }
}

@Component({
    selector: 'app-input-password-dialog',
    templateUrl: './input-password-dialog.html',
})
/**
 * This component is displayed inside the dialog called by the {@link InputPasswordDialogService}.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class InputPasswordDialog {
    /**
     * Records weather the password is to be hidden, or displayed in plain text. Is used to toggle the passwords
     * visibility
     */
    hidePassword = true;

    /**
     * the following injection is required:
     * @param _dialogRef to close the dialog when the button (or enter) is pressed
     */
    constructor(private _dialogRef: MatDialogRef<InputPasswordDialog>) {
    }

    /**
     * Is called on enter or on the press of the button. Closes the dialog with the password as an output
     * @param pw the password
     */
    enterClickHandler(pw: string) {
        if (pw != "") {
            this._dialogRef.close(pw);
        }
    }
}
