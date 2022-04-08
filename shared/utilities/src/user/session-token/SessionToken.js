"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionToken = void 0;
var Hash_1 = require("../../Hash");
/**
 * Can be used as a {@link Hash} (ergo as a {@link String}) that is used as a users session token to identify the users
 * authority.
 * The class itself does not hash anything, not does it check the format. Its usage simply signals the context in which
 * it is to be used.
 * @author Alex Suddendorf
 * @version 1.0
 */
var SessionToken = /** @class */ (function (_super) {
    __extends(SessionToken, _super);
    function SessionToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SessionToken;
}(Hash_1.Hash));
exports.SessionToken = SessionToken;
