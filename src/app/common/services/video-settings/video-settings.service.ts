import {Injectable} from '@angular/core';
import {VideoQuality} from '../../../../shared-utilities';
import {AppConfigService} from "../app-config/app-config.service";

@Injectable({
    providedIn: 'root'
})
/**
 * This service keeps track of the user settings pertaining the video stream.
 * These settings can be changed by the user on the Home-Screen. Some settings have default values that are gotten
 * from the config file.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class VideoSettingsService {
    /**
     * On initiation, the videoIsOff boolean is set to the default value in the config.
     * Then, if it is permitted by the config, subscriptions are added that keep track of the focus of the current
     * tab. These turn the camera off, when the tab is unfocused, and turn it back on when focused
     *
     * The following injectable is required:
     * @param _config to access the config.json to find set default values etc.
     */
    constructor(private _config: AppConfigService) {
        // when starting, the camera is turned on
        this.videoIsOff = _config.startWithVideoOff;
        // when the tab is unfocused, turn off the camera
        window.addEventListener('blur', () => {
            this._tabIsUnfocused = true;
        });
        window.addEventListener('focus', () => {
            this._tabIsUnfocused = false;
        });
    }

    private _videoIsOff = true;

    /**
     * Returns true, if the video should currently be off
     */
    get videoIsOff(): boolean {
        return this._videoIsOff || (this._tabIsUnfocused && this._config.videoToggleOnFocus);
    }

    /**
     * sets the status of the video (on/off)
     * @param value
     */
    set videoIsOff(value: boolean) {
        this._videoIsOff = value;
    }

    private _tabIsUnfocused = false;

    /**
     * Returns true, if the tab is currently not focused
     */
    get tabIsUnfocused(): boolean {
        return this._tabIsUnfocused;
    }

    private _quality = this._config.defaultStreamQuality;

    /**
     * Gets the quality at which the stream should be playing
     */
    get quality(): VideoQuality {
        return this._quality;
    }

    /**
     * Sets the stream quality
     * @param value
     */
    set quality(value: VideoQuality) {
        this._quality = value;
    }
}
