import {Component, Input} from '@angular/core';
import {NfcToken} from '../../../../shared-utilities';
import {MatCard} from "@angular/material/card";

@Component({
    selector: 'app-nfc-token-display',
    templateUrl: './nfc-token-display.component.html'
})
/**
 * This component simply is a way to display NFC-Tokens to the user, using a {@link MatCard} and a <code> template.
 * It looks nice.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class NfcTokenDisplayComponent {

    /**
     * the NFC-Token to be displayed
     */
    @Input() nfcToken?: NfcToken;

}
