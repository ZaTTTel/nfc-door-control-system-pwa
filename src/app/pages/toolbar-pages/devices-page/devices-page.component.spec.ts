import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DevicesPageComponent} from './devices-page.component';
import {DevicesManagerService} from "../../../common/services/devices-list/devices-manager.service";
import {BehaviorSubject} from "rxjs";
import {Component, Input} from "@angular/core";

describe('DevicesPageComponent', () => {
    let component: DevicesPageComponent;
    let fixture: ComponentFixture<DevicesPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DevicesPageComponent,
                DevicesListStub,
                LoadingBarStub,
                AddDeviceButtonStub
            ],
            providers: [
                {provide: DevicesManagerService, useClass: DevicesManagerMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DevicesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start and stop loading', () => {
        let resPromise = new Promise<void>((resolve) => {
            expect(component.isLoading).toBe(true);
            resolve();
        })
        loadingSource.next(resPromise);
        resPromise.then(() => {
            expect(component.isLoading).toBe(false);
        })

        // handle loading reject:
        let rejPromise = new Promise<void>((resolve, reject) => {
            expect(component.isLoading).toBe(true);
            reject();
        })
        loadingSource.next(rejPromise);
        resPromise.then(() => {
            expect(component.isLoading).toBe(false);
        })
    })
});

const loadingSource = new BehaviorSubject<Promise<void>>(Promise.resolve());

class DevicesManagerMock {
    get loadingObservable() {
        return loadingSource.asObservable();
    }

    refresh() {
    }
}

@Component({selector: 'app-loading-bar', template: ''})
class LoadingBarStub {
    @Input() isVisible = false;
}

@Component({selector: 'app-devices-list', template: ''})
class DevicesListStub {
}

@Component({selector: 'app-add-device-button', template: ''})
class AddDeviceButtonStub {
}

