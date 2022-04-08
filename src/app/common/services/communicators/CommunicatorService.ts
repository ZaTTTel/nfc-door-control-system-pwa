import {EventSubscriber, LoginInfo, NfcToken, Url, Username, VideoQuality} from '../../../../shared-utilities'
import {User} from "../../util-types/user/User";

/**
 * An abstract class that allows components to interact with the midware in a certain way.
 *
 * When a method is called, a promise (sometimes for a result) is returned. This allows the caller to work
 * asynchronously while the communicator is loading
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
export abstract class CommunicatorService {

    /**
     * Used to log in a user with a username and a password, stored in info
     * @param info the login info
     * @throws {@link IncorrectPasswordError}
     */
    abstract login(info: LoginInfo): Promise<void>;

    /**
     * Used to log out the currently logged-in user
     */
    abstract logout(): Promise<void>;

    /**
     * Used to activate the camera
     */
    abstract getCamUrl(quality: VideoQuality): Promise<Url>;

    /**
     * used to open the door
     */
    abstract openDoor(): Promise<void>;

    /**
     * Used to add a specific EventSubscriber
     * @param device the eventSubscriber to add
     */
    abstract addDevice(device: EventSubscriber): Promise<void>;

    /**
     * Used to get an array of all devices
     */
    abstract getDevices(): Promise<Array<EventSubscriber>>;

    /**
     * Used to remove a specific event subscriber
     * @param device the event subscriber to remove
     */
    abstract removeDevice(device: EventSubscriber): Promise<void>;

    /**
     * Used to set the Nfc-Token of the user
     * @param user the user whose NFC-Token will be replaced
     * @param nfcToken the new NFC-Token
     */
    abstract addNfcToken(user: User, nfcToken: NfcToken): Promise<void>;

    /**
     * Used to remove the current users current Nfc-Token
     * @param user the used whose NFC-Token will be removed
     */
    abstract removeNfcToken(user: User): Promise<void>;

    /**
     * Used to get a list of all users in the system with their NFC-Tokens
     */
    abstract getUsernames(): Promise<Array<Username>>;

    /**
     * Used to check if a specific user has an NFC-Token assigned
     * @param username the username of the user to be checked
     */
    abstract userHasNfcToken(username: Username): Promise<boolean>;

    /**
     * Used to get the name of the currently logged-in user, according to the system. Returns the current user's
     * username, or undefined, if the user isn't logged in (anymore)
     */
    abstract getLoggedIn(): Promise<Username | undefined>;

    /**
     * Used to add a receiver of push notifications
     */
    abstract addPushSubscriber(): Promise<PushSubscription>;

    /**
     * Used to synchronize the NfcTokens on the door-controller
     */
    abstract manuallySyncTags(): Promise<void>;
}
