import {AfterViewInit, Component, HostListener} from '@angular/core';
import {LoginStatusService} from "./common/services/login-status/login-status.service";
import {CommunicatorService} from "./common/services/communicators/CommunicatorService";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
/**
 * This is the most top-level component, that displays the toolbar, the side navigation and the pages.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class AppComponent implements AfterViewInit {

    /**
     * The names of the toolbar pages that are displayed in the side navigation
     */
    TOOLBAR_PAGE_TITLES = [
        $localize`:@@SideNav.PageNames.Home:Home`,
        $localize`:@@SideNav.PageNames.NfcTags:NFC Tags`,
        $localize`:@@SideNav.PageNames.NotifDevices:Notification-Devices`
    ];

    /**
     * The title of the application
     */
    title = 'Teco Door Control';

    /**
     * is true, if the component is being displayed on a wide screen. This attribute dictates if the side navigation
     * should overlay the toolbar-pages, or if both can be accessed at the same time.
     */
    isWideScreen = false;

    /**
     * Represents the toolbar-page that is currently displayed, by the order of the {@link TOOLBAR_PAGE_TITLES} list.
     */
    activePageNumber = 0;

    isOnline = window.navigator.onLine;

    /**
     * The following injections are required:
     * @param loginStatus to check if a user is logged in, and display the login page accordingly
     * @param _communicator to inform the midware of the push-notification subscription
     */
    constructor(public loginStatus: LoginStatusService,
                private _communicator: CommunicatorService) {
        // run onResize to get the currently correct isWideScreen value
        this.onResize();
    }

    ngAfterViewInit() {
        this._communicator.addPushSubscriber().then().catch(e => {
            console.log("Could not subscribe to notifications: " + e);
        });
    }

    /**
     * Is run when the size of the screen changes, and updates isWideScreen accordingly
     */
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isWideScreen = window.innerWidth > 1100;
    }

    @HostListener('window:offline')
    setNetworkOffline(): void {
        this.isOnline = false;
    }

    @HostListener('window:online')
    setNetworkOnline(): void {
        this.isOnline = true;
    }
}
