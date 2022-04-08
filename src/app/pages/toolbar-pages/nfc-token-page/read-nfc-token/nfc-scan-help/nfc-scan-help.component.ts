import {Component} from "@angular/core";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {MatDialog} from "@angular/material/dialog";
import {ManualTokenEntryDialog} from "./manual-nfc-entry/manual-token-entry-dialog.component";

@Component({
    selector: 'app-nfc-scan-help-dialog',
    templateUrl: './nfc-scan-help-dialog.html',
})
/**
 * This component is displayed in a dialog to inform the user why their device might not be nfc capable.
 * It also contains a few buttons to perform fringe tasks, like synchronizing tokens or manually entering new tokens.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class NfcScanHelpDialog {

    /**
     * This html section is displayed in the dialog content. It is saved here, so that it can be localized using
     * $localize.
     */
    helpTextHtml = $localize`:@@NfcTags.Scan.Help.HTML:
        <h2>Why is my device not NFC capable?</h2>
        <p>It seems that either the hardware or the browser that you are using does not support in-browser NFC scans.</p>
        <p>Some mobile devices do not have an NFC scanner. Check online if this is the case for your phone. An NFC Scanner connected to your computer will not work.</p>
        <p>
        We use the Web NFC API to scan your tag, which some browsers do not support.
        To see if your browser supports Web NFC,
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API" target="_blank">check the table here.</a>
        </p>

        <h2>I can start scanning, but the tag isn't being read!</h2>
        <p>
            On your phone, the NFC scanner is usually located on the back, near the rear camera.
            If you've tried moving the tag around the back of your phone and the scan still isn't succeeding,
            it is possible that your phone or your browser doesn't support NFC scans.
        </p>
    `

    /**
     * is true, if one of the buttons tasks are loading
     */
    isLoading = false;

    /**
     * the following injections are required:
     * @param _popUp to display messages of errors and successes
     * @param _dialog to display the {@link ManualTokenEntryDialog}
     */
    constructor(private _popUp: PopUpService,
                private _dialog: MatDialog) {
    }

    /**
     * Is called when one of the buttons is loading.
     * The entered promise should resolve when the loading is done
     * @param promise
     */
    displayLoading(promise: Promise<any>) {
        this.isLoading = true;
        promise.then(() => {
            this.isLoading = false
        }).catch(() => this.isLoading = false)
    }

    /**
     * is run when the manual-entry-button is pressed.
     * Opens a dialog containing the {@link ManualTokenEntryDialog}.
     */
    manualEntryHandler() {
        const dialogRef = this._dialog.open(ManualTokenEntryDialog, {
            width: "90%",
            maxWidth: "500px"
        });

        dialogRef.afterClosed().subscribe((addNfcTokenPromise: Promise<void> | undefined) => {
            if (addNfcTokenPromise) {
                this.displayLoading(addNfcTokenPromise);
            }
        })
    }
}
