// get the notification duration from the config file
const notifDuration = parseInt(new URL(location).searchParams.get('notificationDuration'))


self.addEventListener('push', (event) => {
    const dateOfArrival = event.data.json().notification.data.dateOfArrival
    // close all notifications except the one that just arrived
    closeAllNotificationsExcept(dateOfArrival)
    setTimeout(() => {
        // after notifDuration, close the notification in question
        closeNotification(dateOfArrival);
    }, notifDuration)
});

/**
 * Close all notifications except for the ones with a specific date of arrival
 * @param exceptDateOfArrival the date of arrival to except
 */
function closeAllNotificationsExcept(exceptDateOfArrival) {
    self.registration.getNotifications().then(n => {
        for (let i = 0; i < n.length; i += 1) {
            if (n[i].data.dateOfArrival !== exceptDateOfArrival) {
                n[i]?.close();
            }
        }
    });
}

/**
 * Close a notification with a specific date of arrival
 * @param dateOfArrival the date of arrival of the notification to delete
 */
function closeNotification(dateOfArrival) {
    self.registration.getNotifications().then(n => {
        n.find(n => {
            return n.data.dateOfArrival === dateOfArrival
        })?.close()
    });
}
