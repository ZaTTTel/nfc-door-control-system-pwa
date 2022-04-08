import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DevicesManagerService} from './devices-manager.service';
import {Event as EventTrigger, EventSubscriber} from "../../../../shared-utilities";
import {CommunicatorService} from "../communicators/CommunicatorService";
import {PopUpService} from "../pop-up/pop-up.service";

describe('DevicesListService', () => {
    let service: DevicesManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: PopUpService, useClass: PopUpMock}
            ]
        });
        service = TestBed.inject(DevicesManagerService);
    });

    beforeEach(() => {
        lastAddedDevice = undefined;
        lastRemovedDevice = undefined;
        allowAddDevice = true;
        allowRemoveDevice = true;
        allowGetDevices = true;
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to tell the communicator to add a device', () => {
        const newDevice = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1");
        service.addDevice(newDevice);
        expect(lastAddedDevice).toEqual(newDevice);
    })

    it('should be able to tell the communicator to remove a device', () => {
        const device = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1");
        service.removeDevice(device);
        expect(lastRemovedDevice).toEqual(device);
    })

    it('should be able to tell the communicator to edit a device', fakeAsync(() => {
        const oldDevice = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1");
        const newDevice = new EventSubscriber("endp2", EventTrigger.BELL_RUNG, "label2");
        service.editDevice(oldDevice, newDevice);
        tick()
        expect(lastRemovedDevice).toEqual(oldDevice);
        expect(lastAddedDevice).toEqual(newDevice);
    }))

    it('should handle communicator addDevice rejects', fakeAsync(() => {
        allowAddDevice = false;
        service.addDevice(new EventSubscriber("", EventTrigger.DOOR_OPENED, ""))
        tick()
        expect(lastAddedDevice).toBeUndefined()
        tick()

        service.editDevice(new EventSubscriber("", EventTrigger.DOOR_OPENED, ""), new EventSubscriber("", EventTrigger.DOOR_OPENED, ""))
        tick()
        expect(lastAddedDevice).toBeUndefined()
    }))

    it('should handle communicator removeDevice rejects', fakeAsync(() => {
        allowRemoveDevice = false;
        service.removeDevice(new EventSubscriber("", EventTrigger.DOOR_OPENED, ""))
        tick()
        expect(lastRemovedDevice).toBeUndefined()
        tick()
        service.editDevice(new EventSubscriber("", EventTrigger.DOOR_OPENED, ""), new EventSubscriber("", EventTrigger.DOOR_OPENED, ""))
        tick()
        expect(lastRemovedDevice).toBeUndefined()
        expect(lastAddedDevice).toBeUndefined()
    }))

    it('should be able to handle getDevices rejects', fakeAsync(() => {
        allowGetDevices = false;
        service.refresh();
        expect().nothing();
    }))

    it('should be able to observe the loading status', fakeAsync(() => {
        let arrived = false;
        service.loadingObservable.subscribe(() => {
            arrived = true;
        })
        service.refresh();
        tick();
        expect(arrived).toBeTrue()
    }))

    it('should be able to observe the devices', fakeAsync(() => {
        let arrived = false;
        service.devicesObservable.subscribe(() => {
            arrived = true;
        })
        service.refresh();
        tick();
        expect(arrived).toBeTrue()
    }))

});

let lastAddedDevice: EventSubscriber | undefined;
let lastRemovedDevice: EventSubscriber | undefined;
let allowAddDevice: boolean;
let allowRemoveDevice: boolean
let allowGetDevices: boolean

class CommunicatorMock {
    getDevices() {
        if (allowGetDevices) {
            return Promise.resolve([])
        } else {
            return Promise.reject();
        }
    }

    removeDevice(d: EventSubscriber) {
        if (allowRemoveDevice) {
            lastRemovedDevice = d;
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }

    addDevice(d: EventSubscriber) {
        if (allowAddDevice) {
            lastAddedDevice = d;
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
