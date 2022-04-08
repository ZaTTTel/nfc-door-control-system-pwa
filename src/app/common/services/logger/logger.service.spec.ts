import {TestBed} from '@angular/core/testing';

import {LoggerService} from './logger.service';
import {AppConfigService} from "../app-config/app-config.service";

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: AppConfigService, useClass: ConfigMock}
            ]
        });
        service = TestBed.inject(LoggerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should log to console', () => {
        const logText = "log text";
        spyOn(console, 'log');
        service.log(logText);
        expect(console.log).toHaveBeenCalledWith(logText)
    })

    it('should warn to console', () => {
        const logText = "warn text";
        spyOn(console, 'warn');
        service.warn(logText);
        expect(console.warn).toHaveBeenCalledWith(logText)
    })
});

class ConfigMock {
    get logToConsole() {
        return true;
    }
}
