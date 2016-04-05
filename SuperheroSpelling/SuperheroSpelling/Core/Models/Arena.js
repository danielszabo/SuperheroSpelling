/// <reference path="../models/character.ts" />
var Models;
(function (Models) {
    var Arena = (function () {
        function Arena(details, player1, player2) {
            this.details = details;
            this.player1 = player1;
            this.player2 = player2;
            this.buffService = new Services.BuffService();
            this.healService = new Services.HealService();
            this.attackService = new Services.AttackService();
            this.castService = new Services.CastService();
        }
        Arena.prototype.facilitateAttack = function () {
            var attacker = this.activePlayer;
            var attackee = this.player1 === this.activePlayer ? this.player2 : this.player1;
            this.attackService.attack(attacker, attackee);
            return this;
        };
        Arena.prototype.facilitateBuff = function () {
            var buffer = this.activePlayer;
            var buffee = this.player1 === this.activePlayer ? this.player2 : this.player1;
            this.buffService.buff(buffer, buffee);
            return this;
        };
        Arena.prototype.facilitateCast = function () {
            var caster = this.activePlayer;
            var castee = this.player1 === this.activePlayer ? this.player2 : this.player1;
            this.castService.cast(caster, castee);
            return this;
        };
        Arena.prototype.facilitateHeal = function () {
            var healer = this.activePlayer;
            var healee = this.player1 === this.activePlayer ? this.player2 : this.player1;
            this.healService.heal(healer, healee);
            return this;
        };
        return Arena;
    })();
    Models.Arena = Arena;
})(Models || (Models = {}));
//# sourceMappingURL=Arena.js.map