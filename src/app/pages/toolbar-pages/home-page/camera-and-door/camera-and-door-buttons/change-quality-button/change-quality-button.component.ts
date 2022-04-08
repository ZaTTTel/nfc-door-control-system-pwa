import {Component} from '@angular/core';
import {VideoQuality} from '../../../../../../../shared-utilities';
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";

@Component({
    selector: 'app-change-quality-button',
    templateUrl: './change-quality-button.component.html'
})
/**
 * This button loops through the stream quality, changing it in the {@link VideoSettingsService}.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ChangeQualityButtonComponent {

    /**
     * The tooltip message that is displayed when the user hovers above the button
     */
    public tooltip = $localize`:@@Home.ButtonTooltips.Quality:Toggle Quality`;
    /**
     * The VideoQuality enum is publicly available here so that the template can access it
     */
    public VideoQuality = VideoQuality;

    /**
     * The following injections are required
     * @param videoSettings to get the current quality and to change it
     */
    constructor(public videoSettings: VideoSettingsService) {
    }

    /**
     * Sets the quality to the next quality in the {@link VideoQuality} enum. Loops if it's at the end
     */
    loopQuality() {
        const qualitiesStrings = Object.keys(VideoQuality)

        let qualityIndex = (qualitiesStrings.indexOf(this.videoSettings.quality) + 1) % qualitiesStrings.length;
        this.videoSettings.quality = qualitiesStrings[qualityIndex] as VideoQuality;
        this.refreshStream()
    }

    /**
     * Basically turns the screen off and on again.
     * @private
     */
    private refreshStream() {
        this.videoSettings.videoIsOff = true;
        // the setTimeout() call (without a time) refreshes all components
        setTimeout(() => {
            this.videoSettings.videoIsOff = false;
        })
    }

}
