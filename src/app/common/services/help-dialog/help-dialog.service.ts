import {Component, Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export class HelpDialogService {

    constructor(private _dialog: MatDialog) {
    }

    open() {
        this._dialog.open(HelpDialog)
    }
}


@Component({
    selector: 'app-help-dialog',
    templateUrl: './help-dialog.html'
})
/**
 * This component acts as a wrapper for the video player. The reason being, that the stream is displayed in multiple
 * locations (Fullscreen-player and camera-and-door-component), so changing the specific player now only requires on
 * change in the code: in this components template
 *
 */
export class HelpDialog {

}
