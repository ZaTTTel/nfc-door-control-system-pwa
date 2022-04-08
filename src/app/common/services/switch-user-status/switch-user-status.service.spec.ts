import {TestBed} from '@angular/core/testing';

import {SwitchUserStatusService} from './switch-user-status.service';
import {BehaviorSubject} from "rxjs";
import {User} from "../../util-types/user/User";
import {LoginStatusService} from "../login-status/login-status.service";
import {LoggerService} from "../logger/logger.service";

describe('SwitchUserStatusService', () => {
    let service: SwitchUserStatusService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: LoginStatusService, useClass: LoginStatusMock},
                {provide: LoggerService, useClass: LoggerMock}
            ]
        });
        service = TestBed.inject(SwitchUserStatusService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to get and set the user', () => {
        const user = new User("alex");
        expect(service.user).toBeUndefined()
        service.setUser(user);
        expect(service.user).toBe(user);
        service.setUser(undefined);
        expect(service.user).toBeUndefined()
    })
});

let userSource = new BehaviorSubject<User | undefined>(undefined);

class LoginStatusMock {
    get userObservable() {
        return userSource.asObservable();
    }
}

class LoggerMock {
    log() {
    }
}
