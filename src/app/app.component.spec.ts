import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CommunicatorService} from "./common/services/communicators/CommunicatorService";
import {BehaviorSubject} from "rxjs";
import {ServiceWorkerModule, SwPush} from "@angular/service-worker";
import {APP_INITIALIZER} from "@angular/core";
import {AppConfigService} from "./common/services/app-config/app-config.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToolbarComponent} from "./navigation/toolbar/toolbar.component";


describe('AppComponent', () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>
    let _swPush: SwPush;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ServiceWorkerModule.register('ngsw-worker.js'),
                HttpClientTestingModule
            ],
            declarations: [
                AppComponent,
                ToolbarComponent
            ],
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [AppConfigService],
                    useFactory: (appConfigService: AppConfigService) => {
                        return () => {
                            return appConfigService.loadAppConfig();
                        };
                    }
                },
                AppComponent,
                {provide: CommunicatorService, useClass: CommunicatorMock},
                {provide: SwPush, useClass: SwPushMock},
                {provide: AppConfigService, useClass: MockConfig}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        comp = TestBed.inject(AppComponent);

        _swPush = fixture.debugElement.injector.get(SwPush);
    });

    it('should create the app', () => {
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Teco Door Control'`, () => {
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Teco Door Control');
    });

    it('should set up notifications', async () => {
        expect(pushSubscriberExists).toBe(false);
        comp.ngAfterViewInit();
        expect(pushSubscriberExists).toBe(true);

        messageSource.next("Message!")
        comp.ngAfterViewInit();
    })

    it('toggle offline status should work', () => {
        expect(comp.isOnline).toBe(true);
        comp.setNetworkOffline();
        expect(comp.isOnline).toBe(false);
        comp.setNetworkOnline();
        expect(comp.isOnline).toBe(true);
    })
});

const messageSource = new BehaviorSubject<any>("");

class SwPushMock {
    messageObservable = messageSource.asObservable();

    get messages() {
        return this.messageObservable
    }
}

let pushSubscriberExists = false;

class CommunicatorMock {
    addPushSubscriber() {
        if (!pushSubscriberExists) {
            pushSubscriberExists = true;
            return Promise.resolve()
        } else {
            return Promise.reject();
        }
    }
}

class MockConfig {
    get notificationDuration() {
        return 0;
    }

    loadAppConfig() {
    }
}
