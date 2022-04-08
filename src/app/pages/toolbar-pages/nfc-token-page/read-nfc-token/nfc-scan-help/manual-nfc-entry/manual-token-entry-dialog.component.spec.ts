import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ManualTokenEntryDialog} from './manual-token-entry-dialog.component';
import {BehaviorSubject, Observable} from "rxjs";
import {NfcToken} from "../../../../../../../shared-utilities";
import {User} from "../../../../../../common/util-types/user/User";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SwitchUserStatusService} from "../../../../../../common/services/switch-user-status/switch-user-status.service";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ComponentType} from "@angular/cdk/overlay";

describe('ManualNfcEntryComponent', () => {
    let component: ManualTokenEntryDialog;
    let fixture: ComponentFixture<ManualTokenEntryDialog>;

    let confirmButton: HTMLButtonElement;
    let input: HTMLInputElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule
            ],
            declarations: [
                ManualTokenEntryDialog,
                MatFormField,
                MatLabel
            ],
            providers: [
                {provide: MatDialog, useClass: SetNfcDialogMock},
                {provide: MatDialogRef, useClass: ManTokenEntryDialogRefMock},
                {provide: SwitchUserStatusService, useClass: SwitchUserMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManualTokenEntryDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();

        user = new User("alex")
        manTokenEntryDialogIsClosed = false;
        setNfcDialogIsClosed = false;

        confirmButton = fixture.nativeElement.querySelectorAll('button')[1]
        input = fixture.nativeElement.querySelector('input')
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the set-token-dialog with the entered token when the button is pressed', fakeAsync(() => {
        expect(manTokenEntryDialogIsClosed).toBeFalse();
        input.value = "token123";
        fixture.detectChanges();
        confirmButton.dispatchEvent(new Event('click'));
        tick();
        expect(tokenInDialog).toBe("token123");
        expect(manTokenEntryDialogIsClosed).toBeTrue();
    }))

    it('should handle an undefined user', () => {
        user = undefined;
        confirmButton.dispatchEvent(new Event('click'));
        expect(manTokenEntryDialogIsClosed).toBeFalse();
    })
});

const dialogCloseSource = new BehaviorSubject<Promise<void> | undefined>(undefined)
let tokenInDialog: NfcToken;

class SetNfcDialogMock {
    open(com: ComponentType<any>, config: { data: NfcToken }) {
        tokenInDialog = config.data;
        return new SetNfcDialogRefMock();
    }
}

let setNfcDialogIsClosed: boolean;

class SetNfcDialogRefMock {
    afterClosed(): Observable<any> {
        setNfcDialogIsClosed = true;
        return dialogCloseSource.asObservable();
    }
}

let manTokenEntryDialogIsClosed: boolean;

class ManTokenEntryDialogRefMock {
    close() {
        manTokenEntryDialogIsClosed = true
    }
}

let user: User | undefined;

class SwitchUserMock {
    get user(): User | undefined {
        return user;
    }
}
