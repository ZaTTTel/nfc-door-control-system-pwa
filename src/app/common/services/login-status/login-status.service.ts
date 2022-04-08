import {Injectable} from '@angular/core';
import {User} from "../../util-types/user/User";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
/**
 * This Service globally keeps track of the user that is currently logged in. It is used all over the app, to get
 * and set the currently logged-in user.
 *
 * Observables can be subscribed to, and notify subscribers of changes.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class LoginStatusService extends EventTarget {

    /**
     * keeps track of the current user
     * @private
     */
    private _userSource = new BehaviorSubject<User | undefined>(undefined)

    constructor() {
        super()

        //todo del:
        // this.setLoggedIn(new User("alex"))
    }

    /**
     * notifies subscribers when the current user has changed
     * @private
     */
    private _userObservable = this._userSource.asObservable();

    /**
     * gets an observable, that notifies subscribers when the user changes
     */
    get userObservable(): Observable<User | undefined> {
        return this._userObservable;
    }

    /**
     * gets the currently logged-in user
     */
    get user(): User | undefined {
        return this._userSource.value;
    }

    /**
     * Sets the currently logged-in user. This should be done by the login page
     * @param user the user being logged in
     */
    setLoggedIn(user: User) {
        this._userSource.next(user);
    }

    /**
     * Sets the attributes to undefined, logging out the user
     */
    setLoggedOut() {
        this._userSource.next(undefined);
    }

}
