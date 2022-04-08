import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputDeviceInfoDialog} from './input-device-info-dialog.component';
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {PopUpService} from "../../../../common/services/pop-up/pop-up.service";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Event as EventTrigger, EventSubscriber} from "../../../../../shared-utilities";

describe('InputDeviceInfoDialogComponent', () => {
    let component: InputDeviceInfoDialog;
    let fixture: ComponentFixture<InputDeviceInfoDialog>;

    let confirmButton: HTMLButtonElement;

    const device1 = new EventSubscriber("endp1", EventTrigger.BELL_RUNG, "device1");
    const device2 = new EventSubscriber("endp2", EventTrigger.DOOR_OPENED, "device2");

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatDialogModule,
                MatSelectModule,
                NoopAnimationsModule
            ],
            declarations: [
                InputDeviceInfoDialog,
                MatFormField,
                MatLabel,
                MatSelect,
                MatDialogActions
            ],
            providers: [
                {provide: MatDialogRef, useClass: DialogRefMock},
                {provide: PopUpService, useClass: PopUpMock},
                {provide: MAT_DIALOG_DATA, useValue: device2}

            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputDeviceInfoDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogIsClosed = false;
        dialogClosedWith = undefined;

        confirmButton = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to confirm', () => {
        setInputValues(device1);
        confirmButton.dispatchEvent(new Event('click'));

        expect(dialogIsClosed).toBeTrue();
        expect(JSON.stringify(dialogClosedWith)).toBe(JSON.stringify(device1));
    })

    it('should disallow empty inputs', () => {
        const newDeviceMissingEp = new EventSubscriber("", EventTrigger.DOOR_OPENED, "device1")
        setInputValues(newDeviceMissingEp);
        confirmButton.dispatchEvent(new Event('click'));
        expect(dialogIsClosed).toBeFalse()

        const newDeviceMissingLb = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "")
        setInputValues(newDeviceMissingLb);
        confirmButton.dispatchEvent(new Event('click'));
        expect(dialogIsClosed).toBeFalse()

        setInputValues(device1);
        component.eventValue = undefined;
        confirmButton.dispatchEvent(new Event('click'));
        expect(dialogIsClosed).toBeFalse()
    })

    function setInputValues(device: EventSubscriber) {
        component.labelValue = device.label;
        component.endpointValue = device.endpoint;
        component.eventValue = device.event;
        fixture.detectChanges();
    }

    it('should correctly load the values', () => {
        expect(component.labelValue).toBe(device2.label)
        expect(component.endpointValue).toBe(device2.endpoint)
        expect(component.eventValue).toBe(device2.event)
    })

    it('should return no device if no edits have been made', () => {
        confirmButton.dispatchEvent(new Event('click'));
        expect(dialogIsClosed).toBeTrue();
        expect(JSON.stringify(dialogClosedWith)).toBeUndefined()

    })

});

let dialogIsClosed: boolean;
let dialogClosedWith: EventSubscriber | undefined;

class DialogRefMock {
    close(res?: EventSubscriber) {
        dialogIsClosed = true;
        if (res) dialogClosedWith = res;
    }

}

class PopUpMock {
    show() {
    }
}
