import {Component, EventEmitter, Output} from '@angular/core';
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";

@Component({
    selector: 'app-manual-sync-button',
    templateUrl: './manual-sync-button.component.html'
})
/**
 * This component contains a sole button, that tells the communicator to synchronize the tags on the door-controller.
 *
 * When pressed, a promise is emitted, that resolves when the synchronizing is done.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ManualSyncButtonComponent {

    /**
     * is emitted when the synchronization is loading. The promise resolves when the loading is done
     */
    @Output() onLoading = new EventEmitter<Promise<any>>();

    /**
     * The following injections are required:
     * @param _communicator to inform the midware of the synchronization request
     * @param _popUp to inform the user of a success or an error
     */
    constructor(private _communicator: CommunicatorService,
                private _popUp: PopUpService) {
    }

    /**
     * Is run when the Manual-Sync-Button is pressed.
     * When run, the communicator is asked to synchronize the tokens. On success, a popup is shown.
     */
    manualSyncHandler() {
        const syncPromise = this._communicator.manuallySyncTags();
        // inform the parent that the synchronization is loading
        this.onLoading.emit(syncPromise);
        syncPromise.then(() => {
                this._popUp.show($localize`:@@NfcTags.Sync.Success:The NFC Tags have successfully been synchronized with the door!`)
            }
        ).catch(e => {
                this._popUp.show(e)
            }
        )
    }

}
