import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ReadNfcTokenComponent} from './read-nfc-token.component';
import {User} from "../../../../common/util-types/user/User";
import {BehaviorSubject, Observable} from "rxjs";
import {NfcTokenScannerService} from "../../../../common/services/nfc-token-scanner/NfcTokenScannerService";
import {SwitchUserStatusService} from "../../../../common/services/switch-user-status/switch-user-status.service";
import {MatDialog} from "@angular/material/dialog";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";
import {LoggerService} from "../../../../common/services/logger/logger.service";
import {Component, Input} from "@angular/core";

describe('ReadNfcTokenComponent', () => {
    let component: ReadNfcTokenComponent;
    let fixture: ComponentFixture<ReadNfcTokenComponent>;

    let helpButton: HTMLButtonElement;
    let scanButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ReadNfcTokenComponent,
                LoadingBarStub
            ],
            providers: [
                {provide: NfcTokenScannerService, useClass: ScannerMock},
                {provide: SwitchUserStatusService, useClass: SwitchUserMock},
                {provide: MatDialog, useClass: DialogMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: LoggerService, useClass: LoggerMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadNfcTokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        isScanning = false;
        isHardwareAvailable = true;
        allowScanning = true;
        dialogHasBeenOpened = false;
        user = new User('alex')

        const buttons = fixture.nativeElement.querySelectorAll('button');
        helpButton = buttons[0]
        scanButton = buttons[1]
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to start and stop scanning', () => {
        expect(isScanning).toBeFalse();
        scanButton.dispatchEvent(new Event('click'));
        expect(isScanning).toBeTrue();
        scanButton.dispatchEvent(new Event('click'));
        expect(isScanning).toBeFalse();
    })

    it('should be able to handle a successful scan', fakeAsync(() => {
        expect(component.isLoading).toBeFalse()
        scanButton.dispatchEvent(new Event('click'));
        detectScan();
        tick()
        expect(dialogHasBeenOpened).toBeTrue();
        let stopLoading = () => {
        };
        const loadingPromise = new Promise<void>((resolve) => {
            stopLoading = resolve;
        })
        dialogCloseSource.next(loadingPromise);
        tick()
        expect(component.isLoading).toBeTrue()
        stopLoading();
        tick()
        expect(component.isLoading).toBeFalse()
    }))

    it('should handle scanner rejects', () => {
        allowScanning = false;
        scanButton.dispatchEvent(new Event('click'));
        expect(isScanning).toBeFalse();
    })

    it('should handle undefined users', () => {
        user = undefined;
        scanButton.dispatchEvent(new Event('click'));
        detectScan();
        expect(dialogHasBeenOpened).toBeFalse();
    })

    it('should handle communicator (addNfcToken) rejects', fakeAsync(() => {
        expect(component.isLoading).toBeFalse()
        scanButton.dispatchEvent(new Event('click'));
        detectScan();
        dialogCloseSource.next(Promise.reject());
        tick()
        expect(component.isLoading).toBeFalse()
    }))

    it('should open the help dialog', () => {
        expect(dialogHasBeenOpened).toBeFalse();
        helpButton.dispatchEvent(new Event('click'));
        expect(dialogHasBeenOpened).toBeTrue();
    })
});

let isScanning: boolean;
let isHardwareAvailable: boolean
let allowScanning: boolean
let detectScan = () => {
}

class ScannerMock {
    // returned promise resolves when detectScan() is called
    startScanning() {
        if (allowScanning) {
            isScanning = true;
            return new Promise<void>(function (resolve) {
                detectScan = resolve;
            });
        } else {
            return Promise.reject();
        }
    }

    stopScanning() {
        isScanning = false
        return Promise.resolve();
    }

    isHardwareAvailable() {
        return isHardwareAvailable;
    }
}

let user: User | undefined;

class SwitchUserMock {
    get user() {
        return user;
    }
}

const dialogCloseSource = new BehaviorSubject<Promise<void> | undefined>(undefined)
let dialogHasBeenOpened: boolean

class DialogMock {
    open() {
        dialogHasBeenOpened = true;
        return new DialogRefMock();
    }
}

class DialogRefMock {
    afterClosed(): Observable<any> {
        return dialogCloseSource.asObservable();
    }
}

class PopUpMock {
    show() {
    }
}

class LoggerMock {
    log() {
    }
}

@Component({selector: 'app-loading-bar', template: ''})
class LoadingBarStub {
    @Input() isVisible = false;
}
