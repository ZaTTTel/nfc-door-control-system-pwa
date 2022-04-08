import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CurrentNfcTokenComponent} from './current-nfc-token.component';
import {MatExpansionModule, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {Component, EventEmitter, Output} from "@angular/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {A11yModule} from "@angular/cdk/a11y";

describe('CurrentNfcTokenComponent', () => {
    let component: CurrentNfcTokenComponent;
    let fixture: ComponentFixture<CurrentNfcTokenComponent>;

    let checkTokenButton: HTMLElement;
    let deleteTokenButton: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MatExpansionModule,
                A11yModule
            ],
            declarations: [
                CurrentNfcTokenComponent,
                MatExpansionPanel,
                MatExpansionPanelHeader,
                DeleteTokenButtonStub,
                UserHasTokenButtonStub
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CurrentNfcTokenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        checkTokenButton = fixture.nativeElement.querySelector('app-user-has-nfc-token-button');
        deleteTokenButton = fixture.nativeElement.querySelector('app-delete-nfc-token-button');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close and load when a button is working', fakeAsync(() => {
        let promiseResolve = () => {
        };

        let promise = new Promise<void>(function (resolve) {
            promiseResolve = resolve;
        });

        component.actionHandler(promise);
        expect(component.isLoading).toBeTrue();
        expect(component.isOpen).toBeFalse();
        // finish loading
        promiseResolve();

        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.isOpen).toBeTrue();

    }))

    it('should handle promise rejections correctly', fakeAsync(() => {
        let promiseReject = () => {
        };

        let promise = new Promise<void>(function (resolve, reject) {
            promiseReject = reject;
        });

        // checkTokenButton.dispatchEvent(new CustomEvent('onCheck', {detail: promise}))
        component.actionHandler(promise);
        expect(component.isLoading).toBeTrue();
        expect(component.isOpen).toBeFalse();
        // finish loading
        promiseReject();

        tick();

        expect(component.isLoading).toBeFalse();
        expect(component.isOpen).toBeTrue();
    }))
});

@Component({selector: 'app-user-has-nfc-token-button', template: ''})
class UserHasTokenButtonStub {
    @Output() onCheck: EventEmitter<Promise<any>> = new EventEmitter<Promise<any>>()
}

@Component({selector: 'app-delete-nfc-token-button', template: ''})
class DeleteTokenButtonStub {
    @Output() onDelete: EventEmitter<Promise<any>> = new EventEmitter<Promise<any>>()
}
