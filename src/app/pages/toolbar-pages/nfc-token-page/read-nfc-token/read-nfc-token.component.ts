import {Component, OnDestroy} from '@angular/core';
import {LoggerService} from "../../../../common/services/logger/logger.service";
import {NfcTokenScannerService} from "../../../../common/services/nfc-token-scanner/NfcTokenScannerService";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";
import {MatDialog} from "@angular/material/dialog";
import {SetNfcTokenDialog} from "./set-nfc-token/set-nfc-token-dialog.component";
import {NfcToken} from "../../../../../shared-utilities"
import {SwitchUserStatusService} from "../../../../common/services/switch-user-status/switch-user-status.service";
import {NfcScanHelpDialog} from "./nfc-scan-help/nfc-scan-help.component";

@Component({
    selector: 'app-read-nfc-token',
    templateUrl: './read-nfc-token.component.html',
    styleUrls: ['./read-nfc-token.component.css']
})
/**
 * This Component is used to use the devices NFC scanner to let the user scan their chip.
 * It also lets the user know if their hardware is incompatible.
 *
 * The component does not scan from the get-go, the user must click the 'Start Scanning' button, to begin the scan.
 * When the hardware is currently scanning, the wireless logo is displayed in solid black (if not it is translucent).
 *
 * A small help-button is displayed on the top-right, which opens a dialog explaining why the user's device might not
 * be able to read NFC.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ReadNfcTokenComponent implements OnDestroy {

    /**
     * This boolean is false, if the current hardware is not supported. If it is true, the hardware is probably
     * supported, but not guaranteed to be.
     */
    readonly isNfcCapable: boolean;

    /**
     * is true, only if the hardware is currently scanning for an NFC Tag
     */
    isScanning: boolean = false;

    /**
     * Is true, only if the communicator is currently waiting, and the loading bar is displayed
     */
    isLoading: boolean = false;

    /**
     * the following injections are required:
     * @param _scanner to access the hardware scanner
     * @param _switchUserStatus to get the user that is currently being edited
     * @param _dialog to display the scanned NFC-Token to the user, and ask for confirmation
     * @param _popUp to report errors
     * @param _logger to log results
     */
    constructor(private _scanner: NfcTokenScannerService,
                private _switchUserStatus: SwitchUserStatusService,
                private _dialog: MatDialog,
                private _popUp: PopUpService,
                private _logger: LoggerService) {
        // check if the correct hardware is available and update isNfcCapable
        this.isNfcCapable = _scanner.isHardwareAvailable();
    }

    /**
     * When this component stops being displayed, the scanner is stopped
     */
    ngOnDestroy() {
        this._scanner.stopScanning();
    }

    /**
     * is called then the start scanning button is pressed.
     * Toggles the isReading status by calling either startScanning or stopScanning
     */
    startScanningButtonHandler() {
        if (!this.isScanning) {
            this.startScanning()
        } else {
            this.stopScanning()
        }

    }

    /**
     * Displays the dialog explaining why the user's device/browser might not be NFC-capable.
     */
    helpButtonHandler() {
        this._dialog.open(NfcScanHelpDialog);
    }

    /**
     * is run when isScanning is false, and the start scanning button is pressed.
     *
     * Notifies the scanner service to start scanning.
     * If something is scanned, run confirmScan() with the NFC-Token
     * @private
     */
    private startScanning() {
        this.isScanning = true;
        // start the scan
        this._scanner.startScanning().then((nfcToken) => {
            // when something has been scanned
            this.stopScanning();
            this._logger.log(`Chip with the serial number ${nfcToken} has been read.`)
            this.confirmScan(nfcToken)
        }).catch(e => {
            //when there was an error scanning
            this._popUp.show(e)
        });
    }

    /**
     * is run when isScanning is true, and the start scanning button is pressed.
     *
     * notifies the scanner service to stop scanning
     * @private
     */
    private stopScanning() {
        this._scanner.stopScanning();
        this.isScanning = false;
    }

    /**
     * This method opens {@link SetNfcTokenDialog} as a Dialog, asking the user for confirmation on the scanned
     * NFC-Token.
     * @param newNfcToken
     * @private
     */
    private confirmScan(newNfcToken: NfcToken) {
        // this should never be the case, as a user has to be logged in to scan.
        if (!this._switchUserStatus.user) {
            return;
        }

        //open the dialog
        const dialogRef = this._dialog.open(SetNfcTokenDialog, {
            data: newNfcToken
        })
        dialogRef.afterClosed().subscribe((addNfcTokenPromise: Promise<void> | undefined) => {
            // if the dialog close resulted in a request to the communicator, wait for the resulting promise to resolve
            if (addNfcTokenPromise) {
                // activate the loading bar
                this.isLoading = true;
                // wait for the results of the addNfcTokenPromise
                addNfcTokenPromise.then(() => {
                    this.isLoading = false;
                }).catch(() => {
                    this.isLoading = false;
                })
            }
        })
    }

}


