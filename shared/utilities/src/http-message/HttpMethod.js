"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = void 0;
/**
 * Represents the type of a http request.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod[HttpMethod["POST"] = 0] = "POST";
    HttpMethod[HttpMethod["GET"] = 1] = "GET";
    HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
    HttpMethod[HttpMethod["PATCH"] = 3] = "PATCH";
    HttpMethod[HttpMethod["DELETE"] = 4] = "DELETE";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
