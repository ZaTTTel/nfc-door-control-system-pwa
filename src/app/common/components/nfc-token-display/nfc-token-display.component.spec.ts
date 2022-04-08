import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NfcTokenDisplayComponent} from './nfc-token-display.component';
import {MatCard} from "@angular/material/card";

describe('NfcTokenDisplayComponent', () => {
    let component: NfcTokenDisplayComponent;
    let fixture: ComponentFixture<NfcTokenDisplayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NfcTokenDisplayComponent,
                MatCard
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NfcTokenDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
