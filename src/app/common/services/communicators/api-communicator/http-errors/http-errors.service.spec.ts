import {TestBed} from '@angular/core/testing';

import {HttpErrorsService} from './http-errors.service';

describe('HttpErrorsService', () => {
    let service: HttpErrorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HttpErrorsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
