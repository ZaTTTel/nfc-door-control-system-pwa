import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DevicesListComponent} from './devices-list.component';
import {BehaviorSubject} from "rxjs";
import {DevicesManagerService} from "../../../../common/services/devices-list/devices-manager.service";
import {EventSubscriber} from "../../../../../shared-utilities";
import {Component} from "@angular/core";

describe('DevicesListComponent', () => {
    let component: DevicesListComponent;
    let fixture: ComponentFixture<DevicesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DevicesListComponent,
                MatListStub,
                MatDividerStub
            ],
            providers: [
                {provide: DevicesManagerService, useClass: DevicesManagerMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

const devicesSource = new BehaviorSubject<Promise<Array<EventSubscriber>>>(Promise.resolve([]));

class DevicesManagerMock {
    get devicesObservable() {
        return devicesSource.asObservable();
    }
}

@Component({selector: 'mat-divider', template: ''})
class MatDividerStub {
}

@Component({selector: 'mat-list', template: ''})
class MatListStub {
}
