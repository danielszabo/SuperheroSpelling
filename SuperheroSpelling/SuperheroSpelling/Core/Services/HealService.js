/// <reference path="../models/character.ts" />
var Services;
(function (Services) {
    var HealService = (function () {
        function HealService() {
        }
        HealService.prototype.heal = function (healer, healee) {
            return this;
        };
        return HealService;
    })();
    Services.HealService = HealService;
})(Services || (Services = {}));
//# sourceMappingURL=HealService.js.map