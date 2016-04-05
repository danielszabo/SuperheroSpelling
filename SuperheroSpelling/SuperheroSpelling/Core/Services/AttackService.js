/// <reference path="../models/character.ts" />
var Services;
(function (Services) {
    var AttackService = (function () {
        function AttackService() {
        }
        AttackService.prototype.attack = function (attacker, attackee) {
            return this;
        };
        return AttackService;
    })();
    Services.AttackService = AttackService;
})(Services || (Services = {}));
//# sourceMappingURL=AttackService.js.map