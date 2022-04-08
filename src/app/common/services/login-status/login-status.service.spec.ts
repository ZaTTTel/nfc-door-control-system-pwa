import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoginStatusService} from './login-status.service';
import {User} from "../../util-types/user/User";

describe('LoginStatusService', () => {
    let service: LoginStatusService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoginStatusService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to log a user out and in', fakeAsync(() => {
        let user = new User('alex')
        expect(service.user).toBeUndefined();
        service.setLoggedIn(user);
        expect(service.user).toBe(user);
        service.setLoggedOut();
        expect(service.user).toBeUndefined();
    }))

    it('should notify the userObservable when the user is changed', fakeAsync(() => {
        let arrived = false;
        service.userObservable.subscribe(user => {
            if (user?.name == "alex") {
                arrived = true;
            }
        })
        service.setLoggedIn(new User("alex"));
        tick();
        expect(arrived).toBeTrue()
    }))
});
