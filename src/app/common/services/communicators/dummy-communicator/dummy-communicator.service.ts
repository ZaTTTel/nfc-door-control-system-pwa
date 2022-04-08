/* istanbul ignore file */
import {
    Event,
    EventSubscriber,
    LoginInfo,
    NfcToken,
    Password,
    Url,
    Username,
    VideoQuality
} from "../../../../../shared-utilities";
import {User} from "../../../util-types/user/User";
import {Injectable} from "@angular/core";
import {OnlineStatusService, OnlineStatusType} from "ngx-online-status";
import {CommunicatorService} from "../CommunicatorService";
import {LoggerService} from "../../logger/logger.service";

interface UserDetails {
    user: User,
    password: Password,
    nfcToken?: NfcToken
}

@Injectable({
    providedIn: 'root'
})
export class DummyCommunicatorService implements CommunicatorService {


    delay = 1000;

    private users: UserDetails[] = [
        {user: new User("alex"), password: "abc", nfcToken: "nf:cu:id"},
        {user: new User("zatttel"), password: "def"}
    ]

    private loggedInUser: User | undefined;

    private devices: Array<EventSubscriber> = [
        new EventSubscriber("000.000.000.2451/lol", Event.DOOR_OPENED, "Device One"),
        new EventSubscriber("35.2.000.000.075/awd", Event.BELL_RUNG, "Device Two"),
        new EventSubscriber("35.2.000.000.075/sef", Event.BELL_RUNG, "Device Three"),
        new EventSubscriber("35.2.000.000.075/drg", Event.BELL_RUNG, "Device Four")
    ];
    private camIsOn: boolean = false;

    private _isOffline: boolean = false;

    constructor(private _onlineStatus: OnlineStatusService,
                private _logger: LoggerService) {
        this._onlineStatus.status.subscribe((status: OnlineStatusType) => {
            // Retrieve Online status Type
            this._isOffline = (status == 0);
        });
    }

    addDevice(device: EventSubscriber): Promise<void> {
        return new Promise((resolve) => {
                this.devices.push(device);
                this._logger.log(`Device added: ${device.label} Current Devices: ${this.devicesToString()}`)
                setTimeout(() => {
                    resolve();
                }, this.delay);
            }
        )
    }

    addNfcToken(user: User, nfcToken: NfcToken): Promise<void> {
        return new Promise((resolve, reject) => {
                const userDetails = this.users.find(e => e.user.name === user.name);
                if (userDetails) {
                    userDetails.nfcToken = nfcToken;
                    this._logger.log(`Added the NFC-Token ${nfcToken} to the user ${user.name}`)
                    setTimeout(() => {
                        resolve();
                    }, this.delay);
                } else {
                    reject("The user was not recognized.")
                }
            }
        )
    }

    getCamUrl(): Promise<Url> {
        return new Promise((resolve) => {
                this.camIsOn = true;
                this._logger.log("Camera connected");
                setTimeout(() => {
                    resolve("");
                }, this.delay / 3);
            }
        )
    }

    getDevices(): Promise<Array<EventSubscriber>> {
        return new Promise((resolve) => {
                let m = `Following devices were gotten: ${this.devicesToString()}`;
                this._logger.log(m)
                const clonedDevices: EventSubscriber[] = [];
                this.devices.forEach(device => clonedDevices.push(device))
                setTimeout(() => {
                    resolve(clonedDevices);
                }, this.delay / 2);
            }
        )

    }

    login(info: LoginInfo): Promise<void> {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (this._isOffline) {
                        reject("There was a connection error. Please try again later")
                    }

                    if (info.username.length == 0) {
                        reject("Username cannot be empty");
                    }
                    if (info.password.length == 0) {
                        reject("Password cannot be empty");
                    }

                    const userDetails = this.users.find(e => e.user.name === info.username);
                    if (userDetails) {
                        if (info.password === userDetails.password) {
                            this.loggedInUser = userDetails.user;
                            this._logger.log(`User ${info.username} logged in.`)
                            resolve();
                        } else {
                            this._logger.log(`User ${info.username} could not be logged in, the password is incorrect.`)
                            reject("The password is incorrect!");
                        }
                    } else {
                        reject("The username entered was not recognized");
                    }
                }, this.delay / 3);
            }
        )

    }

    logout(): Promise<void> {
        return new Promise((resolve) => {
                setTimeout(() => {
                    this.loggedInUser = undefined;
                    this._logger.log("User logged out")
                    resolve();
                }, this.delay);
            }
        )
    }

    openDoor(): Promise<void> {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (this._isOffline) {
                        reject("There was a connection error. Please try again later")
                    }

                    this._logger.log("Door has been opened")
                    resolve();
                }, this.delay);
            }
        )
    }

    removeDevice(device: EventSubscriber): Promise<void> {
        return new Promise((resolve, reject) => {
                reject("lol");//del
                setTimeout(() => {
                    const i = this.devices.indexOf(device, 0);
                    if (i > -1) {
                        this.devices.splice(i, 1);
                        this._logger.log(`Device ${device.label} was deleted. Current devices: ${this.devicesToString()}`)
                        resolve();
                    } else {
                        reject("no such device ")
                    }
                }, this.delay / 2);
            }
        )

    }

    removeNfcToken(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let userDetails = this.users.find(e => e.user.name === user.name)
                    if (userDetails) {
                        userDetails.nfcToken = undefined;
                        resolve();
                    } else {
                        reject("User not found.")
                    }
                }, this.delay);
            }
        )
    }

    getUsernames(): Promise<Array<Username>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const names = this.users.map((userDetails) => userDetails.user.name);
                resolve(names);
            }, this.delay);
        })
    }

    userHasNfcToken(username: Username): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let userDetails = this.users.find(e => e.user.name === username)
                if (userDetails) {
                    resolve(!!userDetails.nfcToken)
                } else {
                    reject("Could not find the requested user when getting their NFC-Token status.")
                }
            }, this.delay)
        })
    }

    getLoggedIn(): Promise<Username | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.loggedInUser?.name);
            }, this.delay / 3)
        })
    }

    addPushSubscriber(): Promise<PushSubscription> {
        console.log("The dummy communicator was told to add a push notification subscriber, but it is a dummy so" +
            " nothing happened.")
        return Promise.resolve(PushSubscription.prototype);

    }

    manuallySyncTags(): Promise<void> {
        return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, this.delay / 2);
            }
        )
    }

    private devicesToString(): string {
        let m = "";
        for (let d of this.devices) {
            m += d.label + ", "
        }
        return m;
    }

}
