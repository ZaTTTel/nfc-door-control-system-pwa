import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {SetNfcTokenDialog} from './set-nfc-token-dialog.component';
import {User} from "../../../../../common/util-types/user/User";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {Component, Input} from "@angular/core";
import {NfcToken} from "../../../../../../shared-utilities";

describe('SetNfcTokenComponent', () => {
    let component: SetNfcTokenDialog;
    let fixture: ComponentFixture<SetNfcTokenDialog>;

    let confirmButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SetNfcTokenDialog,
                TokenDisplayStub,
                MatDialogContent,
                MatDialogActions
            ],
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: MatDialogRef, useClass: DialogRefMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: SwitchUserStatusService, useClass: SwitchUserMock},

                {provide: MAT_DIALOG_DATA, useValue: "token1234"}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        user = new User("alex")
        fixture = TestBed.createComponent(SetNfcTokenDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();

        tokenHasBeenAdded = false
        dialogHasBeenClosed = false;
        allowAddToken = true;

        confirmButton = fixture.nativeElement.querySelectorAll('button')[1];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to add a token', fakeAsync(() => {
        confirmButton.dispatchEvent(new Event('click'));
        expect(tokenHasBeenAdded).toBeTrue();
        expect(dialogHasBeenClosed).toBeTrue();
    }))

    it('should handle communicator rejects', () => {
        allowAddToken = false;
        confirmButton.dispatchEvent(new Event('click'));
        expect(tokenHasBeenAdded).toBeFalse();
        expect(dialogHasBeenClosed).toBeTrue();
    })
});

let tokenHasBeenAdded: boolean;
let allowAddToken: boolean

class CommunicatorMock {
    addNfcToken() {
        if (allowAddToken) {
            tokenHasBeenAdded = true
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }
}

let dialogHasBeenClosed: boolean

class DialogRefMock {
    close() {
        dialogHasBeenClosed = true;
    }
}

class PopUpMock {
    show() {
    }
}

let user: User;

class SwitchUserMock {
    get user(): User {
        return user;
    }
}

@Component({selector: 'app-nfc-token-display', template: ''})
class TokenDisplayStub {
    @Input() nfcToken!: NfcToken
}
