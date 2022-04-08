import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {loadPlayer, Player} from "rtsp-relay/browser";
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {VideoSettingsService} from "../../../../../../common/services/video-settings/video-settings.service";
import {LoggerService} from "../../../../../../common/services/logger/logger.service";

@Component({
    selector: 'app-rtsp-video',
    templateUrl: './rtsp-video.component.html',
    styleUrls: ['./rtsp-video.component.css']
})
/**
 * This component displays gets the stream url from the communicator, and displays the stream.
 * While it's loading, a loading spinner is displayed.
 *
 * The RTSP-Relay Library {@link https://www.npmjs.com/package/rtsp-relay} is used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class RtspVideoComponent implements OnDestroy {

    /**
     * is true when the component is visible, and the player has not yet been created, or if the stream disconnected
     */
    isLoading = true;

    /** the instance of the rtsp-relay client */
    player?: Player;
    @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLCanvasElement>;

    /**
     * On construction, the video player is started
     *
     * the following injections are required:
     * @param _popUp to display errors
     * @param _communicator to get the streams url
     * @param _videoSettings to get the quality, and to turn the stream off on error
     * @param _logger to log results
     */
    constructor(private _popUp: PopUpService,
                private _communicator: CommunicatorService,
                private _videoSettings: VideoSettingsService,
                private _logger: LoggerService) {
        _logger.log("Starting player")
        this.startPlayer().then().catch(() => void 0)
    }

    /**
     * This is run when the stream closes, at which point the player should be destroyed, if there is one
     */
    ngOnDestroy() {
        try {
            this.player?.destroy()
            this._logger.log("Player destroyed")
        } catch (e) {
            this._logger.log(e);
        }
    }

    /**
     * Starts the player.
     * @private
     */
    private async startPlayer() {
        this.isLoading = true;

        // get the camera url from the communicator
        const camUrl = await this._communicator.getCamUrl(this._videoSettings.quality).catch(e => {
            this._popUp.show(e);
            this._videoSettings.videoIsOff = true;
            return;
        })

        // the promise that resolves when the connection is successful
        const promise = loadPlayer({
            url: camUrl as string,
            canvas: this.videoPlayer!.nativeElement,
            // When disconnected, start loading again and show a pop-up
            onDisconnect: () => {
                this._logger.log("Camera disconnected!")
                this.isLoading = true;
            },
        });

        // this will wait until the connection is established
        this.player = await promise;
        this.isLoading = false;
    }
}
