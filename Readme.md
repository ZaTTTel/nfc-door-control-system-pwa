# TECO Door - Progressive Web-App

This is a sub-system of the [nfc-door-control-system](https://github.com/l-nn-rt/nfc-door-control-system)
project, containing only the progressive web-app. For it to function correctly, either install the rest of the project,
or feel free to create your own.

In this README, you will find everything you need to deploy (and modify) the TECO Door PWA.

If you have any remaining questions that aren't answered here, please don't hesitate to email me
at [zatttel@gmail.com](mailto:zatttel@gmail.com) or [uemqn@student.kit.edu](mailto:uemqn@student.kit.edu). I'd be glad
to take some time to help you.

## Before building or serving

### Installing necessary NPM packages

After pulling this project, you will need to install the NPM packages that we used. This can easily be done by
running `npm install` inside the project. Everything needed will be installed, except for the Angular command-line
interface.

### Installing the Angular CLI

To run, build and, in general, interact with this project, you will need to install the Angular command-line interface.
It might be the case that you already have the Angular CLI installed, try running `ng version` to check.

If the Angular CLI is not yet installed, run `npm install -g @angular/cli`.

If there is a version of the Angular CLI installed, you are good to go! However, it might be a good idea to
run `ng update` just to make sure everything is up-to-date.

### Running the Midware backend

The midware needs to be running for the PWA to function correctly.

While development, we were only able to get the PWA and the midware to communicate, when they were both being hosted on
the same server. This issue might be, because we were using self-signed certificates instead of trusted certificates
(which will supposedly be used in deployment). Nevertheless, if you are hosting midware and PWA on separate servers, and
the PWA indicates problems while performing API requests, try hosting both on the same server.

### Pointing to shared-utilities

The PWA depends on our `shared-utilities` package, which is a package used by multiple Typescript subsystems of the TECO
Door project, to ensure compatibility.

I compiled `shared-utilities` as a CommonJS package, so it _could_ be made publicly accessible. Later on, I learnt that
CommonJS and AMD dependencies
[can cause optimization bailouts in Angular](https://angular.io/guide/build#configuring-commonjs-dependencies). It is
not necessary to use `shared-utilities` as a CommonJS package, as it is not public. To follow the recommendations of the
Angular dev-team, the PWA now imports the `shared-utilities`-classes directly from their source location, instead of
linking the package using NPM.

While development, the `shared` folder could be found at `../shared`. If the that folder structure is still the same in
deployment, nothing needs to be done.

If `shared-utilities` is located somewhere else, you can change where the package is gotten from in
the [shared-utilities.ts](src/shared-utilities.ts). You could even change the source back to the CommonJS package (not
recommended), by replacing the contents to `export * from 'shared-utilties';` after
running `npm link ../shared/utilities`

## Building the app using webpack

Run `ng build` to build the app. The build artifacts will be stored in the `dist/` directory.

When built, you can host the server any way you want. One way to do this, (although I am not sure if this is the best
way for your deployment) is by using `http-server`.

You can install it by running `npm install --global http-server`, and the app can be hosted with

```
npx http-server -p 4201 --cert certificate/cert.pem --key certificate/key.pem dist -S
```

Make sure that you run this command inside the `pwa` directory and that the certificates are correct.

## The config file

Small changes in the functionality of the app can be made in the [config file](src/assets/config.json).

| Property             | Function                                                                                                                                                                                                                                      |                       Value Type                        |                                       Example / Recommended                                       | Needs rebuild on change? |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------:|:-------------------------------------------------------------------------------------------------:|:------------------------:|
| apiBaseUrl           | The URL at which the midware api can be accessed                                                                                                                                                                                              |                        `string`                         |                                 `"https://10.10.17.97:5000/api"`                                  |           No*            |
| defaultStreamQuality | The quality, at which the video-stream will be, when the app starts or is reloaded                                                                                                                                                            |             `string` - either "HD" or "SD"              |                                               `SD`                                                |           No*            |
| startWithVideoOff    | If true, the video-stream will be off when the app starts. It can then still be turned on with the toggle-camera-button                                                                                                                       |                        `boolean`                        |                                              `false`                                              |           No*            |
| videoToggleOnFocus   | If true, the video-stream will be turned off when the tab loses focus and turned on when the tab regains focus.                                                                                                                               |                        `boolean`                        |                                              `true`                                               |           No*            |
| streamAspectRatio    | Can be used to change the aspect ratio of the video-stream. The entered value should be the percentage of the height in relation to the width.                                                                                                |       `string` - a decimal number followed by "%"       |                                            `"56.25%"`                                             |           No*            |
| tapStreamToOpenDoor  | If true, tapping the video stream will open the door. This does work together with tapStreamToToggleCam, but it is recommended to limit one of the two attributes to true.                                                                    |                        `boolean`                        |                                              `true`                                               |           No*            |
| tapStreamToToggleCam | If true, tapping the video stream will toggle the camera. This does work together with tapStreamToOpenDoor, but it is recommended to limit one of the two attributes to true.                                                                 |                        `boolean`                        |                                              `false`                                              |           No*            |
| logging.console      | If true, the app will log events to the console                                                                                                                                                                                               |                        `boolean`                        |                                              `false`                                              |           No*            |
| vapidPublicKey       | This key is used to subscribe to push-notifications with SwPush. It should be associated with the encryption key in the midware.                                                                                                              |                        `string`                         |  `"BM_zJWwukVPA6D0u10Zpb AXyve4_YvoUwrKEZOg29ed IYMI6NDO8F8NW0E9tMd4na lthN1C8Q0avcql1bmgjl94"`   |           No*            |
| notificationDuration | The duration in milliseconds that are needed to pass for an arrived notification to be removed                                                                                                                                                |                        `number`                         |                                             `180000`                                              |           Yes            |
| language             | The language in which the web-app interface is displayed in, in the ISO 639-1 format (language and region as specified in [this table](https://en.wikipedia.org/wiki/Language_localisation#Language_tags_and_codes), eg. "en-US" or "fr-FR")  |                        `string`                         |                                              `"en"`                                               |           Yes            |

*You will not need to rebuild, but users of the app might have to delete app/site data for changes to take effect.

## Languages

Adding a new language is easy. Simply copy the [en.json](src/locale/en.json), change the 'locale' value and change the
translations. This can even be done by many translation software products, I used [POEditor](https://poeditor.com). When
finished, save the file in [./src/locale/](./src/locale), and add the new json to the exported list
in [languages.ts](src/locale/languages.ts).

To set this new language as active, change the 'language' value in the [config.json](src/assets/config.json) to the
value you set as 'locale' in your new json file.

The ID tags used to identify a string is a period-seperated combination of identifiers, e.g. '
NfcTags.CurrentTag.CheckTagButton'. If you're having a hard time understanding to meaning of an ID, just check the
english version to see what should be displayed to the user.

i18n has a handy way of extracting any translated strings from the entire project, compiling them into a single
translatable file. If you find yourself adding translatable strings to the project (either in .html or in .ts files),
you can refresh the [en.json](src/locale/en.json) using

```
ng extract-i18n --format json --out-file en.json --output-path src/locale
```

Please note that only strings that are marked correctly using i18n standard will be extracted. (in .html files using
the ``i18n`` attribute and in .ts files using the `$localize` function. Examples for these usages can be found all over
the project; If you use `$localize` imported from `"@angular/localize"` the translation will work fine, but they will
not be extracted - don't ask me why.)

Even though the PWA uses i18n for localization, I have made it possible to implement a way to change the language on
runtime. In [polyfills.ts](src/polyfills.ts), the correct language json is selected from
the [languages.ts](src/locale/languages.ts) and set to display
using [loadTranslations](https://angular.io/api/localize/loadTranslations). If someone wanted to allow the user to
change the language on their device, they would need to save the users choice somewhere, and use that choice
in [polyfills.ts](src/polyfills.ts) instead of the value gotten from the config.

## Unit Tests

`ng test` runs the unit tests via [Karma](https://karma-runner.github.io).

Code coverage logs will be saved in [./coverage/pwa](coverage/pwa).

## Running a development server

While developing, the app can be served (without building), to see if changed made in the code are working as intended.
Please be aware, that some functions will not be available when the app is not built. Most importantly, the Angular
service-worker will not be active. This brings a couple of small limitations to serving the app:

- The website will not be installable as a PWA
- Website notifications will not be available

After serving, the app will be available at `http(s)://localhost:${port}`, with `${port}` representing the port you are
serving on. However, if you are planning on communicating with the midware, you should open the app
at `http(s)://${IP}:${port}`, or else there will be conflicts with the midware CORS policy.

### Serve on HTTP

To locally run the app for development, run `ng serve --port ${port}` (the 'port' setting is optional). This will serve
the app using http, which means that some functions, like the NFC-Scanner will not work. Also, unless you open the site
at `http://localhost:${port}`, your browser might warn you about the unsecure connection. Most browsers let you open the
site anyway, albeit with a slightly hidden link.

Also, if the Midware is running using the HTTPS protocol, communication will not be successful, and you will likely be
stuck on the login page. A development-workaround would be to use the DummyCommunicator as described below.

If you are running the Midware, also on HTTP, remember to user 'http://' instead of 'https://'

- before the IP and port of the web-app in the midware config file
- before the IP and port of the midware in the [PWA config file](./src/assets/config.json)

If you wish to access the site on a different device from the one serving, use `ng serve --host`. If both devices are in
the same network, the site will be accessible at `http://${IP}:${port}`.

### Serve on HTTPS

Serving the app on HTTPS works very similarly to HTTP. Run `ng serve --host 0.0.0.0 --ssl --port ${port}`. This will use
the certificates provided in the [angular.json](./angular.json) (in projects/pwa/architect/serve/options).Be reminded
that the certificates only secure your connection if you are using the domain connected to your certificate, not on
localhost (unless the certificate is assigned to localhost).

When serving on HTTPS you will be able to use the NFC-Scanner when opening the site on your phone.

### Using the DummyCommunicatorService

If you do not need the midware and just want to check the web-apps functionality, you can use
the [DummyCommunicatorService](./src/app/common/services/communicators/dummy-communicator/dummy-communicator.service.ts)
. This service basically mocks the midware, by returning mocked values after waiting for a short time.

The communicator can be changed in the [environment.ts](src/environments/environment.ts).
