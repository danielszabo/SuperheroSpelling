/// <reference path="../models/character.ts" />
var Services;
(function (Services) {
    var CastService = (function () {
        function CastService() {
        }
        CastService.prototype.cast = function (caster, castee) {
            return this;
        };
        return CastService;
    })();
    Services.CastService = CastService;
})(Services || (Services = {}));
//# sourceMappingURL=CastService.js.map