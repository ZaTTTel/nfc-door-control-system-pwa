import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';
import {Component, DebugElement, Input} from "@angular/core";
import {CommunicatorService} from "../../common/services/communicators/CommunicatorService";
import {PopUpService} from "../../common/services/pop-up/pop-up.service";
import {LoginInfo} from "../../../shared-utilities";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {User} from "../../common/util-types/user/User";
import {LoginStatusService} from "../../common/services/login-status/login-status.service";

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let debug: DebugElement;

    let u: HTMLInputElement;
    let p: HTMLInputElement;
    let b: HTMLButtonElement;

    let comm: CommunicatorService;
    let loginStatus: LoginStatusService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                BrowserAnimationsModule
            ],
            declarations: [LoginPageComponent, MatFormField, MatLabel, MatIcon, LoadingBarStubComponent],
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: LoginStatusService, useClass: LoginStatusMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        debug = fixture.debugElement;
        fixture.detectChanges();

        const inputs = fixture.nativeElement.querySelectorAll('input');
        u = inputs[0];
        p = inputs[1];
        b = fixture.nativeElement.querySelectorAll('button')[1]
        comm = fixture.debugElement.injector.get(CommunicatorService);
        loginStatus = fixture.debugElement.injector.get(LoginStatusService);
        component.isLoading = false;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should log in correctly', fakeAsync(() => {
        u.value = "alex";
        p.value = "abc";
        fixture.detectChanges();

        b.dispatchEvent(new Event('click'))
        let arrived = false
        comm.getLoggedIn().then(name => {
            if (name === "alex") {
                arrived = true;
            }
        }).catch(() => {
        })
        tick()
        expect(arrived).toBeTrue();
    }))

    it('should refuse incorrect details', fakeAsync(() => {
        u.value = "gregor";
        p.value = "abc";
        fixture.detectChanges();

        b.dispatchEvent(new Event('click'))

        let arrived1 = false;
        comm.getLoggedIn().then(name => {
            if (!name) {
                arrived1 = true;
            }
        }).catch(() => {
        })
        tick()
        expect(arrived1).toBeTrue()

        u.value = "alex";
        p.value = "wrongpassword"

        let arrived2 = false;
        comm.getLoggedIn().then(name => {
            if (!name) {
                arrived2 = true;
            }
        }).catch(() => {
        })
        tick()
        expect(arrived2).toBeTrue()
    }))

    describe('should resume a valid session desc', () => {

        beforeEach(async () => {
            return comm.login(new LoginInfo("alex", "abc")).then(() => {
                fixture = TestBed.createComponent(LoginPageComponent);
                component = fixture.componentInstance;
                debug = fixture.debugElement;
                fixture.detectChanges();
            })
        })

        it('should resume a valid session', waitForAsync(() => {
            fixture.whenStable().then(() => {
                comm.getLoggedIn().then(() => {
                    expect(loginStatus.user?.name).toBe("alex");
                })
            })
        }))
    })

    describe('should handle an error from getLoggedIn; desc', () => {

        beforeEach(async () => {
            // set the current user to "error" tells the mock communicator to reject on getLoggedIn
            return comm.login(new LoginInfo("error", "abc")).then(() => {
                fixture = TestBed.createComponent(LoginPageComponent);
                component = fixture.componentInstance;
                debug = fixture.debugElement;
                fixture.detectChanges();
            })
        })

        it('should handle an error from getLoggedIn', waitForAsync(() => {
            expect(loginStatus.user).toBeUndefined();
            expect(component.isLoading).toBe(false);
        }))
    })
});

class LoginStatusMock {
    public user: User | undefined;

    setLoggedIn(user: User) {
        this.user = user;
    }
}

class PopUpMock {
    public lastShown: string | undefined

    show(m: string) {
        this.lastShown = m;
    }
}

class CommunicatorMock {
    lastEnteredInfo: LoginInfo | undefined;

    login(info: LoginInfo) {
        if ((info.username == "alex" || info.username == "error") && info.password == "abc") {
            this.lastEnteredInfo = info;
            return Promise.resolve();
        } else {
            return Promise.reject("Incorrect!");
        }
    }

    getLoggedIn() {
        // if the user "error" is logged in, reject the promise
        if (this.lastEnteredInfo?.username == "error") {
            return Promise.reject();
        }

        if (this.lastEnteredInfo) {
            return Promise.resolve(this.lastEnteredInfo?.username);
        } else {
            return Promise.resolve(undefined);
        }
    }
}

@Component({selector: 'app-loading-bar', template: ''})
class LoadingBarStubComponent {
    @Input() isVisible = false;
}
