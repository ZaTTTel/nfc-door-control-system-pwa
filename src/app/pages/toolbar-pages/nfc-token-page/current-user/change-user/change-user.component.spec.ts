import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeUserComponent, ChangeUserInfoDialog} from './change-user.component';
import {User} from "../../../../../common/util-types/user/User";
import {CommunicatorService} from "../../../../../common/services/communicators/CommunicatorService";
import {SwitchUserStatusService} from "../../../../../common/services/switch-user-status/switch-user-status.service";
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {MatDialog, MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ChangeUserComponent', () => {
    let component: ChangeUserComponent;
    let fixture: ComponentFixture<ChangeUserComponent>;

    let input: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatAutocompleteModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule
            ],
            declarations: [
                ChangeUserComponent,
                ChangeUserInfoDialog,
                MatLabel,
                MatFormField,
                MatDialogContent,
                MatDialogActions
            ],
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: SwitchUserStatusService, useClass: SwitchUserMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: MatDialog, useClass: DialogMock},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        user = new User("alex");

        input = fixture.nativeElement.querySelector('input')
        button = fixture.nativeElement.querySelector('button')
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to switch the user', () => {
        expect(user.name).toBe("alex")
        input.value = "david";
        fixture.detectChanges();
        button.dispatchEvent(new Event('click'));
        expect(user.name).toBe("david");
    })

    it('should reject an empty input', () => {
        expect(user.name).toBe("alex")
        input.value = "";
        fixture.detectChanges();
        button.dispatchEvent(new Event('click'));
        expect(user.name).toBe("alex")
    })

    describe('test the info dialog', () => {
        let fixture: ComponentFixture<ChangeUserInfoDialog>;
        let component: ChangeUserInfoDialog;

        beforeEach(() => {
            fixture = TestBed.createComponent(ChangeUserInfoDialog);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        })
    })
});

class CommunicatorMock {
    getUsernames() {
        return Promise.resolve(["alex", "david", "lennart"])
    }
}

let user: User;

class SwitchUserMock {
    setUser(u: User) {
        user = u;
    }
}

class PopUpMock {
    show() {
    }
}

class DialogMock {
    open() {
    }
}
