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
exports.IpAddress = void 0;
/**
 * Can be used as a {@link String} that is the format of an IP Address.
 * The class itself does not check the format, its usage simply signals the context in which it is to be used.
 *
 * @author Alex Suddendorf
 * @version 1.0
 */
var IpAddress = /** @class */ (function (_super) {
    __extends(IpAddress, _super);
    function IpAddress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IpAddress;
}(String));
exports.IpAddress = IpAddress;
