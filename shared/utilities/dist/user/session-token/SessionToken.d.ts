import { Hash } from "../../Hash";
/**
 * Can be used as a {@link Hash} (ergo as a {@link String}) that is used as a users session token to identify the users
 * authority.
 * The class itself does not hash anything, not does it check the format. Its usage simply signals the context in which
 * it is to be used.
 * @author Alex Suddendorf
 * @version 1.0
 */
export declare class SessionToken extends Hash {
}
