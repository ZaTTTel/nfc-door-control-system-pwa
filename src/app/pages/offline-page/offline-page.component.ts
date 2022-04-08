import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-offline-page',
    animations: [
        trigger("rotated", [
            transition('* => rotating',
                animate('2000ms', keyframes([
                        style({transform: 'rotateY(0)'}),
                        style({transform: 'rotateY(360deg)  rotateX(0)'}),
                        style({transform: 'rotateZ(0)  rotateX(360deg)'}),
                        style({transform: 'rotateZ(360deg)'}),
                    ])
                ))
        ])
    ],
    templateUrl: './offline-page.component.html',
    styleUrls: ['./offline-page.component.css']
})
/**
 * This component is displayed when the service worker detects that the app is offline. It displays a message
 * informing of the offline status, and the teco door logo (which rotates when right-clicked / long pressed)
 */
export class OfflinePageComponent implements AfterViewInit {

    /**
     * is true, if the logo is currently rotating, set to true to rotate the logo (will reset to false when done)
     */
    rotating = false;

    /**
     * the reference pointing to the logo img. Is used to get the right click / hold event
     */
    @ViewChild("spinner") spinner!: ElementRef;

    /**
     * After the view inits, the isPWA value is set and the event-listener, that is activated when
     * right-clicking/holding to logo, is subscribed to
     */
    ngAfterViewInit() {
        this.spinner!.nativeElement.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
            this.spin()
        })
    }

    /**
     * Spins the component marked with 'spinner'
     */
    spin() {
        this.rotating = true;
    }

}
