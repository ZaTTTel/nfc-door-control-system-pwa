import {Component} from '@angular/core';
import {MatExpansionPanel} from "@angular/material/expansion";
import {NfcToken} from '../../../../../shared-utilities';

@Component({
    selector: 'app-current-nfc-token',
    templateUrl: './current-nfc-token.component.html',
    styleUrls: ['./current-nfc-token.component.css']
})
/**
 * This component wraps a {@link MatExpansionPanel} that allows the user to delete or to check the current users
 * {@link NfcToken}. It also has the ability to display a progress bar, when one of the buttons is pressed, and is
 * loading.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class CurrentNfcTokenComponent {

    /**
     * keeps track if the {@link MatExpansionPanel} is open or closed. If it is changed, the
     * {@link MatExpansionPanel}s open status is also changed.
     */
    isOpen: boolean = false;

    /**
     * is true, only if one of the child buttons have been pressed, and are waiting for a result
     */
    isLoading = false;

    /**
     * This handler is called, whenever one of the child buttons has been pressed. The {@link Promise}, that
     * resolves when the operation is complete, is passed by the children.
     * @param promise resolves when the action is done loading
     */
    actionHandler(promise: Promise<any>) {
        if (this.isLoading) {
            return;
        }
        // close the expansion panel
        this.isOpen = false;
        // start the loading bar
        this.isLoading = true;
        promise.then(() => {
            this.isLoading = false;
            this.isOpen = true;
        }).catch(() => {
            this.isLoading = false;
            this.isOpen = true;
        })
    }

}
