import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FullscreenPlayerDialog} from './fullscreen-player-dialog.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Component} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('FullscreenPlayerComponent', () => {
    let component: FullscreenPlayerDialog;
    let fixture: ComponentFixture<FullscreenPlayerDialog>;

    let fullscreenButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatTooltipModule
            ],
            declarations: [
                FullscreenPlayerDialog,
                VideoStreamStub,
                DoorButtonStub,
                QualityButtonStub,
                MatIcon
            ],
            providers: [
                {provide: MatDialogRef, useClass: DialogRefMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FullscreenPlayerDialog);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialogIsClosed = false;

        fullscreenButton = fixture.nativeElement.querySelector('button')
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close when pressing the enter key', () => {
        expect(dialogIsClosed).toBeFalse();
        const event = new KeyboardEvent("keydown", {
            key: "escape"
        });
        document.dispatchEvent(event);
        expect(dialogIsClosed).toBeTrue();
    })

    it('should close when the browser (document) exits fullscreen mode', () => {
        expect(dialogIsClosed).toBeFalse();
        const event = new Event("fullscreenchange");
        document.dispatchEvent(event);
        expect(dialogIsClosed).toBeTrue();
    })
});

let dialogIsClosed: boolean;

class DialogRefMock {
    close() {
        dialogIsClosed = true;
    }
}

@Component({selector: 'app-video-stream', template: ''})
class VideoStreamStub {
}

@Component({selector: 'app-open-door-button', template: ''})
class DoorButtonStub {
}

@Component({selector: 'app-change-quality-button', template: ''})
class QualityButtonStub {
}
