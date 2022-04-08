import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
/**
 * This service opens a pop-up, with a specific message, to inform the user of something from anywhere in the app.
 * It uses the {@link MatSnackBar}.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class PopUpService {

    /**
     * the duration how long the pop-up is displayed
     */
    static DURATION = 5000;

    /**
     * The following injection is required
     * @param _snackBar to open the pop-up
     */
    constructor(private _snackBar: MatSnackBar) {
    }

    /**
     * Shows the pop-up with a specific message. Some other optional arguments can be entered:
     * @param message the message to be displayed
     * @param duration the duration length of the pup-up. Will default to {@link PopUpService.DURATION}
     * @param verticalPosition the vertical position of the pop-up, defaults to 'top'
     * @param horizontalPosition the horizontal position of the pop-up, defaults to 'center'
     */
    show(message: string,
         duration = PopUpService.DURATION,
         verticalPosition: MatSnackBarVerticalPosition = "top",
         horizontalPosition: MatSnackBarHorizontalPosition = "center") {
        if (!message) {
            return;
        }

        this._snackBar.open(message, $localize`:@@Dialogs.Button.Okay:Okay`, {
            duration: duration,
            verticalPosition: verticalPosition,
            horizontalPosition: horizontalPosition
        });

    }
}
