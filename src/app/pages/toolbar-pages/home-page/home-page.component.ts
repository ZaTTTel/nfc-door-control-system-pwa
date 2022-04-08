import {Component} from '@angular/core';
import {ToolbarPageComponent} from "../ToolbarPageComponent";


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
/**
 * The page on which the user can access the camera and buttons, both included in one subcomponent:
 * camera-and-door-component
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class HomePageComponent implements ToolbarPageComponent {
}
