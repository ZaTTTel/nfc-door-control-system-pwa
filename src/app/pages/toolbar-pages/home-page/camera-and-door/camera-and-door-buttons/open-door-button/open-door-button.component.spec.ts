import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OpenDoorButtonComponent} from './open-door-button.component';
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {LoggerService} from "../../../../../../common/services/logger/logger.service";
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";

describe('OpenDoorButtonComponent', () => {
    let component: OpenDoorButtonComponent;
    let fixture: ComponentFixture<OpenDoorButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [
                OpenDoorButtonComponent,
                MatIcon
            ],
            providers: [
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: LoggerService, useClass: LoggerMock},
                {provide: PopUpService, useClass: PopUpMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenDoorButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button')

        doorHasOpened = false;
        disallowOpenDoor = false;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to open the door', () => {
        expect(doorHasOpened).toBeFalse();
        button.dispatchEvent(new Event('click'))
        expect(doorHasOpened).toBeTrue();
    })

    it("should not allow button presses when loading", () => {
        component.isLoading = true;
        button.dispatchEvent(new Event('click'))
        expect(doorHasOpened).toBeFalse();
    })

    it("should react to openDoor rejects correctly", () => {
        disallowOpenDoor = true;
        component.openDoor();
        expect(() => button.dispatchEvent(new Event('click'))).not.toThrowError();
    })
});

let doorHasOpened: boolean;
let disallowOpenDoor: boolean;

class CommunicatorMock {
    openDoor(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!disallowOpenDoor) {
                doorHasOpened = true;
                resolve();
            } else {
                reject();
            }
        })
    }
}

class LoggerMock {
    log() {
    }
}

class PopUpMock {
    show() {
    }
}
