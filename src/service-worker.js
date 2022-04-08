/**
 * This service-worker imports all other service workers needed.
 *
 * Most importantly, the ngsw-worker.js is needed to install the site as a PWA and other things.
 */

importScripts('./ngsw-worker.js');

importScripts('./push-notification-sw.js');
