import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDeviceButtonComponent} from './add-device-button.component';
import {BehaviorSubject, Observable} from "rxjs";
import {Event as EventType, EventSubscriber} from "../../../../../shared-utilities";
import {MatDialog} from "@angular/material/dialog";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";
import {DevicesManagerService} from "../../../../common/services/devices-list/devices-manager.service";
import {MatIconModule} from "@angular/material/icon";

describe('AddDeviceButtonComponent', () => {
    let component: AddDeviceButtonComponent;
    let fixture: ComponentFixture<AddDeviceButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconModule],
            declarations: [AddDeviceButtonComponent],
            providers: [
                {provide: MatDialog, useClass: MatDialogMock},
                {provide: PopUpService, useClass: PopUpServiceMock},
                {provide: DevicesManagerService, useClass: DevicesManagerMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDeviceButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button')
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add the device entered in the dialog', () => {
        button.dispatchEvent(new Event('click'))
        const newDevice = new EventSubscriber("23454", EventType.BELL_RUNG, "notifdevice")
        dialogCloseSource.next(newDevice);
        expect(lastDeviceAdded).toBe(newDevice);
    })

    it('should handle rejects from addDevice', () => {
        button.dispatchEvent(new Event('click'))
        dialogCloseSource.next(new EventSubscriber("23454", EventType.BELL_RUNG, "error"));
        expect().nothing();
    })
});

const dialogCloseSource = new BehaviorSubject<EventSubscriber | undefined>(undefined)

class MatDialogMock {
    open() {
        return new DialogRefMock();
    }
}

class DialogRefMock {
    afterClosed(): Observable<any> {
        return dialogCloseSource.asObservable();
    }
}


class PopUpServiceMock {
    show() {
    }
}

let lastDeviceAdded: EventSubscriber;

class DevicesManagerMock {
    addDevice(device: EventSubscriber): Promise<void> {
        if (device.label == "error") {
            return Promise.reject();
        } else {
            lastDeviceAdded = device;
            return Promise.resolve();
        }
    }
}

