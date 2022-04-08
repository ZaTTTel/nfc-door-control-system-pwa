import {Component} from "@angular/core";
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {LoggerService} from "../../../../../../common/services/logger/logger.service";
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";

@Component({
    selector: 'app-open-door-button',
    templateUrl: './open-door-button.component.html',
    styleUrls: ['./open-door-button.component.css']
})
/**
 * A button component that, if pressed, sends a message to the injected communicator to open the door. (Network-)
 * errors are handled here, by displaying a pop-up snackbar to the user
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class OpenDoorButtonComponent {

    /**
     * the tooltip that is displayed when the user hovers above the button
     */
    public tooltip = $localize`:@@Home.ButtonTooltips.Door:Open Door`;


    /**
     * is true, if the communicator is currently trying to open the door. Activates the loading bar
     */
    isLoading = false;

    /**
     * The following injectables are required
     * @param _communicator to send a signal to open the door to the midware (and to receive an answer)
     * @param _logger to log that the door has been opened.
     * @param _popUp the notify the user of errors
     */
    constructor(private _communicator: CommunicatorService,
                private _logger: LoggerService,
                private _popUp: PopUpService) {
    }

    /**
     * is run when the button is clicked. Sends a signal to open the door to the communicator and handles possible
     * errors thrown by the returned promise, by outputting a message to the user.
     */
    openDoor() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this._communicator.openDoor().then(() => {
            this._popUp.show($localize`:@@Home.Door.Opened:The door has been opened!`)
            this.isLoading = false;
        }).catch(e => {
            this._popUp.show(e);
            this.isLoading = false;
        });
    }
}
