var Models;
(function (Models) {
    var Character = (function () {
        function Character(name, pictures, stats, weapons) {
            this.name = name;
            this.pictures = pictures;
            this.stats = stats;
            this.weapons = weapons;
        }
        return Character;
    })();
    Models.Character = Character;
})(Models || (Models = {}));
/// <reference path="../models/character.ts" />
var Models;
(function (Models) {
    var Arena = (function () {
        function Arena(details, player1, player2) {
            this.details = details;
            this.player1 = player1;
            this.player2 = player2;
        }
        return Arena;
    })();
    Models.Arena = Arena;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Game = (function () {
        function Game() {
            window["game"] = this;
            window["Game"] = this;
        }
        Game.prototype.runTest = function () {
            var self = this;
            return $.when(new Services.ArenaService().fetchArenas(), new Services.CharacterService().fetchCharacters())
                .done(function ($a, $b) {
                var arenaDetails = $a[0];
                var characters = $b[0];
                var arenaDetail = arenaDetails[0];
                var character1 = characters[0];
                var character2 = characters[1];
                var arena = new Models.Arena(arenaDetail, character1, character2);
                var arenaViewModel = new ViewModels.ArenaViewModel(arena);
                self.arena = arenaViewModel;
                ko.applyBindings(arenaViewModel, document.getElementById("arena"));
            });
        };
        return Game;
    })();
    Models.Game = Game;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Word = (function () {
        function Word(word, phoneticSpelling, exampleSentence) {
            this.word = word;
            this.phoneticSpelling = phoneticSpelling;
            this.exampleSentence = exampleSentence;
        }
        return Word;
    })();
    Models.Word = Word;
})(Models || (Models = {}));
/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var Services;
(function (Services) {
    var ArenaService = (function () {
        function ArenaService() {
        }
        ArenaService.prototype.fetchArenas = function () {
            return $.getJSON("data/Arenas.json");
        };
        return ArenaService;
    })();
    Services.ArenaService = ArenaService;
})(Services || (Services = {}));
/// <reference path="../models/character.ts" />
var Services;
(function (Services) {
    var AttackService = (function () {
        function AttackService() {
        }
        AttackService.prototype.attack = function (attacker, attackee) {
            var attackeeHealth = attackee.stats.health();
            attackeeHealth -= 1;
            attackee.stats.health((attackeeHealth < 0) ? 0 : attackeeHealth);
            return this;
        };
        return AttackService;
    })();
    Services.AttackService = AttackService;
})(Services || (Services = {}));
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
/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var Services;
(function (Services) {
    var CharacterService = (function () {
        function CharacterService() {
        }
        CharacterService.prototype.fetchCharacters = function () {
            return $.getJSON("data/Characters.json");
        };
        return CharacterService;
    })();
    Services.CharacterService = CharacterService;
})(Services || (Services = {}));
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
/// <reference path="arenaservice.ts" />
/// <reference path="attackservice.ts" />
/// <reference path="buffservice.ts" />
/// <reference path="castservice.ts" />
/// <reference path="characterservice.ts" />
/// <reference path="healservice.ts" />
var ViewModels;
(function (ViewModels) {
    var ArenaViewModel = (function () {
        function ArenaViewModel(arena) {
            this.details = arena.details;
            this.player1 = new ViewModels.CharacterViewModel(arena.player1);
            this.player2 = new ViewModels.CharacterViewModel(arena.player2);
            this.activePlayer = ko.observable(this.player1);
        }
        ArenaViewModel.prototype.nextPlayersTurn = function () {
            var nextPlayer = (this.activePlayer() === this.player1)
                ? this.player2 : this.player1;
            this.activePlayer(nextPlayer);
            return this;
        };
        ArenaViewModel.prototype.facilitateAttack = function () {
            var attacker = this.activePlayer();
            var attackee = this.player1 === attacker ? this.player2 : this.player1;
            var svc = new Services.AttackService();
            svc.attack(attacker, attackee);
            return this;
        };
        ArenaViewModel.prototype.facilitateBuff = function () {
            var buffer = this.activePlayer();
            var buffee = this.player1 === buffer ? this.player2 : this.player1;
            var svc = new Services.BuffService();
            svc.buff(buffer, buffee);
            return this;
        };
        ArenaViewModel.prototype.facilitateCast = function () {
            var caster = this.activePlayer();
            var castee = this.player1 === caster ? this.player2 : this.player1;
            var svc = new Services.CastService();
            svc.cast(caster, castee);
            return this;
        };
        ArenaViewModel.prototype.facilitateHeal = function () {
            var healer = this.activePlayer();
            var healee = this.player1 === healer ? this.player2 : this.player1;
            var svc = new Services.HealService();
            svc.heal(healer, healee);
            return this;
        };
        return ArenaViewModel;
    })();
    ViewModels.ArenaViewModel = ArenaViewModel;
})(ViewModels || (ViewModels = {}));
var ViewModels;
(function (ViewModels) {
    var CharacterViewModel = (function () {
        function CharacterViewModel(character) {
            var _this = this;
            var self = this;
            this.name = ko.observable(character.name);
            this.pictures = {
                fullbody: character.pictures.fullbody,
                portrait: character.pictures.portrait
            };
            this.stats = {
                battery: ko.observable(character.stats.battery),
                health: ko.observable(character.stats.health),
                shields: ko.observable(character.stats.shields),
                strength: ko.observable(character.stats.strength)
            };
            this.healthRepeated = ko.computed(function () {
                var health = _this.stats.health();
                return new Array((health > 0) ? health : 0);
            });
            console.log(this.pictures.fullbody);
        }
        return CharacterViewModel;
    })();
    ViewModels.CharacterViewModel = CharacterViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=app.js.map