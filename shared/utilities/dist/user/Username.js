"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
/**
 * Can be used as a {@link Name} (ergo as a {@link String}) that is used as a username.
 * The class itself does not check the validity of the usernames format, its usage simply signals the context in which
 * it is to be used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
const Name_1 = require("../Name");
class Username extends Name_1.Name {
}
exports.Username = Username;
