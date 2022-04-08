import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentUserComponent} from './current-user.component';
import {SwitchUserStatusService} from "../../../../common/services/switch-user-status/switch-user-status.service";
import {User} from "../../../../common/util-types/user/User";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Component} from "@angular/core";
import {PortalModule} from "@angular/cdk/portal";

describe('CurrentUserComponent', () => {
    let component: CurrentUserComponent;
    let fixture: ComponentFixture<CurrentUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                PortalModule
            ],
            declarations: [
                CurrentUserComponent,
                MatExpansionPanel,
                MatExpansionPanelHeader,
                MatExpansionPanelTitle,
                ChangeUserStub
            ],
            providers: [
                {provide: SwitchUserStatusService, useClass: SwitchUserMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class SwitchUserMock {
    get user() {
        return new User('alex')
    }
}

@Component({selector: 'app-change-user', template: ''})
class ChangeUserStub {
}
