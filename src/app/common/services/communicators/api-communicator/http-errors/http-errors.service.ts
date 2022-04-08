import {Injectable} from '@angular/core';

export interface HttpError {
    status: number,
    message: string
}

export interface HttpErrors {
    addNfcToken: HttpError[];
    getDevices: HttpError[];
    removeNfcToken: HttpError[];
    getCamUrl: HttpError[];
    userHasNfcToken: HttpError[];
    manuallySyncTags: HttpError[];
    login: HttpError[];
    removeDevice: HttpError[];
    logout: HttpError[];
    getUsernames: HttpError[];
    addPushSubscriber: HttpError[];
    addDevice: HttpError[];
    getLoggedIn: HttpError[];
    openDoor: HttpError[];
    default: HttpError[];
}

@Injectable({
    providedIn: 'root'
})
export class HttpErrorsService {

    private _errors: HttpErrors = {
        userHasNfcToken: [{
            status: 491,
            message: $localize`:@@NfcTags.CurrentTag.Error.UnknownUser:That users NFC Tag cannot be checked, as they do not exist!`
        }, {
            status: 486,
            message: $localize`:@@NfcTags.CurrentTag.Error.Unauthorized:You are not authorized to check this users NFC Tag!`
        }],
        addDevice: [{
            status: 490,
            message: $localize`:@@Devices.Add.Error.Incomplete:An invalid symbol was used, or a field was left blank!`
        }, {
            status: 486,
            message: $localize`:@@Devices.Add.Error.Unauthorized:You are not authorized to add a device!`
        }, {
            status: 482,
            message: $localize`:@@Devices.Add.Error.Duplicate:There already is a device with that endpoint!`
        }],
        addNfcToken: [{
            status: 490,
            message: $localize`:@@NfcTags.Add.Error.Invalid:The NFC Tag entered is not allowed!`
        }, {
            status: 486,
            message: $localize`:@@NfcTags.Add.Error.Unauthorized:You are not authorized to change this users NFC Tag!`
        }, {
            status: 491,
            message: $localize`:@@NfcTags.Add.Error.UserUnknown:That user doesn't exist!`
        }, {
            status: 560,
            message: $localize`:@@NfcTags.Add.Error.AddedButNotSynced:The NFC Token was saved in our database, but we were not able to send it to the door.`
        }],
        getCamUrl: [{
            status: 561,
            message: $localize`:@@Home.Stream.Error.Server:There was a problem connecting to the camera!`
        }],
        getDevices: [{
            status: 486,
            message: $localize`:@@Devices.List.Error.Unauthorized:You are not authorized to access the devices!`
        }],
        login: [{
            status: 470,
            message: $localize`:@@Login.Error.Incorrect:The entered username or password is incorrect!`
        }, {
            status: 490,
            message: $localize`:@@Login.Error.Incomplete:Either the username or password input is blank or invalid!`
        }],
        logout: [],
        openDoor: [{
            status: 560,
            message: $localize`:@@Home.Door.Error.Server:There was a problem connecting to the door!`
        }],
        removeDevice: [{
            status: 491,
            message: $localize`:@@Devices.Delete.Error.UnknownEndpoint:That device could not be deleted, it doesn't exist!`
        }],
        removeNfcToken: [{
            status: 486,
            message: $localize`:@@NfcTags.Remove.Error.Unauthorized:You are not allowed to remove that token!`
        }, {
            status: 491,
            message: $localize`:@@NfcTags.Remove.Error.UnknownUser:That user doesn't exist!`
        }, {
            status: 560,
            message: $localize`:@@NfcTags.Remove.Error.RemovedButNotSynced:The NFC Token was deleted in our database, but we were not able to delete it from the door.`
        }],
        getUsernames: [],
        getLoggedIn: [],
        addPushSubscriber: [],
        manuallySyncTags: [{
            status: 560,
            message: $localize`:@@Home.Door.Error.Server:There was a problem connecting to the door!`
        }],
        default: [{
            status: 485,
            message: $localize`:@@Error.SessionExpired:Your session has expired!`
        }, {
            status: 0,
            message: $localize`:@@Error.Connection:There was a problem connecting. Try again later!`
        }, {
            status: 470,
            message: $localize`:@@Error.Authentication:That password was incorrect!`
        }
        ]
    }

    get errors(): HttpErrors {
        return this._errors;
    }
}
