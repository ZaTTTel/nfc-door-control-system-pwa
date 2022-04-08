import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ToolbarComponent} from './navigation/toolbar/toolbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CommunicatorService} from "./common/services/communicators/CommunicatorService";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {LoggerService} from "./common/services/logger/logger.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HomePageComponent} from './pages/toolbar-pages/home-page/home-page.component';
import {MatRippleModule} from "@angular/material/core";
import {
    DummyVideoComponent
} from './pages/toolbar-pages/home-page/camera-and-door/video-stream/dummy-video/dummy-video.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {PopUpService} from "./common/services/pop-up/pop-up.service";
import {OnlineStatusService} from "ngx-online-status";
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {SideNavContentComponent} from './navigation/side-nav/side-nav-content/side-nav-content.component';
import {MatListModule} from "@angular/material/list";
import {NfcTokenPageComponent} from './pages/toolbar-pages/nfc-token-page/nfc-token-page.component';
import {ReadNfcTokenComponent} from './pages/toolbar-pages/nfc-token-page/read-nfc-token/read-nfc-token.component';
import {
    ChangeUserComponent,
    ChangeUserInfoDialog
} from './pages/toolbar-pages/nfc-token-page/current-user/change-user/change-user.component';
import {NfcTokenScannerService} from "./common/services/nfc-token-scanner/NfcTokenScannerService";
import {
    WebNfcTokenScannerService
} from "./common/services/nfc-token-scanner/web-nfc-token-scanner/web-nfc-token-scanner.service";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {
    SetNfcTokenDialog
} from './pages/toolbar-pages/nfc-token-page/read-nfc-token/set-nfc-token/set-nfc-token-dialog.component';
import {MatCardModule} from "@angular/material/card";
import {LoadingBarComponent} from './common/components/loading-bar/loading-bar.component';
import {
    CurrentNfcTokenComponent
} from './pages/toolbar-pages/nfc-token-page/current-nfc-token/current-nfc-token.component';
import {
    DeleteNfcTokenButtonComponent,
    DeleteNfcTokenConfirmationDialog
} from './pages/toolbar-pages/nfc-token-page/current-nfc-token/delete-nfc-token-button/delete-nfc-token-button.component';
import {MatTreeModule} from "@angular/material/tree";
import {LoginStatusService} from "./common/services/login-status/login-status.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {CurrentUserComponent} from './pages/toolbar-pages/nfc-token-page/current-user/current-user.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {A11yModule} from "@angular/cdk/a11y";
import {SwitchUserStatusService} from "./common/services/switch-user-status/switch-user-status.service";
import {NfcTokenDisplayComponent} from "./common/components/nfc-token-display/nfc-token-display.component";
import {
    CheckNfcTokenInfoDialog,
    UserHasNfcTokenButtonComponent
} from "./pages/toolbar-pages/nfc-token-page/current-nfc-token/user-has-nfc-token-button/user-has-nfc-token-button.component";
import {DevicesPageComponent} from './pages/toolbar-pages/devices-page/devices-page.component';
import {DevicesListComponent} from './pages/toolbar-pages/devices-page/devices-list/devices-list.component';
import {MatTableModule} from "@angular/material/table";
import {
    DeleteDeviceConfirmationDialog,
    DeviceListItemComponent
} from './pages/toolbar-pages/devices-page/devices-list/device-list-item/device-list-item.component';
import {MatMenuModule} from "@angular/material/menu";
import {
    AddDeviceButtonComponent
} from './pages/toolbar-pages/devices-page/add-device-button/add-device-button.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {
    RtspVideoComponent
} from './pages/toolbar-pages/home-page/camera-and-door/video-stream/rtsp-video/rtsp-video.component';
import {HttpClientModule} from "@angular/common/http";
import {
    InputDeviceInfoDialog
} from "./pages/toolbar-pages/devices-page/input-device-info-dialog/input-device-info-dialog.component";
import {MatSelectModule} from "@angular/material/select";
import {OfflinePageComponent} from './pages/offline-page/offline-page.component';
import {CameraAndDoorComponent} from './pages/toolbar-pages/home-page/camera-and-door/camera-and-door.component';
import {
    VideoStreamComponent
} from './pages/toolbar-pages/home-page/camera-and-door/video-stream/video-stream.component';
import {
    FullscreenPlayerDialog
} from './pages/toolbar-pages/home-page/camera-and-door/fullscreen-player/fullscreen-player-dialog.component';
import {
    FullscreenButtonComponent
} from './pages/toolbar-pages/home-page/camera-and-door/camera-and-door-buttons/fullscreen-button/fullscreen-button.component';
import {
    ChangeQualityButtonComponent
} from './pages/toolbar-pages/home-page/camera-and-door/camera-and-door-buttons/change-quality-button/change-quality-button.component';
import {
    ToggleCameraButtonComponent
} from './pages/toolbar-pages/home-page/camera-and-door/camera-and-door-buttons/toggle-camera-button/toggle-camera-button.component';
import {
    OpenDoorButtonComponent
} from "./pages/toolbar-pages/home-page/camera-and-door/camera-and-door-buttons/open-door-button/open-door-button.component";
import {AppConfigService} from "./common/services/app-config/app-config.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {
    NfcScanHelpDialog
} from "./pages/toolbar-pages/nfc-token-page/read-nfc-token/nfc-scan-help/nfc-scan-help.component";
import {
    ManualTokenEntryDialog
} from './pages/toolbar-pages/nfc-token-page/read-nfc-token/nfc-scan-help/manual-nfc-entry/manual-token-entry-dialog.component';
import {
    ManualSyncButtonComponent
} from './pages/toolbar-pages/nfc-token-page/read-nfc-token/nfc-scan-help/manual-sync-button/manual-sync-button.component';
import {InputPasswordDialog} from "./common/services/input-password-dialog/input-password-dialog.service";
import config from "../assets/config.json"
import {HelpDialog} from "./common/services/help-dialog/help-dialog.service";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        LoginPageComponent,
        HomePageComponent,
        DummyVideoComponent,
        SideNavContentComponent,
        NfcTokenPageComponent,
        ReadNfcTokenComponent,
        ChangeUserComponent,
        SetNfcTokenDialog,
        LoadingBarComponent,
        CurrentNfcTokenComponent,
        DeleteNfcTokenButtonComponent,
        CurrentUserComponent,
        DeleteNfcTokenConfirmationDialog,
        CheckNfcTokenInfoDialog,
        ChangeUserInfoDialog,
        DeleteDeviceConfirmationDialog,
        NfcScanHelpDialog,
        NfcTokenDisplayComponent,
        UserHasNfcTokenButtonComponent,
        DevicesPageComponent,
        DevicesListComponent,
        DeviceListItemComponent,
        AddDeviceButtonComponent,
        RtspVideoComponent,
        InputDeviceInfoDialog,
        OfflinePageComponent,
        CameraAndDoorComponent,
        VideoStreamComponent,
        FullscreenPlayerDialog,
        FullscreenButtonComponent,
        ChangeQualityButtonComponent,
        ToggleCameraButtonComponent,
        OpenDoorButtonComponent,
        ManualTokenEntryDialog,
        ManualSyncButtonComponent,
        InputPasswordDialog,
        HelpDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatRippleModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        // register the service worker, but with the notification duration value, so that it knows how long
        // notifications need to be displayed
        ServiceWorkerModule.register('service-worker.js?notificationDuration=' + config.notificationDuration, {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatSidenavModule,
        MatListModule,
        MatDialogModule,
        MatCardModule,
        MatTreeModule,
        MatExpansionModule,
        MatAutocompleteModule,
        A11yModule,
        MatTableModule,
        MatMenuModule,
        ScrollingModule,

        HttpClientModule,
        MatSelectModule,
        MatTooltipModule
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

        {provide: CommunicatorService, useClass: environment.communicator},
        {provide: NfcTokenScannerService, useClass: WebNfcTokenScannerService},
        LoggerService,
        PopUpService,
        LoginStatusService,
        SwitchUserStatusService,

        // these providers allow the usage of MatSnackBar
        MatSnackBar,
        Overlay,

        // this provider allows checking the current online status
        OnlineStatusService,

        // this provider is used to display the material sidenav
        MatSidenavContainer,

        // this provider is used to display pop-up dialogs to communicate with the user
        MatDialog,
        MatDialogConfig

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
