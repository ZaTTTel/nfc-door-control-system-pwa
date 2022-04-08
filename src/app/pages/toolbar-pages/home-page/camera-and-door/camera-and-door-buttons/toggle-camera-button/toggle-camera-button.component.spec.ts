import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ToggleCameraButtonComponent} from './toggle-camera-button.component';
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AppConfigService} from "../../../../../../common/services/app-config/app-config.service";

describe('ToggleCameraButtonComponent', () => {
    let component: ToggleCameraButtonComponent;
    let fixture: ComponentFixture<ToggleCameraButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [
                ToggleCameraButtonComponent,
                MatIcon
            ],
            providers: [
                {provide: VideoSettingsService, useClass: VideoSettingsMock},
                {provide: AppConfigService, useClass: ConfigMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleCameraButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button')

        videoIsOff = false;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to toggle the camera', () => {
        expect(videoIsOff).toBeFalse();
        button.dispatchEvent(new Event('click'))
        expect(videoIsOff).toBeTrue();
        button.dispatchEvent(new Event('click'))
        expect(videoIsOff).toBeFalse();
    })

    it('should toggle the camera on blur and focus', fakeAsync(() => {
        expect(component.isDisabled).toBeFalse()
        window.dispatchEvent(new Event('blur'));
        tick(10000);
        expect(component.isDisabled).toBeTrue()
        window.dispatchEvent(new Event('focus'));
        tick(10000);
        expect(component.isDisabled).toBeFalse()
    }))
});

let videoIsOff: boolean

class VideoSettingsMock {
    get videoIsOff() {
        return videoIsOff;
    }

    set videoIsOff(isOff: boolean) {
        videoIsOff = isOff;
    }
}

class ConfigMock {
    get videoToggleOnFocus() {
        return true;
    }
}
