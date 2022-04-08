import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Url, VideoQuality} from '../../../../shared-utilities';

@Injectable({
    providedIn: 'root'
})
/**
 * This service reads the config.json file (located in src/assets), and allows users to access its data.
 * If the config is missing an attribute, an error is thrown.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class AppConfigService {
    private _appConfig: any;

    /**
     * The following injection is required:
     * @param _http to open the config file
     */
    constructor(private _http: HttpClient) {
        this.loadAppConfig().then().catch(() => {
        });
    }

    /**
     * Gets the api url, using which the communicator can access the Rest API.
     * e.g "https://192.134.244.11:5000/api"
     */
    get apiBaseUrl(): Url {
        if (!this._appConfig.hasOwnProperty("apiBaseUrl")) {
            throw Error('Could not find the property "apiBaseUrl" (string) in the config file!');
        }

        return this._appConfig.apiBaseUrl;
    }

    /**
     * Gets the quality, at which the stream will be when the app starts or is refreshed.
     */
    get defaultStreamQuality(): VideoQuality {
        if (!this._appConfig.hasOwnProperty("defaultStreamQuality")) {
            throw Error('Could not find the property "defaultStreamQuality" (string) in the config file!');
        }

        return this._appConfig.defaultStreamQuality;
    }

    /**
     * Returns true, if the video stream should be active, when the app opens.
     */
    get startWithVideoOff(): boolean {
        if (!this._appConfig.hasOwnProperty("startWithVideoOff")) {
            throw Error('Could not find the property "startWithVideoOff" (boolean) in the config file!');
        }

        return this._appConfig.startWithVideoOff;
    }

    /**
     * Gets the aspect ratio in which the video stream window is displayed.
     * The returned value is the height of the stream in relation to the width, including the percent symbol.
     * e.g "52.25%"
     */
    get streamAspectRatio(): string {
        if (!this._appConfig.hasOwnProperty("streamAspectRatio")) {
            throw Error('Could not find the property "streamAspectRatio" (string) in the config file!');
        }

        return this._appConfig.streamAspectRatio;
    }

    /**
     * Returns true, if the door should open when the stream is tapped/clicked
     */
    get tapStreamToOpenDoor(): boolean {
        if (!this._appConfig.hasOwnProperty("tapStreamToOpenDoor")) {
            throw Error('Could not find the property "tapStreamToOpenDoor" (boolean) in the config file!');
        }

        return this._appConfig.tapStreamToOpenDoor;
    }

    /**
     * Returns true, if the camera should toggle when the stream is tapped/clicked
     */
    get tapStreamToToggleCam(): boolean {
        if (!this._appConfig.hasOwnProperty("tapStreamToToggleCam")) {
            throw Error('Could not find the property "tapStreamToToggleCam" (boolean) in the config file!');
        }

        return this._appConfig.tapStreamToToggleCam;
    }

    /**
     * Returns true, if the logs should appear in the browser console
     */
    get logToConsole(): boolean {
        if (!this._appConfig.hasOwnProperty("logging")) {
            throw Error('Could not find the property "logging" (boolean) in the config file!');
        }
        if (!this._appConfig.logging.hasOwnProperty("console")) {
            throw Error('Could not find the property "logging.console" (boolean) in the config file!');
        }

        return this._appConfig.logging.console;
    }

    /**
     * Gets the vapid public key used to subscribe to the push notifications
     */
    get vapidPublicKey(): string {
        if (!this._appConfig.hasOwnProperty("vapidPublicKey")) {
            throw Error('Could not find the property "vapidPublicKey" (string) in the config file!');
        }

        return this._appConfig.vapidPublicKey;
    }

    /**
     * Gets the time in ms, for how long the notifications are displayed
     */
    get notificationDuration(): number {
        if (!this._appConfig.hasOwnProperty("notificationDuration")) {
            throw Error('Could not find the property "notificationDuration" (number in ms) in the config file!');
        }

        return this._appConfig.notificationDuration;
    }

    /**
     * Returns true, if the video should be switched off, while the tab is unfocused.
     */
    get videoToggleOnFocus() {
        if (!(this._appConfig.hasOwnProperty("videoToggleOnFocus"))) {
            throw Error('Could not find the property "videoToggleOnFocus" (boolean) in the config file!');
        }

        return this._appConfig.videoToggleOnFocus;
    }

    /**
     * Opens the config.json, and saves its content in _appConfig. If the file could not be loaded, an error is thrown.
     */
    loadAppConfig() {
        const observable = this._http.get('/assets/config.json');

        observable.subscribe({
                next: (data) => {
                    this._appConfig = data;
                },
                error: (err => {
                    throw Error("The config file could not be loaded: " + err)
                })
            }
        )

        return lastValueFrom(observable);
    }
}
