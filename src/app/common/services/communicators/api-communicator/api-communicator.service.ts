import {Injectable} from '@angular/core';
import {
    EventSubscriber,
    LoginInfo,
    NfcToken,
    Password,
    Url,
    Username,
    VideoQuality
} from '../../../../../shared-utilities';
import {CommunicatorService} from "../CommunicatorService";
import {User} from "../../../util-types/user/User";

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoggerService} from "../../logger/logger.service";
import {LoginStatusService} from "../../login-status/login-status.service";
import {AppConfigService} from '../../app-config/app-config.service';
import {SwPush} from "@angular/service-worker";
import {InputPasswordDialogService} from "../../input-password-dialog/input-password-dialog.service";
import {HttpErrorsService} from "./http-errors/http-errors.service";

@Injectable({
    providedIn: 'root'
})
/**
 * An injectable service that allows the communication with the midware using the rest api
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ApiCommunicatorService implements CommunicatorService {

    /**
     * is true, when a promise that hasn't rejected yet is currently running.
     * Is used to make sure that only one request will be made at a time in {@link createPromise}
     * @private
     */
    private isBusy = false;

    // the beginning of the url to which the requests are sent
    private readonly BASE_URL;
    /**
     * These headers need to be sent with every request that need authentication. If the authorization value has not
     * yet been set, the user is queried for a password. This value is also set when the user logs in.
     * @private
     */
    private HEADERS = {'Content-Type': 'application/json', 'Authorization': ''};
    // the options included in every request
    private OPTIONS = {
        headers: new HttpHeaders(this.HEADERS),
        withCredentials: true,
        credentials: 'same-origin'
    }

    /**
     * The following injectables are required:
     * @param _http the make the request
     * @param _logger to log the results
     * @param _swPush to subscribe to push notifications
     * @param _loginStatus to log out a user if their session has expired
     * @param _config to get the api base url
     * @param _inputPasswordDialog to get the users' password for critical operations
     * @param _errors to get the correct errors with their messages
     */
    constructor(private _http: HttpClient,
                private _logger: LoggerService,
                private _swPush: SwPush,
                private _loginStatus: LoginStatusService,
                private _config: AppConfigService,
                private _inputPasswordDialog: InputPasswordDialogService,
                private _errors: HttpErrorsService) {
        this.BASE_URL = _config.apiBaseUrl;
    }

    /**
     * Checks if a user has a NFC-Token.
     * @param username the user to check
     */
    userHasNfcToken(username: Username): Promise<boolean> {
        const url = this.BASE_URL + `/users/${username}/nfc-token`;
        return this.createPromise<boolean>((resolve, reject) => {
            // check if the user has entered a password since reloading. If not, prompt the user for the password
            this.checkAuthorization().then(() => {
                this._http.get<{ nfcToken: NfcToken }>(url, this.OPTIONS).subscribe({
                    next: response => {
                        const hasToken = response.nfcToken != undefined;
                        this._logger.log(hasToken ? `The user '${username}' has an NFC-Tag assigned.` :
                            `The user '${username}' doesn't have an NFC-Tag assigned.`)
                        resolve(hasToken);
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.userHasNfcToken, reject)
                    }
                })
            }).catch(() => reject())
        }, false)
    }

    /**
     * Adds a device to the system.
     * @param device the device to be added
     */
    addDevice(device: EventSubscriber): Promise<void> {
        const body = {"endpoint": device.endpoint, "label": device.label, "type": device.event};
        const url = this.BASE_URL + "/events/subscribers"

        return this.createPromise<void>((resolve, reject) => {
            this.checkAuthorization().then(() => {
                this._http.post(url, body, this.OPTIONS).subscribe({
                    next: () => {
                        this._logger.log(`The device ${device.label} has been added!`)
                        resolve();
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.addDevice, reject)
                    }
                })
            }).catch(() => reject())
        }, false)
    }

    /**
     * Sets the NFC Tag of a specific user
     * @param user the user whose NFC-Token will be edited
     * @param nfcToken the new NFC-Token
     */
    addNfcToken(user: User, nfcToken: NfcToken): Promise<void> {
        while (nfcToken.includes(":")) {
            nfcToken = nfcToken.replace(":", "");
        }
        nfcToken = nfcToken.toLowerCase()

        const body = {nfcToken: nfcToken};
        const url = this.BASE_URL + `/users/${user.name}/nfc-token`

        return this.createPromise<void>((resolve, reject) => {
            this.checkAuthorization().then(() => {
                this._http.post(url, body, this.OPTIONS).subscribe({
                    next: () => {
                        this._logger.log(`The user ${user.name}s NFC-Token has been set to ${body.nfcToken}!`)
                        resolve();
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.addNfcToken, reject)
                    }
                })
            }).catch(() => reject())
        }, false)
    }

    /**
     * Gets the url needed to display the livestream
     */
    getCamUrl(quality: VideoQuality): Promise<Url> {
        const url = this.BASE_URL + `/camera/connection?quality=${quality}`

        return this.createPromise<Url>((resolve, reject) => {
            this._http.get<{ url: Url }>(url, this.OPTIONS).subscribe({
                next: response => {
                    const devices: Url = response.url;
                    this._logger.log(`The camera URL was gotten!`)
                    resolve(devices);
                },
                error: e => {
                    this.handleErrorStatus(e, this._errors.errors.getCamUrl, reject)
                }
            })
        }, true)
    }

    /**
     * Gets a list of all devices
     */
    getDevices(): Promise<Array<EventSubscriber>> {
        const url = this.BASE_URL + "/events/subscribers"

        return this.createPromise<EventSubscriber[]>((resolve, reject) => {
            this._http.get<{ eventSubscribers: EventSubscriber[] }>(url, this.OPTIONS).subscribe({
                next: response => {
                    const devices: EventSubscriber[] = response.eventSubscribers;
                    this._logger.log(`The devices ${devices}s have been gotten!`)
                    resolve(devices);
                },
                error: e => {
                    this.handleErrorStatus(e, this._errors.errors.getDevices, reject)
                }
            })
        }, true)
    }

    /**
     * Logs in a user
     * @param info the user-info to use for the login
     */
    login(info: LoginInfo): Promise<void> {
        const url = this.BASE_URL + "/users/login"
        const body = {username: info.username, password: info.password}

        return this.createPromise<void>((resolve, reject) => {
            this._http.post(url, body, this.OPTIONS).subscribe({
                next: () => {
                    this._logger.log(`The user ${body.username} has been logged in!`);
                    this.setPassword(info.password, info.username);
                    resolve();
                },
                error: e => {
                    this.handleErrorStatus(e, this._errors.errors.login, reject)
                }
            })
        }, true)
    }

    /**
     * Logs out the user
     */
    logout(): Promise<void> {
        const url = this.BASE_URL + "/users/logout"

        return this.createPromise((resolve, reject) => {
            this._http.post(url, {}, this.OPTIONS).subscribe({
                next: () => {
                    this._logger.log(`The user has been logged out!`)
                    this.setAuthorization("");
                    resolve();
                },
                error: (e: HttpErrorResponse) => {
                    if (e.status == 485) {
                        resolve();
                        return;
                    }
                    this.handleErrorStatus(e, this._errors.errors.logout, reject)
                }
            })
        }, false)
    }

    /**
     * sends a signal to open the door
     */
    openDoor(): Promise<void> {
        const url = this.BASE_URL + "/door/open";

        return this.createPromise<void>((resolve, reject) => {
            this._http.post(url, {}, this.OPTIONS).subscribe({
                next: () => {
                    this._logger.log(`The door has been opened!`)
                    resolve();
                },
                error: e => {
                    this.handleErrorStatus(e, this._errors.errors.openDoor, reject)
                }
            })
        }, false);
    }

    /**
     * Removes a device from the system
     * @param device the device to remove
     */
    removeDevice(device: EventSubscriber): Promise<void> {
        const url = this.BASE_URL + "/events/subscribers";
        const body = {endpoint: device.endpoint};

        return this.createPromise<void>((resolve, reject) => {
            this.checkAuthorization().then(() => {
                const options = this.OPTIONS;
                (options as any).body = body;
                this._http.delete(url, options).subscribe({
                    next: () => {
                        this._logger.log(`The device ${device.label} has been removed.`)
                        resolve();
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.removeDevice, reject)
                    }
                })
            }).catch(() => reject())
        }, false);
    }

    /**
     * deletes the users current NFC tag
     * @param user the user whose tag will be deleted
     */
    removeNfcToken(user: User): Promise<void> {
        const url = this.BASE_URL + `/users/${user.name}/nfc-token`;

        return this.createPromise<void>((resolve, reject) => {
            this.checkAuthorization().then(() => {
                this._http.delete(url, this.OPTIONS).subscribe({
                    next: () => {
                        this._logger.log(`The user ${user.name}s nfc tag has been removed.`)
                        resolve();
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.removeNfcToken, reject)
                    }
                })
            }).catch(() => reject())
        }, false)
    }

    /**
     * gets a list of all usernames
     */
    getUsernames(): Promise<Array<Username>> {
        const url = this.BASE_URL + "/users";
        return this.createPromise<Username[]>((resolve, reject) => {
            this._http.get<{ usernames: Username[] }>(url, this.OPTIONS).subscribe({
                next: response => {
                    const usernames = response.usernames;
                    this._logger.log(`The usernames [${usernames}] have been gotten.`)
                    resolve(usernames);
                },
                error: e => {
                    if (e.status == 486) {
                        resolve([]);
                    }
                    this.handleErrorStatus(e, this._errors.errors.getUsernames, reject)
                }
            });
        }, true)
    }

    /**
     * Gets the user that is currently logged in if there is one. If there is no user logged in, the promise returns
     * undefined
     */
    getLoggedIn(): Promise<Username | undefined> {
        const url = this.BASE_URL + "/users/login";

        return this.createPromise<Username | undefined>((resolve, reject) => {
            this._http.get<{ username: string }>(url, this.OPTIONS).subscribe({
                next: response => {
                    const username = response.username;
                    this._logger.log(`The user ${username} has been gotten.`)
                    resolve(username);
                },
                error: e => {
                    if (e.status == 485) {
                        this._logger.log(`There is no user signed in.`)
                        resolve(undefined);
                        return;
                    }
                    this.handleErrorStatus(e, this._errors.errors.getLoggedIn, reject)
                }
            });
        }, true)
    }

    /**
     * Sends a request to subscribe to notifications using the Vapid Public Key. This returns a
     * {@link PushSubscription} object, which is sent to the midware.
     */
    addPushSubscriber(): Promise<PushSubscription> {
        const url = this.BASE_URL + "/push/subscription";
        return this.createPromise((resolve, reject) => {
            // subscribe to notifications on the firebase server
            this._swPush.requestSubscription({
                serverPublicKey: this._config.vapidPublicKey
            }).then(sub => {
                // subscribe to notifications on the midware
                this._http.post(url, sub, this.OPTIONS).subscribe({
                    next: () => {
                        this._logger.log(`A push subscription has been added`)
                        resolve(sub);
                    },
                    error: e => {
                        this.handleErrorStatus(e, this._errors.errors.addPushSubscriber, reject)
                    }
                });
            }).catch(() => reject("Could not subscribe to notifications!"));
        }, true)
    }

    /**
     * Sends a signal to synchronize the Nfc tokens in the database with the tokens on the door-microcontroller
     */
    manuallySyncTags(): Promise<void> {
        const url = this.BASE_URL + "/door/refresh";

        return this.createPromise<void>((resolve, reject) => {
            this._http.post(url, {}, this.OPTIONS).subscribe({
                next: () => {
                    this._logger.log(`Tags have been synchronized!`)
                    resolve();
                },
                error: e => {
                    this.handleErrorStatus(e, this._errors.errors.manuallySyncTags, reject)
                }
            })
        }, false);
    }

    /**
     * Creates the promise that performs a specific task using specific resolve and reject functions.
     *
     * If parallel is false, then the following is done as well:
     * Before the promise is created, if {@link isBusy} is true, a rejecting promise is returned with a message
     * explaining the problem. If not, {@link isBusy} is set to true, until the promise resolves or rejects.
     *
     * @param executor the function used to create the promise.
     * @param parallel is false, if the promise should reject if isBUsy is true.
     * @private
     */
    private createPromise<T>(executor: (resolve: (x: T) => void, reject: (m?: string) => void) => void, parallel: boolean) {
        if (!parallel && this.isBusy) {
            return Promise.reject($localize`:@@Error.Busy:We are currently working on another request, try again in a second or two!`)
        }
        this.isBusy = parallel ? this.isBusy : true;
        const promise = new Promise<T>(executor);
        if (parallel) {
            return promise;
        }
        promise.then(() => {
            this.isBusy = false;
        }).catch(() => {
            this.isBusy = false;
        })
        return promise;
    }

    /**
     * Check if the authorization header has already been set. If not, get the user to enter the password again
     * @private
     */
    private checkAuthorization(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.HEADERS.Authorization == "") {
                this._inputPasswordDialog.open().then(pw => {
                    if (!pw) {
                        reject()
                        return;
                    }
                    this.setPassword(pw);
                    resolve();
                })
            } else {
                resolve();
            }
        })
    }

    private setPassword(pw: Password, un: Username = this._loginStatus.user!.name) {
        this.setAuthorization('Basic ' + btoa(`${un}:${pw}`));
    }

    private setAuthorization(hashed: string) {
        this.HEADERS.Authorization = hashed
        this.OPTIONS.headers = new HttpHeaders(this.HEADERS);
    }

    /**
     * This method accepts an {@link HttpErrorResponse} and a list of tuples containing a status and its message.
     * The correct error message is found using the status in the {@link HttpErrorResponse}, and is then inputted
     * into the input reject function.
     *
     * If no given error status matches the one in the {@link HttpErrorResponse}, the default error cases are
     * checked in {@link defaultErrorResponseHandler}.
     *
     * @param e the HttpErrorResponse containing the status
     * @param errors the list of error messages with their statuses
     * @param reject the function that is called with the found error message as input. This would be the returned
     * promises reject function
     * @private
     */
    private handleErrorStatus(e: HttpErrorResponse, errors: { status: number, message: string }[], reject: (m: string) => void) {
        errors.forEach(error => {
            if (error.status == e.status) {
                reject(error.message);
            }
        })

        this.defaultErrorResponseHandler(e, reject);
    }

    /**
     * This method should check the responses' error code, and reject the promise with a generic error message.
     *
     * if the error code is 485, that means that the users' session has expired. The user is logged out.
     *
     * @param e the error response to check
     * @param rej the reject function to call back to (ideally the reject function of the promise)
     * @private
     */
    private defaultErrorResponseHandler(e: HttpErrorResponse, rej: (m: string) => void) {
        if (e.status == 485) {
            this.setAuthorization("");
            this._loginStatus.setLoggedOut();
        }
        if (e.status == 470) {
            this.setAuthorization("");
        }
        this._errors.errors.default.forEach(error => {
            if (error.status == e.status) {
                rej(error.message);
                return;
            }
        })
        rej($localize`:@@Error.Unknown:There was an unknown error.`)
    }
}
