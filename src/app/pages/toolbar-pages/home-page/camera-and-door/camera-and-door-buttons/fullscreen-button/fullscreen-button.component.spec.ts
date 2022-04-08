import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FullscreenButtonComponent} from './fullscreen-button.component';
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('FullscreenButtonComponent', () => {
    let component: FullscreenButtonComponent;
    let fixture: ComponentFixture<FullscreenButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [
                FullscreenButtonComponent,
                MatIcon
            ],
            providers: [
                {provide: MatDialog, useClass: MatDialogMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FullscreenButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        button = fixture.nativeElement.querySelector('button')

        dialogIsOpen = false;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to open the full screen', () => {
        expect(dialogIsOpen).toBeFalse();
        button.dispatchEvent(new Event('click'))
        expect(dialogIsOpen).toBeTrue();
    })
});

let dialogIsOpen: boolean;

class MatDialogMock {
    open() {
        dialogIsOpen = true
    }
}
