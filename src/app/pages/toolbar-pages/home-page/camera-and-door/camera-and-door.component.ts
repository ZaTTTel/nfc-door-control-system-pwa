import {AfterContentChecked, Component, ViewChild} from '@angular/core';
import {VideoSettingsService} from "../../../../common/services/video-settings/video-settings.service";
import {AppConfigService} from "../../../../common/services/app-config/app-config.service";
import {OpenDoorButtonComponent} from "./camera-and-door-buttons/open-door-button/open-door-button.component";
import {
    ToggleCameraButtonComponent
} from "./camera-and-door-buttons/toggle-camera-button/toggle-camera-button.component";

@Component({
    selector: 'app-camera-and-door',
    templateUrl: './camera-and-door.component.html',
    styleUrls: ['./camera-and-door.component.css']
})
/**
 * This component contains everything to do with the camera, and the door (including the buttons).
 *
 * It is the sole thing displayed in the homepage. The reason that the buttons are also here, is that they control
 * the workings of the camera.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class CameraAndDoorComponent implements AfterContentChecked {

    disableStreamClick = false;

    @ViewChild("openDoorButton") openDoorButton!: OpenDoorButtonComponent;
    @ViewChild("toggleCamButton") toggleCamButton!: ToggleCameraButtonComponent;

    /**
     * The following public injections are required. They are public because they are both used in the template.
     * @param videoSettings to be informed if the video is currently turned off
     * @param config to get the stream's aspect ratio
     */
    constructor(public videoSettings: VideoSettingsService,
                public config: AppConfigService) {
    }

    ngAfterContentChecked() {
        this.disableStreamClick = !(this.config.tapStreamToOpenDoor || this.config.tapStreamToToggleCam)
    }

    /**
     * Is run when the stream window is clicked. The action depends on what is defined in the config.
     */
    streamClickHandler() {
        if (this.config.tapStreamToOpenDoor) {
            this.openDoorButton.openDoor();
        }

        if (this.config.tapStreamToToggleCam) {
            this.toggleCamButton.toggleCamera()
        }
    }
}
