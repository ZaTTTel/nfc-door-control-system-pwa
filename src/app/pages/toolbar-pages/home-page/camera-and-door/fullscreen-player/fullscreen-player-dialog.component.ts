import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-fullscreen-player',
    templateUrl: './fullscreen-player-dialog.component.html',
    styleUrls: ['./fullscreen-player-dialog.component.css']
})
/**
 * This Component is to be displayed inside an (ideally fullscreen) dialog. It displays the camera stream with a few
 * buttons.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class FullscreenPlayerDialog implements OnInit, OnDestroy {

    /**
     * The tooltip that is displayed when the user hovers above the close-fullscreen button
     */
    public closeButtonTooltip = $localize`:@@Home.ButtonTooltips.FullscreenOff:Close Fullscreen`;

    /**
     * Creates a subscriber that is notified, when the user presses a key. When the pressed key is the escape key,
     * the dialog, in which this component is in, is closed. This is not strictly necessary, as pressing the escape
     * key when fullscreen is caught by the browser, and cannot be seen by the app. For that reason, the
     * {@link onResize} function closes the dialog, when the page is resized, and fullscreen is not active.
     *
     * The following injectable is required:
     * @param _dialogRef to control the dialog containing this component, mainly to close it
     */
    constructor(private _dialogRef: MatDialogRef<FullscreenPlayerDialog>) {
        document.onkeydown = (evt) => {
            if (evt.key == "escape") {
                this.close()
            }
        }
    }

    /**
     * Closes the dialog, and therefore the fullscreen player
     */
    close() {
        this._dialogRef.close();
    }

    /**
     * On initiation, an attempt is made to set the browser tab to fullscreen
     */
    ngOnInit(): void {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then();
        }
    }

    /**
     * After closure of the dialog, the browsers fullscreen will be exited.
     */
    ngOnDestroy() {
        document.exitFullscreen().then().catch(() => void 0);
        // delete the onkeydown subscription created above
        document.onkeydown = null;
    }

    /**
     * This listener is a bit of a workaround. When the browser is fullscreen, the escape key isn't registered by
     * the app. When the browser registers the users esc input, it exits fullscreen mode. This resizes the frame a
     * little, so the function below is executed. Now, the frame might be resized for multiple reasons, so the
     * function first checks the current fullscreen status, to see if it should now close.
     */
    @HostListener('document:fullscreenchange', ['$event'])
    onResize() {
        if (!document.fullscreenElement) {
            this.close();
        }
    }
}
