import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {NfcToken} from '../../../../../../shared-utilities';
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";

@Component({
    selector: 'app-user-has-nfc-token-button',
    templateUrl: './user-has-nfc-token-button.component.html',
    styleUrls: ['./user-has-nfc-token-button.component.css']
})
/**
 * This component wraps a button that, when clicked, requests the status of the current users {@link NfcToken} from
 * the communicator.
 *
 * The user is then informed of the result in a dialog.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class UserHasNfcTokenButtonComponent {

    /**
     * an {@link EventEmitter}, that emits, when the communicator has been messaged. The resulting promise is
     * emitted. This is to allow the parent to display a loading signal when the communicator is working on the answer.
     */
    @Output() onCheck: EventEmitter<Promise<any>> = new EventEmitter<Promise<any>>()

    /**
     * The following injections are required:
     * @param _communicator to get the status of the users {@link NfcToken}
     * @param _switchUserStatus to get the current user being edited
     * @param _dialog to display the result to the user
     * @param _popUp to inform the user of an error
     */
    constructor(private _communicator: CommunicatorService,
                private _switchUserStatus: SwitchUserStatusService,
                private _dialog: MatDialog,
                private _popUp: PopUpService) {
    }

    /**
     * Is called, when the wrapped button is pressed.
     *
     * The status of the {@link NfcToken} is requested from the {@link CommunicatorService}, emitted, and when
     * resolved displays the result to the user as a dialog with the content being {@link CheckNfcTokenInfoDialog}.
     */
    clickHandler() {
        const user = this._switchUserStatus.user;
        // checks if there even is a user. This should always be true when the user can press the button
        if (user) {
            const promise = this._communicator.userHasNfcToken(user.name)
            this.onCheck.emit(promise)
            // when the request is resolved, display the result in a dialog
            promise.then(hasNfcToken => {
                this._dialog.open(CheckNfcTokenInfoDialog, {data: hasNfcToken})
            }).catch(
                e => {
                    this._popUp.show(e);
                }
            )
        }

    }

}

@Component({
    selector: 'check-nfc-token-info-dialog',
    templateUrl: 'check-nfc-token-info-dialog.html'
})
/**
 * This component is displayed inside a Dialog, when the {@link UserHasNfcTokenButtonComponent} is pressed. Is displays
 * the status of the current users {@link NfcToken} status.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class CheckNfcTokenInfoDialog {

    /**
     * the checked users name
     */
    public username = this._switchUserStatus.user?.name;

    /**
     * @param hasNfcToken is passed from the dialog caller, and represents the result of the check
     * @param _switchUserStatus contains the current user being edited
     */
    constructor(@Inject(MAT_DIALOG_DATA) public hasNfcToken: boolean,
                private _switchUserStatus: SwitchUserStatusService) {
    }
}
