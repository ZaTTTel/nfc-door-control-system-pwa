/* istanbul ignore file */
import {Component, OnInit} from '@angular/core';
import {VideoQuality} from '../../../../../../../shared-utilities';
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";

@Component({
    selector: 'app-dummy-video',
    templateUrl: './dummy-video.component.html',
    styleUrls: ['./dummy-video.component.css']
})
/**
 * Todo: Delete this.
 *
 *
 * This is a dummy video component, displaying only an image of a badass robber
 */
export class DummyVideoComponent implements OnInit {

    VideoQuality = VideoQuality;

    hdImage = "https://previews.123rf.com/images/czanner/czanner1506/czanner150600017/40749545-thief-burglar-breaking-in-an-apartment-to-steal-something.jpg"
    sdImage = "https://i.imgur.com/od4gzx1.png"


    cameraActive = false;

    constructor(private _communicator: CommunicatorService,
                public videoSettings: VideoSettingsService) {
    }

    ngOnInit(): void {
        this.activateCamera()
    }

    activateCamera() {
        const connectCamPromise = this._communicator.getCamUrl(this.videoSettings.quality);
        connectCamPromise.then(() => {
            this.cameraActive = true;
        })
    }
}
