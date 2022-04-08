import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DeleteNfcTokenButtonComponent, DeleteNfcTokenConfirmationDialog} from './delete-nfc-token-button.component';
import {BehaviorSubject, Observable} from "rxjs";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogModule
} from "@angular/material/dialog";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {User} from 'src/app/common/util-types/user/User';

describe('DeleteNfcTokenButtonComponent', () => {
    let component: DeleteNfcTokenButtonComponent;
    let fixture: ComponentFixture<DeleteNfcTokenButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatDialogModule
            ],
            declarations: [
                DeleteNfcTokenButtonComponent,
                DeleteNfcTokenConfirmationDialog,
                MatDialogContent,
                MatDialogActions,
            ],
            providers: [
                {provide: SwitchUserStatusService, useClass: SwitchUserMock},
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: MatDialog, useClass: DialogMock},
                {provide: PopUpService, useClass: PopUpMock},

                {provide: MAT_DIALOG_DATA, useValue: user}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteNfcTokenButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        tokenHasBeenRemoved = false;
        allowTokenRemoval = true;
        dialogCloseSource = new BehaviorSubject<boolean>(false)

        button = fixture.nativeElement.querySelector('button')
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should tell the communicator to delete the token when clicked', () => {
        expect(tokenHasBeenRemoved).toBeFalse();
        button.dispatchEvent(new Event('click'));
        dialogCloseSource.next(true);
        expect(tokenHasBeenRemoved).toBeTrue();
    })

    it('should be able to handle removeToken() rejects', () => {
        allowTokenRemoval = false;
        expect(tokenHasBeenRemoved).toBeFalse();
        button.dispatchEvent(new Event('click'));
        dialogCloseSource.next(true);
        expect(tokenHasBeenRemoved).toBeFalse();
    })

    it('nothing should happen if the user does not confirm', fakeAsync(() => {
        expect(tokenHasBeenRemoved).toBeFalse();
        button.dispatchEvent(new Event('click'));
        dialogCloseSource.next(false);
        tick()
        expect(tokenHasBeenRemoved).toBeFalse();
    }))

    describe('test the confirmation dialog', () => {
        let fixture: ComponentFixture<DeleteNfcTokenConfirmationDialog>;
        let component: DeleteNfcTokenConfirmationDialog;

        beforeEach(() => {
            fixture = TestBed.createComponent(DeleteNfcTokenConfirmationDialog);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        })
    })
});

let tokenHasBeenRemoved: boolean
let allowTokenRemoval: boolean;

class CommunicatorMock {
    removeNfcToken() {
        if (allowTokenRemoval) {
            tokenHasBeenRemoved = true;
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }
}

let dialogCloseSource: BehaviorSubject<boolean>

class DialogMock {
    open() {
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

let user = new User("alex");

class SwitchUserMock {
    get user(): User {
        return user;
    }
}
