import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OfflinePageComponent} from './offline-page.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('OfflinePageComponent', () => {
    let component: OfflinePageComponent;
    let fixture: ComponentFixture<OfflinePageComponent>;

    let spinner: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, BrowserAnimationsModule],
            declarations: [OfflinePageComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OfflinePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        spinner = fixture.nativeElement.querySelectorAll('p')[0]
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should spin when the contextmenu is opened', () => {
        expect(component.rotating).toBe(false);
        spinner.dispatchEvent(new Event('contextmenu'));
        expect(component.rotating).toBe(true);
    })
});
