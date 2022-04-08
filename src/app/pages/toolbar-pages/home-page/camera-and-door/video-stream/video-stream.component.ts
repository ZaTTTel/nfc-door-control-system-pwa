import {Component} from '@angular/core';
import {VideoSettingsService} from "../../../../../common/services/video-settings/video-settings.service";

@Component({
    selector: 'app-video-stream',
    templateUrl: './video-stream.component.html'
})
/**
 * This component acts as a wrapper for the video player. The reason being, that the stream is displayed in multiple
 * locations (Fullscreen-player and camera-and-door-component), so changing the specific player now only requires on
 * change in the code: in this components template
 *
 */
export class VideoStreamComponent {

    /**
     * The following injectable is required:
     * @param videoSettings to
     */
    constructor(public videoSettings: VideoSettingsService) {
    }

}
