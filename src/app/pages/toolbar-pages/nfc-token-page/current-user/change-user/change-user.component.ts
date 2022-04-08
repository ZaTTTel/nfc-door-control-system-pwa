import {Component} from '@angular/core';
import {Username} from '../../../../../../shared-utilities';
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {User} from "../../../../../common/util-types/user/User";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-change-user',
    templateUrl: './change-user.component.html',
    styleUrls: ['./change-user.component.css']
})
/**
 * This component wraps an input and a button, that can be used to change the currently edited user.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ChangeUserComponent {

    /**
     * This array holds all users in the system. It is used to suggest users when entering a name
     */
    usernames: Username[] = [];

    /**
     * The following injections are required:
     * @param _communicator to get the list of names in the midware
     * @param _switchUserStatusService to change the user currently being edited
     * @param _popUp to inform the user of an error or of an incorrect input
     * @param _dialog to inform the user of the successful change
     */
    constructor(private _communicator: CommunicatorService,
                private _switchUserStatusService: SwitchUserStatusService,
                private _popUp: PopUpService,
                private _dialog: MatDialog) {
        // get the usernames from the communicator
        this._communicator.getUsernames().then(usernames => {
            this.usernames = usernames;
        })
    }


    /**
     * Is run when the user pressed the switch user button.
     * @param username the username of the user to be changed to. This is gotten from the input field.
     */
    switchUserHandler(username: string) {
        // if the username is empty, show an error
        if (username === "") {
            this._popUp.show($localize`:@@NfcTags.CurrentUser.Switch.Empty:The username cannot be empty!`)
        } else if (username == this._switchUserStatusService.user?.name) {
            this._popUp.show($localize`:@@NfcTags.CurrentUser.Switch.Same:'${username}' is already being edited!`)
        } else {
            this._switchUserStatusService.setUser(new User(username));
            this._dialog.open(ChangeUserInfoDialog);
        }
    }
}

@Component({
    selector: 'app-change-user-info-dialog',
    templateUrl: './change-user-info-dialog.html',
})
/**
 * This component is displayed inside a dialog, which is opened when the user changes the user being edited in the
 * NFC-Token page.
 *
 * If informs the user of the change and, most importantly, informs the user that this change does not allow them to
 * change data they are not permitted to change.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ChangeUserInfoDialog {
    infoTextHtml = $localize`:@@NfcTags.CurrentUser.Switch.Info:
        <h2>The user has been changed. Please note:</h2>
        <p>This does not mean that the username you have changed to is valid, not does it allow you to change any data you
        do not have the permission to.</p>
        <p>If you are unauthorized, you will not be able to change any details.</p>
    `
}
