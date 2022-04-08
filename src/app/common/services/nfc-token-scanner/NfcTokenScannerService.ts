import {NfcToken} from "../../../../shared-utilities";

/**
 * Represents a scanner to detect a NFC-Token. {@link startScanning} can be called to get a promise
 * resolving on a successful scan. This promise can be discarded by calling {@link stopScanning}
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export abstract class NfcTokenScannerService {

    /**
     * This method is used to start scanning for a NFC-Token. The returned promise should resolve when a successful
     * scan
     * has occurred. This resolve will return the {@link NfcToken} containing the serial number of the chip that was
     * read. If an error occurred while scanning or before the scan has even started, the promise rejects.
     *
     * If {@link stopScanning} is called, the scan is aborted and the promise is discarded.
     */
    abstract startScanning(): Promise<NfcToken>

    /**
     * Stops the scanning process if a scan is currently running. If no scan is running nothing is changed.
     */
    abstract stopScanning(): void;

    /**
     * Returns true only if a NFC scanner is connected and browser/OS supports the NFC scanner implemented
     */
    abstract isHardwareAvailable(): boolean;

}

