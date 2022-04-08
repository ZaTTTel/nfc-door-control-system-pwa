import {Injectable} from '@angular/core';
import {AppConfigService} from "../app-config/app-config.service";

@Injectable({
    providedIn: 'root'
})
/**
 * This service can log messages (currently only to the console), depending on if the logging-method is activated in
 * the config.json.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class LoggerService {

    /**
     * The following injection is required:
     * @param _config to check if console-logging is activated in the config
     */
    constructor(private _config: AppConfigService) {
    }

    /**
     * logs a message to the console
     * @param message the message to be logged
     */
    log(message: any) {
        if (this._config.logToConsole) {
            console.log(message);
        }
    }

    /**
     * logs a warning to the console
     * @param message warning message to be logged
     */
    warn(message: any) {
        if (this._config.logToConsole) {
            console.warn(message);
        }
    }
}
