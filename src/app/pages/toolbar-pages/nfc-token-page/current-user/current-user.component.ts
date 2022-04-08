import {Component} from '@angular/core';
import {SwitchUserStatusService} from "../../../../common/services/switch-user-status/switch-user-status.service";
import {MatExpansionPanel} from "@angular/material/expansion";

@Component({
    selector: 'app-current-user',
    templateUrl: './current-user.component.html',
    styleUrls: ['./current-user.component.css']
})
/**
 * This component wraps a {@link MatExpansionPanel} that allows the user to change the user currently being edited
 * in the NFC-Token page.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class CurrentUserComponent {

    /**
     * the following injection is required in the template:
     * @param _switchUserStatus to get the user that is currently being edited. This will be displayed in the header
     */
    constructor(public _switchUserStatus: SwitchUserStatusService) {
    }
}
