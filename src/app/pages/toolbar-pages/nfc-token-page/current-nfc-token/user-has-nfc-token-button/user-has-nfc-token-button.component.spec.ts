import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CheckNfcTokenInfoDialog, UserHasNfcTokenButtonComponent} from './user-has-nfc-token-button.component';
import {User} from "../../../../../common/util-types/user/User";
import {ComponentType} from "@angular/cdk/overlay";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";

describe('UserHasNfcTokenButtonComponent', () => {
    let component: UserHasNfcTokenButtonComponent;
    let fixture: ComponentFixture<UserHasNfcTokenButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                UserHasNfcTokenButtonComponent, CheckNfcTokenInfoDialog,
                MatDialogContent,
                MatDialogActions
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
        fixture = TestBed.createComponent(UserHasNfcTokenButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogHasBeenOpened = false;
        allowTokenCheck = true;

        button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to get and display the status of the token', fakeAsync(() => {
        userHasToken = true;
        expect(dialogHasBeenOpened).toBeFalse();
        button.dispatchEvent(new Event('click'));

        tick()
        expect(dialogHasBeenOpened).toBeTrue();
        expect(dialogData).toBe(true)
    }))

    it('should be able to handle communicator rejects', () => {
        allowTokenCheck = false;
        button.dispatchEvent(new Event('click'));
        expect().nothing();
    })

    describe('test the info dialog', () => {
        let fixture: ComponentFixture<CheckNfcTokenInfoDialog>;
        let component: CheckNfcTokenInfoDialog;

        beforeEach(() => {
            fixture = TestBed.createComponent(CheckNfcTokenInfoDialog);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        })
    })
});

let userHasToken: boolean;
let allowTokenCheck: boolean;

class CommunicatorMock {
    userHasNfcToken(): Promise<boolean> {
        if (allowTokenCheck) {
            return Promise.resolve(userHasToken);
        } else {
            return Promise.reject();
        }
    }
}

let dialogData: boolean;
let dialogHasBeenOpened: boolean;

class DialogMock {
    open(comp: ComponentType<any>, config: { data: boolean }) {
        dialogData = config.data;
        dialogHasBeenOpened = true;
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
