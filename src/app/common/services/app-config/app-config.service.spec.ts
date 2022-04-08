import {TestBed} from '@angular/core/testing';

import {AppConfigService} from './app-config.service';
import {of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";


describe('AppConfigService', () => {
    let service: AppConfigService;

    beforeEach(() => {
        configJson = {
            "apiBaseUrl": "https://193.168.178.97:5000/api",
            "defaultStreamQuality": "HD",
            "startWithVideoOff": true,
            "videoToggleOnFocus": false,
            "streamAspectRatio": "56.25%",
            "tapStreamToOpenDoor": true,
            "tapStreamToToggleCam": false,
            "logging": {
                "console": false
            },
            "vapidPublicKey": "BM_zJWwukVPA6D0u10ZpbAXyve4_YvoUwrKEZOg29edIYMI6NDO8F8NW0E9tMd4nalthN1C8Q0avcql1bmgjl94",
            "notificationDuration": 500,
            "language": "de-DE"
        }
        allowGet = true;
    })

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useClass: HttpMock}
            ]
        });
        service = TestBed.inject(AppConfigService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly get all config attributes', () => {
        expect(service.apiBaseUrl).toBe(configJson.apiBaseUrl);
        expect(service.defaultStreamQuality).toBe(configJson.defaultStreamQuality);
        expect(service.startWithVideoOff).toBe(configJson.startWithVideoOff);
        expect(service.videoToggleOnFocus).toBe(configJson.videoToggleOnFocus);
        expect(service.streamAspectRatio).toBe(configJson.streamAspectRatio);
        expect(service.tapStreamToOpenDoor).toBe(configJson.tapStreamToOpenDoor);
        expect(service.tapStreamToToggleCam).toBe(configJson.tapStreamToToggleCam);
        expect(service.logToConsole).toBe(configJson.logging.console);
        expect(service.vapidPublicKey).toBe(configJson.vapidPublicKey);
        expect(+service.notificationDuration).toBe(+configJson.notificationDuration);
    })

    it('should throw an error when the attribute does not exist in the config.json', () => {
        configJson = {"something": "else"};
        service.loadAppConfig();
        expect(() => service.apiBaseUrl).toThrowError();
        expect(() => service.defaultStreamQuality).toThrowError();
        expect(() => service.startWithVideoOff).toThrowError();
        expect(() => service.videoToggleOnFocus).toThrowError();
        expect(() => service.streamAspectRatio).toThrowError();
        expect(() => service.tapStreamToOpenDoor).toThrowError();
        expect(() => service.tapStreamToToggleCam).toThrowError();
        expect(() => service.logToConsole).toThrowError();
        expect(() => service.vapidPublicKey).toThrowError();
        expect(() => service.notificationDuration).toThrowError();
    })
});

let configJson: any
let allowGet: boolean;

class HttpMock {
    get() {
        if (allowGet) {
            return of(configJson);
        } else {
            return throwError(() => "error message")
        }
    }
}
