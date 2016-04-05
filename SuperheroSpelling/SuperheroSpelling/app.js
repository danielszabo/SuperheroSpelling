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
        function Arena(details, player1, player2, words) {
            this.details = details;
            this.player1 = player1;
            this.player2 = player2;
            this.words = words;
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
            return $.when(new Services.ArenaService().fetchArenas(), new Services.CharacterService().fetchCharacters(), new Services.WordService().fetchWordsByLevel(1))
                .done(function ($a, $b, $c) {
                var arenaDetails = $a[0];
                var characters = $b[0];
                var words = $c[0];
                var arenaDetail = arenaDetails[0];
                var character1 = characters[0];
                var character2 = characters[5];
                var wordbank = words;
                var arena = new Models.Arena(arenaDetail, character1, character2, wordbank);
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
    var MathProblem = (function () {
        function MathProblem(level, expression, accepts, usage) {
            this.level = level;
            this.expression = expression;
            this.accepts = accepts;
            this.usage = usage;
        }
        return MathProblem;
    })();
    Models.MathProblem = MathProblem;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Word = (function () {
        function Word(word, accepts, phoneticSpelling, usage, level) {
            this.word = word;
            this.accepts = accepts;
            this.phoneticSpelling = phoneticSpelling;
            this.usage = usage;
            this.level = level;
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
/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var Services;
(function (Services) {
    var MathProblem = (function () {
        function MathProblem() {
        }
        MathProblem.prototype.fetchMathProblemsBylevel = function (level) {
            return $.getJSON("data/Level" + level + "MathProblems.json");
        };
        return MathProblem;
    })();
    Services.MathProblem = MathProblem;
})(Services || (Services = {}));
/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var Services;
(function (Services) {
    var WordService = (function () {
        function WordService() {
        }
        WordService.prototype.fetchWordsByLevel = function (level) {
            return $.getJSON("data/Level" + level + "Words.json");
        };
        WordService.prototype.getRandomNWordsFromExistingArray = function (words, n) {
            var min = 0, wordCount = n, randomWords = [];
            for (var i = 0; i < wordCount; i++) {
                var max = words.length - 1;
                var rand = Math.floor(Math.random() * (max - min + 1)) + min;
                var candidate = words[rand];
                if (randomWords.indexOf(candidate) !== -1) {
                    i--;
                    continue;
                }
                randomWords.push(words[rand]);
            }
            return randomWords;
        };
        WordService.prototype.selectRandomWordFromExistingArray = function (words) {
            var min = 0;
            var max = words.length - 1;
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return words[rand];
        };
        return WordService;
    })();
    Services.WordService = WordService;
})(Services || (Services = {}));
var ViewModels;
(function (ViewModels) {
    var ArenaViewModel = (function () {
        function ArenaViewModel(arena) {
            this.details = arena.details;
            this.player1 = new ViewModels.CharacterViewModel(arena.player1);
            this.player2 = new ViewModels.CharacterViewModel(arena.player2);
            this.activePlayer = ko.observable(this.player1);
            this.showWordSelectModal = ko.observable(false);
            this.words = arena.words;
            this.random4Words = ko.observableArray([]);
        }
        ArenaViewModel.prototype.nextPlayersTurn = function () {
            var nextPlayer = (this.activePlayer() === this.player1)
                ? this.player2 : this.player1;
            this.activePlayer(nextPlayer);
            return this;
        };
        ArenaViewModel.prototype.showWordModalWithFreshWords = function () {
            var _this = this;
            this.showWordSelectModal(true);
            this.random4Words.removeAll();
            var wordService = new Services.WordService();
            var randomWords = wordService.getRandomNWordsFromExistingArray(this.words, 4);
            randomWords.forEach(function (word) {
                _this.random4Words.push(word);
            });
            this.activeWord = wordService.selectRandomWordFromExistingArray(randomWords);
            console.log("Active Word:", this.activeWord);
            return this;
        };
        ArenaViewModel.prototype.examinePlayerWordGuess = function (word) {
            console.log(this);
            console.log(word);
            console.log(this.activeWord);
            if (word.word === this.activeWord.word) {
                console.log("HIT");
                this.facilitateAttack();
                this.nextPlayersTurn();
            }
            else {
                console.log("MISS");
            }
            console.log("SI");
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