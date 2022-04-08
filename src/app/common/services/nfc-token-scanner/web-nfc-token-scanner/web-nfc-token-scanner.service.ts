import {Injectable} from '@angular/core';
import {NfcTokenScannerService} from "../NfcTokenScannerService";
import {LoggerService} from "../../logger/logger.service";
import {NfcToken} from "../../../../../shared-utilities";

@Injectable({
    providedIn: 'root'
})
/**
 * Represents a scanner to detect a NFC-Token. {@link startScanning} can be called to get a promise
 * resolving on a successful scan. This promise can be discarded by calling {@link stopScanning}.
 *
 * To scan NFC chips, Web NFC ({@link https://w3c.github.io/web-nfc/}) by W3C is used to utilize the devices
 * built-in NFC scanner to read an {@link NfcToken}, containing the details of the scanned chip.
 *
 *
 * Currently, (January 2022), Web NFC is ONLY available using Chrome on Android version 89 (iPhone unsure) and Samsung
 * Internet version 15.
 * For a table of browsers/OSes supporting Web NFC, click
 * [here]{@link https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API}
 *
 * IMPORTANT: Technically, Web NFC is currently experimental. This could lead to two developments:
 *   * More browsers might be supported, without needing to change the code (fingers crossed)
 *   * The classes/methods used here might become deprecated and stop working. If this is the case, go to
 *     {@link https://w3c.github.io/web-nfc/} to find the new documentation of Web NFC and fix the code.
 *
 * Both cases are unlikely to happen in my opinion.
 *
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class WebNfcTokenScannerService implements NfcTokenScannerService {

    /**
     * This scanning promise is a singleton that is returned/created in startScanning().
     * @private
     */
    private _scanningPromise: Promise<NfcToken> | undefined;

    /**
     * This abort controller can be used to abort the current scan (if one is currently running)
     * @private
     */
    private _abortController: AbortController | undefined;

    /**
     * The following injection is required
     * @param _logger to log details about the current scan
     */
    constructor(private _logger: LoggerService) {
    }

    /**
     * This method is used to start scanning for a NFC-Token. The returned promise should resolve when a successful scan
     * has occurred. This resolve will return the {@link NfcToken} containing the detains of the NFC chip
     * that was scanned.
     * If an error occurred while scanning or before the scan has even started, the promise rejects.
     *
     * If {@link stopScanning} is called, the scan is aborted and the promise is discarded.
     */
    startScanning(): Promise<NfcToken> {
        if (this._scanningPromise) {
            return this._scanningPromise;
        }
        this._logger.log("Scanner created")
        // create the promise that resolves with a successful scan
        this._scanningPromise = new Promise<NfcToken>(async (resolve, reject) => {
            this._logger.log("User clicked scan button");

            // scanning with might throw an error. These will be caught here
            try {
                const ndef = new NDEFReader();

                // creates a new abort controller that can be used to abort the scan. A new one must be created, as
                // AbortController.abort() can only be run once.
                this._abortController = new AbortController();

                // start the scan. Use the _abortSignal to tell this scan to stop scanning.
                await ndef.scan({signal: this._abortController.signal})

                this._logger.log("Scan started");

                // Listen for reading-errors. If one occurs, reject with a message
                ndef.addEventListener("readingerror", () => {
                    reject("There was an error reading the chip. Maybe try another?");
                });

                // Listen for a successful scan. If one occurs, resolve with its result
                ndef.addEventListener("reading", (result) => {
                    const ndefReadingEvent = (result as NDEFReadingEvent);
                    resolve(ndefReadingEvent.serialNumber);
                });
            } catch (error) {
                reject(`The following error occurred while reading your chip: ${error}`);
            }
        })
        return this._scanningPromise;
    }

    /**
     * This method can be used to abort and discard the current scanning promise.
     */
    stopScanning(): void {
        if (this._abortController) {
            this._abortController.abort();
        }
        this._scanningPromise = undefined;
        this._abortController = undefined;
    }

    /**
     * Returns true only if a NFC scanner is connected and browser/OS supports Web NFC scanner
     * For a table of browsers/OSes supporting Web NFC, click
     * [here]{@link https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API}
     */
    isHardwareAvailable(): boolean {
        return ("NDEFReader" in window);
    }
}
