import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
/**
 * Displays a toolbar with a "burger-menu" icon-button on the left, and an optional text on the right.
 * onBurgerClick.emit() is run when the "burger-menu" icon-button is tapped.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export class ToolbarComponent {

    /**
     * is emitted, when the menu ("burger-menu") is tapped/clicked.
     */
    @Output() onBurgerClick = new EventEmitter();
}
