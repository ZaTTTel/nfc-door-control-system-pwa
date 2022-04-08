import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RtspVideoComponent} from './rtsp-video.component';
import {VideoQuality} from "../../../../../../../shared-utilities";
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";
import {LoggerService} from "../../../../../../common/services/logger/logger.service";
import {MatSpinner} from "@angular/material/progress-spinner";

import {Player} from "rtsp-relay/browser";


describe('RtspVideoComponent', () => {
    let component: RtspVideoComponent;
    let fixture: ComponentFixture<RtspVideoComponent>;

    let playerMock: PlayerMock

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                RtspVideoComponent,
                MatSpinner
            ],
            providers: [
                {provide: PopUpService, useClass: PopUpMock},
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: VideoSettingsService, useClass: VideoSettingsMock},
                {provide: LoggerService, useClass: LoggerMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RtspVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        allowGetCamUrl = true;
        playerMock = new PlayerMock();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class PopUpMock {
    show() {
    }
}

let allowGetCamUrl: boolean

class CommunicatorMock {
    getCamUrl() {
        if (allowGetCamUrl) {
            return Promise.resolve("https://This-is-the-cam-url")
        } else {
            return Promise.reject();
        }

    }
}

class VideoSettingsMock {
    get quality() {
        return VideoQuality.SD;
    }

    set videoIsOff(isOff: boolean) {
    }
}

class LoggerMock {
    log() {
    }
}

class PlayerMock implements Player {
    currentTime: number = 0;
    readonly paused: boolean = false;
    volume: number = 0;

    destroy(): void {
    }

    nextFrame(): void {
    }

    pause(): void {
    }

    play(): void {
    }

    stop(): void {
    }

}
