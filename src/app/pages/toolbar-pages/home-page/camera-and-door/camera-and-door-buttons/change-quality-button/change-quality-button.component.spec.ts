import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeQualityButtonComponent} from './change-quality-button.component';
import {VideoQuality} from "../../../../../../../shared-utilities";
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('ChangeQualityButtonComponent', () => {
    let component: ChangeQualityButtonComponent;
    let fixture: ComponentFixture<ChangeQualityButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [ChangeQualityButtonComponent],
            providers: [
                {provide: VideoSettingsService, useClass: VideoSettingsMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeQualityButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button');

        quality = VideoQuality.SD;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to change the quality', () => {
        expect(quality).toBe(VideoQuality.SD);
        button.dispatchEvent(new Event('click'));
        expect(quality).toBe(VideoQuality.HD)
        button.dispatchEvent(new Event('click'));
        expect(quality).toBe(VideoQuality.SD)
    })
});

let quality: VideoQuality;

class VideoSettingsMock {
    get quality() {
        return quality;
    }

    set quality(q: VideoQuality) {
        quality = q;
    }

    set videoIsOff(o: boolean) {
    }
}
