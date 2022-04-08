import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {InputPasswordDialog, InputPasswordDialogService} from './input-password-dialog.service';
import {BehaviorSubject, Observable} from "rxjs";
import {EventSubscriber} from "../../../../shared-utilities";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

describe('InputPasswordDialogService', () => {
    let service: InputPasswordDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useClass: DialogMock},
                {provide: MatDialogRef, useClass: DialogRefMock},
                InputPasswordDialog
            ]
        });
        service = TestBed.inject(InputPasswordDialogService);
    });

    beforeEach(() => {
        dialogHasOpened = false;
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to open', fakeAsync(() => {
        service.open();
        tick();
        expect(dialogHasOpened).toBeTrue()
    }))

    describe('InputPasswordDialog', () => {
        let fixture: ComponentFixture<InputPasswordDialog>;

        let enterButton: HTMLButtonElement;
        let input: HTMLInputElement;

        beforeEach(() => {
            fixture = TestBed.createComponent(InputPasswordDialog);
            enterButton = fixture.nativeElement.querySelectorAll('button')[1]
            input = fixture.nativeElement.querySelector('input')
            dialogHasBeenClosed = false;
            fixture.detectChanges();

        })

        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should be able to close the dialog when the enter button is pressed', fakeAsync(() => {
            input.value = "password";
            fixture.detectChanges();
            enterButton.dispatchEvent(new Event('click'))
            tick();
            expect(dialogHasBeenClosed).toBeTrue();
        }))
    });

});


let dialogHasOpened: boolean
const dialogCloseSource = new BehaviorSubject<EventSubscriber | undefined>(undefined)

class DialogMock {
    open() {
        dialogHasOpened = true;
        return new DialogRefMock();
    }
}

let dialogHasBeenClosed: boolean;

class DialogRefMock {
    afterClosed(): Observable<any> {
        return dialogCloseSource.asObservable();
    }

    close() {
        dialogHasBeenClosed = true;
    }
}
