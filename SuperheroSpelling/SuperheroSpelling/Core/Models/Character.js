var Models;
(function (Models) {
    var Character = (function () {
        function Character(name, stats) {
            this.name = name;
            this.stats = stats;
            this.isActive = false;
        }
        return Character;
    })();
    Models.Character = Character;
})(Models || (Models = {}));
//# sourceMappingURL=character.js.map