import {Injectable} from '@angular/core';
import {User} from "../../util-types/user/User";
import {LoggerService} from "../logger/logger.service";
import {LoginStatusService} from "../login-status/login-status.service";

@Injectable({
    providedIn: 'root'
})
/**
 * This service globally keeps track of the user that is currently being edited in the NFC-Token page
 * (Similarly to {@link LoginStatusService})
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class SwitchUserStatusService {

    /**
     * the following injections are required
     * @param _loginStatus to change the user being edited when the logged-in user changes
     * @param _logger to log the change of the active user
     */
    constructor(private _loginStatus: LoginStatusService,
                private _logger: LoggerService) {
        // as soon us the logged-in user changes, the edited user changes as well
        this._loginStatus.userObservable.subscribe(user => {
            this._user = user;
        })
    }

    /**
     * the user currently being edited
     * @private
     */
    private _user: User | undefined

    /**
     * gets the user currently being edited
     */
    get user(): User | undefined {
        return this._user;
    }

    /**
     * sets the user currently being edited
     * @param user the user being edited
     */
    setUser(user: User | undefined) {
        this._user = user;
        this._logger.log(`The current user being edited on the NFC-Token page has changed to ${user ? user.name : "undefined"}`)
    }
}
