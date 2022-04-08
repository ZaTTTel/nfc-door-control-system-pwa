import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HelpDialogService} from './help-dialog.service';
import {MatDialog} from "@angular/material/dialog";

describe('HelpDialogService', () => {
    let service: HelpDialogService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialog, useClass: DialogMock}
            ]
        });
        service = TestBed.inject(HelpDialogService);

        hasOpened = false;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to open', fakeAsync(() => {
        expect(hasOpened).toBeFalse();
        service.open();
        tick();
        expect(hasOpened).toBeTrue();
    }))
});

let hasOpened: boolean;

class DialogMock {
    open() {
        hasOpened = true;
    }
}
