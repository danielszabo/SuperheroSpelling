/// <reference path="../models/character.ts" />
var Services;
(function (Services) {
    var BuffService = (function () {
        function BuffService() {
        }
        BuffService.prototype.buff = function (buffer, buffee) {
            return this;
        };
        return BuffService;
    })();
    Services.BuffService = BuffService;
})(Services || (Services = {}));
//# sourceMappingURL=BuffService.js.map