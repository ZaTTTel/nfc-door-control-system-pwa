import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CameraAndDoorComponent} from './camera-and-door.component';
import {Component} from "@angular/core";
import {VideoSettingsService} from "../../../../common/services/video-settings/video-settings.service";
import {AppConfigService} from "../../../../common/services/app-config/app-config.service";
import {MatRippleModule} from "@angular/material/core";

describe('CameraAndDoorComponent', () => {
    let component: CameraAndDoorComponent;
    let fixture: ComponentFixture<CameraAndDoorComponent>;

    let stream: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatRippleModule
            ],
            declarations: [
                CameraAndDoorComponent,
                VideoStreamStub,
                DoorButtonStub,
                QualityButtonStub,
                FullscreenButtonStub,
                CameraButtonStub
            ],
            providers: [
                {provide: VideoSettingsService, useClass: VideoSettingsMock},
                {provide: AppConfigService, useClass: ConfigMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CameraAndDoorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        stream = fixture.nativeElement.querySelectorAll('div')[1]

        doorHasBeenOpened = false;
        camHasBeenToggled = false;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle a stream click', fakeAsync(() => {
        stream.dispatchEvent(new Event('click'))
        tick()
        expect(doorHasBeenOpened).toBeTrue();
        expect(camHasBeenToggled).toBeTrue();
    }))
});

class ConfigMock {
    get streamAspectRatio() {
        return "56.25%";
    }

    get tapStreamToOpenDoor() {
        return true;
    }

    get tapStreamToToggleCam() {
        return true;
    }

    loadAppConfig() {
    }
}

class VideoSettingsMock {
    get videoIsOff() {
        return false;
    }
}

@Component({selector: 'app-video-stream', template: ''})
class VideoStreamStub {
}

let doorHasBeenOpened: boolean;

@Component({selector: 'app-open-door-button', template: ''})
class DoorButtonStub {
    openDoor() {
        doorHasBeenOpened = true;
    }
}

let camHasBeenToggled: boolean;

@Component({selector: 'app-toggle-camera-button', template: ''})
class CameraButtonStub {
    toggleCamera() {
        camHasBeenToggled = true;
    }
}

@Component({selector: 'app-change-quality-button', template: ''})
class QualityButtonStub {
}

@Component({selector: 'app-fullscreen-button', template: ''})
class FullscreenButtonStub {
}
