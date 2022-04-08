import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginStatusService} from "../../../common/services/login-status/login-status.service";
import {CommunicatorService} from "../../../common/services/communicators/CommunicatorService";
import {PopUpService} from "../../../common/services/pop-up/pop-up.service";
import {HelpDialogService} from "../../../common/services/help-dialog/help-dialog.service";

@Component({
    selector: 'app-side-nav-content',
    templateUrl: './side-nav-content.component.html',
    styleUrls: ['./side-nav-content.component.css']
})
/**
 * Contains the content displayed in the material sidenav. This includes a list of toolbared pages as well as a "log
 * off" page.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class SideNavContentComponent {

    /**
     * A list of strings representing the toolbar page names displayed
     */
    @Input() toolbarPagesTitles: string[] = [];

    /**
     * Emits the index of the page clicked, if a toolbar-page item has been clicked
     */
    @Output() onItemClick = new EventEmitter<number>()
    /**
     * Emits when the logout item has been clicked
     */
    @Output() onLogoutClick = new EventEmitter();

    /**
     * Is true, when the communicator is logging out the user
     */
    isLoading = false;

    /**
     * the following injections are required
     * @param _loginStatus to log the user out of the app
     * @param _communicator to log the user out of the server
     * @param _popUp to inform the user of errors
     * @param _help to open the help dialog
     */
    constructor(private _loginStatus: LoginStatusService,
                private _communicator: CommunicatorService,
                private _popUp: PopUpService,
                private _help: HelpDialogService) {
    }

    /**
     * is run when an item is clicked, that should open a toolbar page
     * @param pageNumber the index of the item clicked, also the index of the page opened
     */
    toolbarItemClickHandler(pageNumber: number) {
        this.onItemClick.emit(pageNumber);
    }

    /**
     * Is run when the user presses the logout button. Informs the communicator, and when successful the loginStatus
     * is changed
     */
    logoutClickHandler() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this._communicator.logout().then(() => {
            this.isLoading = false;
            this._loginStatus.setLoggedOut();
        }).catch(e => {
            this._popUp.show(e);
        });
    }

    /**
     * Is run when the Help element is tapped. Opens the help dialog
     */
    helpClickHandler() {
        this._help.open();
    }

}
