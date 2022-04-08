import {Component} from '@angular/core';
import {FullscreenPlayerDialog} from "../../fullscreen-player/fullscreen-player-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-fullscreen-button',
    templateUrl: './fullscreen-button.component.html'
})
/**
 * This button sets the video to fullscreen, by opening a fullscreen dialog window and displaying the stream inside
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class FullscreenButtonComponent {

    /**
     * The tooltip that is displayed when hovering over the button
     */
    public tooltip = $localize`:@@Home.ButtonTooltips.FullscreenOn:Fullscreen`;

    /**
     * The following injections are required:
     * @param _dialog to open the dialog containing the stream
     */
    constructor(private _dialog: MatDialog) {
    }

    /**
     * Is run when the button is pressed.
     * Opens the fullscreen dialog
     */
    openFullscreen() {
        this._dialog.open(FullscreenPlayerDialog, {
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            hasBackdrop: false,
        })
    }


}
