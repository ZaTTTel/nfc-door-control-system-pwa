import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {VideoSettingsService} from './video-settings.service';
import {VideoQuality} from "../../../../shared-utilities";
import {AppConfigService} from "../app-config/app-config.service";

describe('VideoSettingsService', () => {
    let service: VideoSettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AppConfigService, useClass: ConfigMock}
            ]
        });
        service = TestBed.inject(VideoSettingsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should toggle the video on focus change', fakeAsync(() => {
        expect(service.videoIsOff).toBe(startWithVideoOff);
        window.dispatchEvent(new Event('blur'));
        tick();
        expect(service.videoIsOff).toBeTrue();
        window.dispatchEvent(new Event('focus'));
        tick();
        expect(service.videoIsOff).toBeFalse();
    }))

    it('should be able to set and get the quality', () => {
        expect(service.quality).toBe(defaultQuality);
        service.quality = VideoQuality.SD;
        expect(service.quality).toBe(VideoQuality.SD);
        service.quality = VideoQuality.HD;
        expect(service.quality).toBe(VideoQuality.HD);
    })
});

let startWithVideoOff = false
let defaultQuality = VideoQuality.HD

class ConfigMock {
    get startWithVideoOff() {
        return startWithVideoOff;
    }

    get defaultStreamQuality() {
        return defaultQuality
    }

    get videoToggleOnFocus() {
        return true;
    }
}
