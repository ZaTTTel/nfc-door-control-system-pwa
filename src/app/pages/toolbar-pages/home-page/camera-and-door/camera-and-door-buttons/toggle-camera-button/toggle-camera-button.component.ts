import {Component} from '@angular/core';
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";
import {AppConfigService} from "../../../../../../common/services/app-config/app-config.service";

@Component({
    selector: 'app-toggle-camera-button',
    templateUrl: './toggle-camera-button.component.html'
})
/**
 * This button toggles the camera on and off. The changes are  made in the {@link VideoSettingsService}.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ToggleCameraButtonComponent {

    /**
     * The amount of time needed to pass after the tab is focused, to be able to press the button
     * @private
     */
    private static CLICK_TIME_BUFFER = 1000;

    isDisabled = false;

    /**
     * the tooltip that is displayed when hovering over the button
     */
    public tooltip = $localize`:@@Home.ButtonTooltips.Camera:Toggle Camera`;

    /**
     * When the tab is unfocused, pressing the camera-button would turn the camera on and off again, as reentering
     * the tab will turn the camera on. A solution, is to disable the usage of the button for the duration that the
     * tab is unfocused, plus a few seconds.
     *
     * The following public injection is required:
     * @param videoSettings to perform the change of camera activity. This injection is public, so that the button
     * can display the current state
     * @param _config to see if the camera is toggled on focus
     */
    constructor(public videoSettings: VideoSettingsService,
                private _config: AppConfigService) {
        if (_config.videoToggleOnFocus) {
            window.addEventListener('blur', () => {
                this.isDisabled = true;
            });
            window.addEventListener('focus', () => {
                setTimeout(() => {
                    this.isDisabled = false;
                }, ToggleCameraButtonComponent.CLICK_TIME_BUFFER)
            });
        }
    }

    /**
     * Toggles the camera activity status
     */
    toggleCamera() {
        if (!this.isDisabled) {
            this.videoSettings.videoIsOff = !this.videoSettings.videoIsOff;
        }
    }

}
