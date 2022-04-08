import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManualSyncButtonComponent} from './manual-sync-button.component';
import {PopUpService} from "../../../../../../common/services/pop-up/pop-up.service";
import {CommunicatorService} from "../../../../../../common/services/communicators/CommunicatorService";

describe('ManualSyncButtonComponent', () => {
    let component: ManualSyncButtonComponent;
    let fixture: ComponentFixture<ManualSyncButtonComponent>;

    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ManualSyncButtonComponent
            ],
            providers: [
                {provide: PopUpService, useClass: PopUpMock},
                {provide: CommunicatorService, useClass: CommunicatorMock}
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ManualSyncButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        tagsHaveBeenSynced = false;
        allowSyncing = true;

        button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should sync the tags when the button is pressed', () => {
        button.dispatchEvent(new Event('click'));
        expect(tagsHaveBeenSynced).toBeTrue();
    })

    it('should handle communicator rejects', () => {
        allowSyncing = false;
        button.dispatchEvent(new Event('click'));
        expect(tagsHaveBeenSynced).toBeFalse();
    })
});

let tagsHaveBeenSynced: boolean;
let allowSyncing: boolean;

class CommunicatorMock {
    manuallySyncTags() {
        if (allowSyncing) {
            tagsHaveBeenSynced = true;
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }
}

class PopUpMock {
    show() {
    }
}
