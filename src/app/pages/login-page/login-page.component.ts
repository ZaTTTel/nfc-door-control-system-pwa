import {Component, ElementRef, ViewChild} from '@angular/core';
import {LoginInfo} from '../../../shared-utilities'
import {PageComponent} from "../PageComponent";
import {CommunicatorService} from "../../common/services/communicators/CommunicatorService";

import {PopUpService} from "../../common/services/pop-up/pop-up.service";
import {LoginStatusService} from "../../common/services/login-status/login-status.service";
import {User} from "../../common/util-types/user/User";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
/**
 * The page on which the user can enter their details and log in.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class LoginPageComponent implements PageComponent {

    /**
     * is true, when the communicator is currently working, and the loading-bar is displayed
     */
    isLoading = false;

    /**
     * The username text-field
     */
    @ViewChild('usernameInput') usernameInput!: ElementRef;
    /**
     * The password text-field
     */
    @ViewChild('passwordInput') passwordInput!: ElementRef;

    /**
     * Records weather the password is to be hidden, or displayed in plain text. Is used to toggle the passwords
     * visibility
     */
    hidePassword = true;

    /**
     * The following injectables are required:
     * @param _loginStatus to update logged-in status. This informs all other parts of the app.
     * @param _communicator to allow the login page to log in a user
     * @param _popUp to display (error-) messages to the user
     * something incorrectly
     */
    constructor(private _loginStatus: LoginStatusService,
                private _communicator: CommunicatorService,
                private _popUp: PopUpService) {
        this.attemptResumeSession();
    }

    /**
     * Is run when the login button is pressed
     */
    loginButtonHandler() {
        if (this.isLoading) {
            return;
        }
        const loginInfo = new LoginInfo(
            this.usernameInput.nativeElement.value, this.passwordInput.nativeElement.value
        );

        // get a promise from the communicator that the login is being processed
        const loginPromise = this._communicator.login(loginInfo);
        // execute the following when the promise is fulfilled/rejected:
        loginPromise.then(() => {
            this._loginStatus.setLoggedIn(new User(loginInfo.username))
            this.isLoading = false;
        }).catch(error => {
            this._popUp.show(error);
            this.isLoading = false;
        })
    }

    /**
     * This is run when the login page is opened, to check if the communicator thinks the user is logged in.
     * If they are, the login-status is set to that user
     */
    private attemptResumeSession() {
        this.isLoading = true;
        this._communicator.getLoggedIn().then(username => {
            if (username) {
                this._loginStatus.setLoggedIn(new User(username))
            }
            this.isLoading = false;
        }).catch(e => {
            this._popUp.show(e)
            this.isLoading = false;
        });
    }
}
