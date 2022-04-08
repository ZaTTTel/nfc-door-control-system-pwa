import {TestBed} from '@angular/core/testing';

import {PopUpService} from './pop-up.service';
import {MatSnackBar} from "@angular/material/snack-bar";

describe('PopUpService', () => {
    let service: PopUpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: MatSnackBar, useClass: SnackBarMock}
            ]
        });
        service = TestBed.inject(PopUpService);
    });

    beforeEach(() => {
        lastMessage = undefined;
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly show a snackbar', () => {
        const text = "Message Text";
        service.show(text)
        expect(lastMessage).toEqual(text)
    })

    it('should do nothing when entering an empty message', () => {
        const text = "";
        service.show(text)
        expect(lastMessage).toEqual(undefined)
    })
});

let lastMessage: string | undefined

class SnackBarMock {
    open(message: string) {
        lastMessage = message;
    }
}
