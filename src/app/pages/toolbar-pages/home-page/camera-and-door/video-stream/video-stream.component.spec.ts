import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VideoStreamComponent} from './video-stream.component';
import {VideoSettingsService} from "../../../../../common/services/video-settings/video-settings.service";
import {Component, Input} from "@angular/core";

describe('VideoStreamComponent', () => {
    let component: VideoStreamComponent;
    let fixture: ComponentFixture<VideoStreamComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                VideoStreamComponent,
                RtspVideoStub
            ],
            providers: [
                {provide: VideoSettingsService, useClass: VideoSettingsMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VideoStreamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class VideoSettingsMock {
    get videoIsOff() {
        return false;
    }
}

@Component({selector: 'app-rtsp-video', template: ''})
class RtspVideoStub {
    @Input() isVisible = false;
}
