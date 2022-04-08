import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NfcScanHelpDialog} from "./nfc-scan-help.component";
import {BehaviorSubject, Observable} from "rxjs";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {MatDialog, MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {Component, Input} from "@angular/core";

describe('NfcScanHelpDialog', () => {
    let component: NfcScanHelpDialog;
    let fixture: ComponentFixture<NfcScanHelpDialog>;

    let manSyncButton: HTMLElement;
    let manEntryButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NfcScanHelpDialog,
                MatDialogContent,
                MatDialogActions,
                ManualSyncStub,
                LoadingBarStub
            ],
            providers: [
                {provide: PopUpService, useClass: PopUpMock},
                {provide: MatDialog, useClass: MatDialogMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NfcScanHelpDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogHasBeenOpened = false;

        manSyncButton = fixture.nativeElement.querySelector('app-manual-sync-button');
        manEntryButton = fixture.nativeElement.querySelectorAll('button')[0];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to open the manual entry dialog', fakeAsync(() => {
        expect(dialogHasBeenOpened).toBeFalse();
        expect(component.isLoading).toBeFalse()
        manEntryButton.dispatchEvent(new Event('click'));
        expect(dialogHasBeenOpened).toBeTrue();
        let finishLoading = () => {
        };
        const loadingPromise = new Promise<void>((resolve) => {
            finishLoading = resolve;
        })
        dialogCloseSource.next(loadingPromise);
        expect(component.isLoading).toBeTrue()
        finishLoading()
        tick()
        expect(component.isLoading).toBeFalse()
    }))

    it('should handle loadingPromise rejects', fakeAsync(() => {
        let cancelLoading = () => {
        };
        const loadingPromise = new Promise<void>((resolve, reject) => {
            cancelLoading = reject;
        })
        component.displayLoading(loadingPromise);
        cancelLoading();
        tick()
        expect(component.isLoading).toBeFalse()
    }))
});

class PopUpMock {
    show() {
    }
}

const dialogCloseSource = new BehaviorSubject<Promise<void> | undefined>(undefined)
let dialogHasBeenOpened: boolean;

class MatDialogMock {
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

@Component({selector: 'app-manual-sync-button', template: ''})
class ManualSyncStub {
}

@Component({selector: 'app-loading-bar', template: ''})
class LoadingBarStub {
    @Input() isVisible = false;
}
