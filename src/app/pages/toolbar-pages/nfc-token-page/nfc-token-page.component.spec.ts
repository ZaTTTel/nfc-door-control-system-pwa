import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NfcTokenPageComponent} from './nfc-token-page.component';
import {MatCard} from "@angular/material/card";
import {Component} from "@angular/core";
import {MatDivider} from "@angular/material/divider";
import {MatAccordion} from "@angular/material/expansion";

describe('NfcTokenPageComponent', () => {
    let component: NfcTokenPageComponent;
    let fixture: ComponentFixture<NfcTokenPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NfcTokenPageComponent,
                MatCard,
                ReadTokenStub,
                MatDivider,
                MatAccordion,
                CurrentTokenStub,
                CurrentUserStub
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NfcTokenPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({selector: 'app-read-nfc-token', template: ''})
class ReadTokenStub {
}

@Component({selector: 'app-current-nfc-token', template: ''})
class CurrentTokenStub {
}

@Component({selector: 'app-current-user', template: ''})
class CurrentUserStub {
}
