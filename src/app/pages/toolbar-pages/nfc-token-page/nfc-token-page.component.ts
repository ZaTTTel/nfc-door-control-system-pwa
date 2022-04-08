import {Component} from '@angular/core';
import {NfcToken} from '../../../../shared-utilities';
import {ToolbarPageComponent} from "../ToolbarPageComponent";

@Component({
    selector: 'app-nfc-token-page',
    templateUrl: './nfc-token-page.component.html',
    styleUrls: ['./nfc-token-page.component.css']
})
/**
 * This page components contains all the subcomponents needed for the user to edit their {@link NfcToken}. (Or for
 * admins to edit others)
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class NfcTokenPageComponent implements ToolbarPageComponent {
}
