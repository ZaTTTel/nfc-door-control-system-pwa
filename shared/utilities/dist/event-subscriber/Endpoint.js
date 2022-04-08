"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
/**
 * Can be used as a {@link Uri} that represents a specific endpoint.
 * The class itself does not check the format, its usage simply signals the context in which it is to be used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
const Uri_1 = require("../Uri");
class Endpoint extends Uri_1.Uri {
}
exports.Endpoint = Endpoint;
