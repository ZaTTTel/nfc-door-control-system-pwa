import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDeviceConfirmationDialog, DeviceListItemComponent} from './device-list-item.component';
import {PopUpService} from "../../../../../common/services/pop-up/pop-up.service";
import {BehaviorSubject} from "rxjs";
import {Event as EventTrigger, EventSubscriber} from "../../../../../../shared-utilities";
import {DevicesManagerService} from "../../../../../common/services/devices-list/devices-manager.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuModule} from "@angular/material/menu";

describe('DeviceListItemComponent', () => {
    let component: DeviceListItemComponent;
    let fixture: ComponentFixture<DeviceListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatMenuModule,
                MatDialogModule
            ],
            declarations: [
                DeviceListItemComponent,
                MatMenu,
                MatListItemStub,
                MatListStub,
                MatIcon,
                DeleteDeviceConfirmationDialog
            ],
            providers: [
                {provide: PopUpService, useClass: PopUpMock},
                {provide: DevicesManagerService, useClass: DevicesManagerMock},
                {provide: MatDialog, useClass: MatDialogMock},

                {provide: MAT_DIALOG_DATA, useValue: new EventSubscriber("endp4", EventTrigger.DOOR_OPENED, "device4")}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceListItemComponent);
        component = fixture.componentInstance;
        component.device = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "device1")
        fixture.detectChanges();

        devices = new Array<EventSubscriber>(
            new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "device1"),
            new EventSubscriber("endp2", EventTrigger.BELL_RUNG, "device2"),
        )
        dialogCloseSource = new BehaviorSubject<any>(undefined);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to edit a device', () => {
        component.editHandler();
        const edited = new EventSubscriber("endp3", EventTrigger.DOOR_OPENED, "device3");
        // close the dialog with the entered device 3
        dialogCloseSource.next(edited);
        expect(JSON.stringify(devices[0]) === JSON.stringify(edited)).toBe(true)
        expect(devices[1].endpoint).toBe("endp2");
        expect(devices[3]).toBeUndefined();
    })

    it('should be able to delete a device', () => {
        component.deleteHandler()
        dialogCloseSource.next(true);
        // endp1 doesn't exist in any device anymore
        expect(devices.findIndex(device => device.endpoint === "endp1")).toBe(-1);
    })

    it('should do nothing when the user changes their mind', () => {
        component.deleteHandler()
        dialogCloseSource.next(false);
        // endp1 still exists
        expect(devices.findIndex(device => device.endpoint === "endp1")).toBe(0);
    })

    it('should be able to handle rejects from the delete promise', () => {
        // rename the device to 'error', so an error will be thrown be the mock
        component.device.label = "error";
        component.deleteHandler();
        expect(() => dialogCloseSource.next(true)).not.toThrowError();
    })

    describe('test the confirmation dialog', () => {
        let fixture: ComponentFixture<DeleteDeviceConfirmationDialog>;
        let component: DeleteDeviceConfirmationDialog;

        beforeEach(() => {
            fixture = TestBed.createComponent(DeleteDeviceConfirmationDialog);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        })
    })
});

class PopUpMock {
    show() {
    }
}

class MatDialogMock {
    open(): DialogRefMock {
        return new DialogRefMock();
    }
}

let dialogCloseSource: BehaviorSubject<any>;

class DialogRefMock {
    afterClosed() {
        return dialogCloseSource.asObservable();
    }
}

let devices: EventSubscriber[] = []

class DevicesManagerMock {
    editDevice(o: EventSubscriber, n: EventSubscriber) {
        return new Promise<void>((resolve, reject) => {
            devices.forEach(device => {
                if (device.endpoint === o.endpoint) {
                    device.label = n.label;
                    device.event = n.event;
                    device.endpoint = n.endpoint;
                    return resolve();
                }
                return reject();
            })
        })
    }

    removeDevice(d: EventSubscriber) {
        if (d.label === "error") {
            return Promise.reject();
        }

        const index = devices.findIndex(device => {
            return device.endpoint === d.endpoint
        })
        // Doesn't really delete, just removes data. was too lazy
        devices[index] = new EventSubscriber("", EventTrigger.DOOR_OPENED, "");
        return Promise.resolve();
    }
}

@Component({selector: 'mat-list', template: ''})
class MatListStub {
}

@Component({selector: 'mat-list-item', template: ''})
class MatListItemStub {
}
