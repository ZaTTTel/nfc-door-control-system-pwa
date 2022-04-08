import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ApiCommunicatorService} from './api-communicator.service';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../../logger/logger.service";
import {SwPush} from "@angular/service-worker";
import {LoginStatusService} from "../../login-status/login-status.service";
import {AppConfigService} from "../../app-config/app-config.service";
import {InputPasswordDialogService} from "../../input-password-dialog/input-password-dialog.service";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "../../../util-types/user/User";
import {
    Event as EventTrigger,
    EventSubscriber,
    LoginInfo,
    NfcToken,
    VideoQuality
} from "../../../../../shared-utilities";
import {HttpError, HttpErrorsService} from "./http-errors/http-errors.service";

describe('ApiCommunicatorService', () => {
    let service: ApiCommunicatorService;
    let errorsService: HttpErrorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: HttpClient, useClass: HttpMock},
                {provide: LoggerService, useClass: LoggerMock},
                {provide: SwPush, useClass: SwPushMock},
                {provide: LoginStatusService, useClass: LoginStatusMock},
                {provide: AppConfigService, useClass: ConfigMock},
                {provide: InputPasswordDialogService, useClass: InputPasswordDialogMock},
                HttpErrorsService
            ]
        });
        service = TestBed.inject(ApiCommunicatorService);
        errorsService = TestBed.inject(HttpErrorsService);

        responseError = undefined;
        password = "password"
        allowReqSubscription = true;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('userHasNfcToken', () => {
        let func = () => service.userHasNfcToken("alex");

        it('should be able to check if the user has an nfc token', fakeAsync(() => {
            sendAndCheckResponse(func, {nfcToken: "tokenhash"}, true);
            expect(lastRequest).toEqual(`GET ${baseUrl}/users/alex/nfc-token`);
            expect(lastRequestBody).toEqual({});

            sendAndCheckResponse(func, {}, false)
            expect(lastRequest).toEqual(`GET ${baseUrl}/users/alex/nfc-token`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle userHasNfcToken errors', fakeAsync(() => {
            checkUnenteredPassword(func)
            // different error codes should return the correct error message
            responseSource.next({nfcToken: "tokenhash"});
            checkErrorMessages(func, errorsService.errors.userHasNfcToken);
        }))
    })

    describe('addDevice', () => {
        const device = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1");
        it('should be able to add a device', fakeAsync(() => {
            service.addDevice(device)
            responseSource.next({});
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/events/subscribers`);
            expect(lastRequestBody).toEqual({endpoint: device.endpoint, label: device.label, type: device.event});
        }))

        it('should handle addDevice errors', fakeAsync(() => {
            const func = () => service.addDevice(device);
            checkUnenteredPassword(func)
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.addDevice);
        }))
    })

    describe('addNfcToken', () => {
        const user = new User("alex");
        const token = new NfcToken("token1234")

        it('should be able to set a users nfc token', fakeAsync(() => {
            service.addNfcToken(user, token);
            responseSource.next({});
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/users/${user.name}/nfc-token`);
            expect(lastRequestBody).toEqual({nfcToken: token});
        }))

        it('should be able to convert tokens that contain semicolons', fakeAsync(() => {
            const tokenWithSemi = "semi:colon"
            const tokenWithoutSemi = "semicolon"
            service.addNfcToken(user, tokenWithSemi);
            responseSource.next({});
            tick()
            expect(lastRequestBody).toEqual({nfcToken: tokenWithoutSemi});
        }))

        it('should handle addNfcToken errors', fakeAsync(() => {
            const func = () => service.addNfcToken(user, token);
            checkUnenteredPassword(func)
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.addNfcToken);
        }))
    })

    describe('getCamUrl', () => {
        const quality = VideoQuality.HD;
        const func = () => service.getCamUrl(quality);

        it('should be able to get the url', fakeAsync(() => {
            sendAndCheckResponse(func, {url: "cam/url"}, "cam/url")
            expect(lastRequest).toEqual(`GET ${baseUrl}/camera/connection?quality=${quality}`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle addDevice errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.getCamUrl);
        }))
    })

    describe('getDevices', () => {
        const func = () => service.getDevices();

        it('should be able to get the devices', fakeAsync(() => {
            const actualDevices = [
                new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1"),
                new EventSubscriber("endp2", EventTrigger.DOOR_OPENED, "label2")
            ]
            sendAndCheckResponse(func, {eventSubscribers: actualDevices}, actualDevices);
            expect(lastRequest).toEqual(`GET ${baseUrl}/events/subscribers`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle addDevice errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.getDevices);

        }))
    })

    describe('login', () => {
        const info = new LoginInfo("alex", "test1234")
        const func = () => service.login(info);

        it('should be able to log in the user', fakeAsync(() => {
            service.login(info);
            responseSource.next({})
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/users/login`);
            expect(lastRequestBody).toEqual({username: info.username, password: info.password});
        }))

        it('should handle login errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.login);
        }))
    })

    describe('logout', () => {
        const func = () => service.logout();

        it('should be able to log out the user', fakeAsync(() => {
            service.logout();
            responseSource.next({})
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/users/logout`);
            expect(lastRequestBody).toEqual({});
        }))

        it('unauthorized error status should be no problem', fakeAsync(() => {
            responseError = {status: 485};
            sendAndCheckResponse(func, {}, undefined)

        }))

        it('should handle logout errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.logout)
        }))
    })

    describe('openDoor', () => {
        const func = () => service.openDoor();

        it('should be able to open the door', fakeAsync(() => {
            service.openDoor();
            responseSource.next({})
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/door/open`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle openDoor errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.openDoor);
        }))
    })

    describe('removeDevice', () => {
        const device = new EventSubscriber("endp1", EventTrigger.DOOR_OPENED, "label1");
        const func = () => service.removeDevice(device);

        it('should be able to remove a device', fakeAsync(() => {
            service.removeDevice(device);
            responseSource.next({})
            tick()
            expect(lastRequest).toEqual(`DELETE ${baseUrl}/events/subscribers`);
            expect(lastRequestBody).toEqual({endpoint: device.endpoint});
        }))

        it('should handle removeDevice errors', fakeAsync(() => {
            checkUnenteredPassword(func)
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.removeDevice);
        }))
    })

    describe('removeNfcToken', () => {
        const user = new User("alex");
        const func = () => service.removeNfcToken(user);

        it('should be able to remove a users token', fakeAsync(() => {
            service.removeNfcToken(user);
            responseSource.next({})
            tick()
            expect(lastRequest).toEqual(`DELETE ${baseUrl}/users/${user.name}/nfc-token`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle removeNfcToken errors', fakeAsync(() => {
            checkUnenteredPassword(func)
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.removeNfcToken);
        }))
    })

    describe('getUsernames', () => {
        const func = () => service.getUsernames();

        it('should be able to get the usernames', fakeAsync(() => {
            const actualUsernames = ["alex", "gregor", "lennart", "david", "tom"]
            sendAndCheckResponse(func, {usernames: actualUsernames}, actualUsernames);
            expect(lastRequest).toEqual(`GET ${baseUrl}/users`);
            expect(lastRequestBody).toEqual({});

            // should return an empty list if the user is unauthorized
            responseError = {status: 486};
            sendAndCheckResponse(func, {}, []);
            expect(lastRequest).toEqual(`GET ${baseUrl}/users`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle getUsernames errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.getUsernames)
        }))
    })

    describe('getLoggedIn', () => {
        const func = () => service.getLoggedIn();

        it('should be able to get currently logged in user', fakeAsync(() => {
            const actualUsername = "alex";
            sendAndCheckResponse(func, {username: actualUsername}, actualUsername);
            expect(lastRequest).toEqual(`GET ${baseUrl}/users/login`);
            expect(lastRequestBody).toEqual({});

            // should return undefined if no user is signed in
            responseError = {status: 485};
            sendAndCheckResponse(func, {}, undefined);
            expect(lastRequest).toEqual(`GET ${baseUrl}/users/login`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle getLoggedIn errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.getLoggedIn)
        }))
    })

    describe('addPushSubscriber', () => {
        const func = () => service.addPushSubscriber();

        it('should be able to add a push subscriber', fakeAsync(() => {
            service.addPushSubscriber()
            expect(lastVapidPublicKey).toEqual(vpk);
            tick()
            expect(lastRequest).toEqual(`POST ${baseUrl}/push/subscription`);
            expect(lastRequestBody).toEqual(undefined);
        }))

        it('should handle requestSubscription rejects', () => {
            allowReqSubscription = false;
            service.addPushSubscriber().then(() => expect(true).toBeFalse()).catch(() => {
            })
            expect().nothing();
        })

        it('should handle addPushSubscriber errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.addPushSubscriber)
        }))
    })

    describe('manuallySyncTags', () => {
        const func = () => service.manuallySyncTags();

        it('should be able to synchronize the tags', fakeAsync(() => {
            service.manuallySyncTags()
            expect(lastRequest).toEqual(`POST ${baseUrl}/door/refresh`);
            expect(lastRequestBody).toEqual({});
        }))

        it('should handle addPushSubscriber errors', fakeAsync(() => {
            // different error codes should return the correct error message
            checkErrorMessages(func, errorsService.errors.manuallySyncTags);
        }))
    })

    function checkUnenteredPassword(func: () => (Promise<any>)) {
        // unentered password should work
        password = undefined;
        responseError = undefined;
        func().catch(e => {
            expect(e).toBeUndefined()
        })
        tick()
        password = "password"
    }

    function checkErrorMessages(func: () => (Promise<any>), errors: HttpError[]) {
        let checkedStatus: number[] = [];
        errors.forEach(error => {
            sendAndCheckErrorResponse(func, error);
            checkedStatus.push(error.status);
        })
        tick();
        errorsService.errors.default.forEach(error => {
            // if this status has been covered by the above foreach loop
            if (checkedStatus.findIndex(e => e == error.status) < 0) {
                sendAndCheckErrorResponse(func, error);
            }
        })
    }

    function sendAndCheckResponse(func: () => (Promise<any>), responseBody: any, expectedReturn: any) {
        responseSource.next(responseBody);
        func().then(res => {
                expect(res).toEqual(expectedReturn);
            }
        )
        tick()
    }

    function sendAndCheckErrorResponse(func: () => (Promise<any>), error: HttpError) {
        responseError = {status: error.status};
        func().catch(e => {
            expect(e).toEqual(error.message)
        })
        tick()
    }
});

let lastRequest: string;
let lastRequestBody: any;
let lastRequestOptions: any;
let responseSource = new BehaviorSubject<any>(undefined)
let responseError: { status: number } | undefined;

class HttpMock {
    get<T>(url: string, options: any) {
        if (responseError) {
            return throwError(() => responseError);
        }
        lastRequest = "GET " + url;
        lastRequestBody = {};
        if (options.hasOwnProperty("body")) {
            lastRequestBody = options.body;
        }
        lastRequestOptions = options;
        return responseSource.asObservable();
    }

    post(url: string, body: any, options: any) {
        if (responseError) {
            return throwError(() => responseError);
        }
        lastRequest = "POST " + url;
        lastRequestBody = body;
        lastRequestOptions = options;
        return responseSource.asObservable();
    }

    delete(url: string, options: any) {
        if (responseError) {
            return throwError(() => responseError);
        }
        lastRequest = "DELETE " + url;
        lastRequestBody = {};
        if (options.hasOwnProperty("body")) {
            lastRequestBody = options.body;
        }
        lastRequestOptions = options;
        return responseSource.asObservable();
    }
}

class LoggerMock {
    log() {
    }
}

let lastVapidPublicKey: string
let allowReqSubscription: boolean

class SwPushMock {
    requestSubscription(options: { serverPublicKey: string }) {
        if (allowReqSubscription) {
            lastVapidPublicKey = options.serverPublicKey;
            return Promise.resolve()
        } else {
            return Promise.reject()
        }
    }
}

class LoginStatusMock {
    get user() {
        return new User("alex");
    }

    setLoggedOut() {

    }
}

let baseUrl = "ip:port/api";
let vpk = "vApIdPubliCKey"

class ConfigMock {
    get apiBaseUrl() {
        return baseUrl;
    }

    get vapidPublicKey() {
        return vpk
    }
}

let password: string | undefined;

class InputPasswordDialogMock {
    open() {
        return Promise.resolve(password)
    }
}
