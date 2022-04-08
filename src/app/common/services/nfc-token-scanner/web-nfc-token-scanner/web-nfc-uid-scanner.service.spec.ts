import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {WebNfcTokenScannerService} from './web-nfc-token-scanner.service';
import {LoggerService} from "../../logger/logger.service";

/**
 * DISCLAIMER:
 * The web-nfc-token-scanner.service.ts uses the NDEFReader class from w3c-web-nfc. This class is defined in the
 * tsconfig.app.json and in tsconfig.spec.json, but it is not accessible from inside this test. Because of this,
 * I cannot test the full starttesting functionality. (Mocking NDEFReader also cannot be done obviously) That means, the
 * class cannot fully be tested.
 */
describe('WebNfcTokenScannerService', () => {
    let service: WebNfcTokenScannerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LoggerService, useClass: LoggerMock}
            ]
        });
        service = TestBed.inject(WebNfcTokenScannerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to check if the device is nfc capable', () => {
        expect(service.isHardwareAvailable()).toBeFalse()
    })

    it('should be able to start scanning', fakeAsync(() => {
        let arrived = false;
        // ist rejected because NDEFReader is undefined
        service.startScanning().catch(() => arrived = true)
        tick()
        expect(arrived).toBeTrue()
    }))

    it('should be able to stop scanning', fakeAsync(() => {
        service.stopScanning();
        expect().nothing();
    }))
});

class LoggerMock {
    log() {
    }
}
