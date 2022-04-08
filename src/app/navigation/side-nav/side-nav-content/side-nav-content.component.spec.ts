import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SideNavContentComponent} from './side-nav-content.component';
import {CommunicatorService} from "../../../common/services/communicators/CommunicatorService";
import {LoginStatusService} from "../../../common/services/login-status/login-status.service";
import {PopUpService} from "../../../common/services/pop-up/pop-up.service";
import {MatNavList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {Component, Input} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

describe('SideNavContentComponent', () => {
    let component: SideNavContentComponent;
    let fixture: ComponentFixture<SideNavContentComponent>;

    let items: HTMLElement[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SideNavContentComponent,
                MatNavList,
                MatDivider,
                LoadingBarStub
            ],
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: LoginStatusService, useClass: LoginStatusMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: MatDialog, useClass: MatDialogMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.toolbarPagesTitles = ["Page 1", "Page 2", "Page 3"]
        fixture.detectChanges();

        loginStatusLoggedOut = false;
        communicatorLoggedOut = false;
        allowLogout = true;

        items = fixture.nativeElement.querySelectorAll('a');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit the pagenumber when an item is clicked', () => {
        let arrived = false;
        component.onItemClick.subscribe(number => {
            expect(number).toBe(1);
            arrived = true;
        })
        items[1].dispatchEvent(new Event('click'))

        expect(arrived).toBeTrue()
    })

    it('should be able to log the user out', fakeAsync(() => {
        expect(loginStatusLoggedOut).toBeFalse();
        expect(communicatorLoggedOut).toBeFalse();
        items[items.length - 1].dispatchEvent(new Event('click'));
        tick();
        expect(loginStatusLoggedOut).toBeTrue();
        expect(communicatorLoggedOut).toBeTrue();
    }))

    it('should be able to handle logout() rejects', () => {
        allowLogout = false;
        expect(() => {
            items[items.length - 1].dispatchEvent(new Event('click'));
        }).not.toThrowError()
    })
});

let loginStatusLoggedOut: boolean;

class LoginStatusMock {
    setLoggedOut() {
        loginStatusLoggedOut = true
    }
}

let communicatorLoggedOut: boolean;
let allowLogout: boolean

class CommunicatorMock {
    logout() {
        if (allowLogout) {
            communicatorLoggedOut = true
            return Promise.resolve();
        } else {
            return Promise.reject();
        }

    }
}

class PopUpMock {
    show() {
    }
}

@Component({selector: 'app-loading-bar', template: ''})
class LoadingBarStub {
    @Input() isVisible = false;
}

class MatDialogMock {
    open() {
    }
}
