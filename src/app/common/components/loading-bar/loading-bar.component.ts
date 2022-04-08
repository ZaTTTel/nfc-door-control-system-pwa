import {Component, Input} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-loading-bar',
    templateUrl: './loading-bar.component.html'
})
/**
 * This component wraps an indeterminate {@link MatProgressBar}. {@link isVisible} can be changed to turn the
 * loading bar visibility on or off. When the visibility is off, the component height is still the same size as when
 * it is on.
 *
 * This means, turning the loading bar on and off doesn't change the layout of the page
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class LoadingBarComponent {

    /**
     * true, only if the loading bar is to be visible
     */
    @Input() isVisible = false;

}
