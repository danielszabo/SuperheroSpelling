namespace Models {


  export interface IGame {
    arena  : ViewModels.ArenaViewModel;
    heroSelect : ViewModels.HeroSelectViewModel;
  }


  export class Game implements IGame {
    public arena      : ViewModels.ArenaViewModel;
    public heroSelect : ViewModels.HeroSelectViewModel;

    constructor(){

      window["game"] = this;
      window["Game"] = this;

    }

    runHeroSelectTest(){
      var self = this;
      
      return new Services.CharacterService().fetchCharacters()
        .then(function(characters){

          var heroSelectScrn = new ViewModels.HeroSelectViewModel(characters);

          self.heroSelect = heroSelectScrn;

          ko.applyBindings(
            self.heroSelect, 
            document.getElementById("HeroSelect"));
        });
    }


    runArenaTest() {
      var self = this;
      
      return $.when<any>(
        new Services.ArenaService().fetchArenas(),
        new Services.CharacterService().fetchCharacters(),
        new Services.WordService().fetchWordsByLevel(1),
        new Services.MathProblemService().fetchMathProblemsBylevel(1))
      .done(function($a,$b,$c,$d){
        // Position 0 in jquery params is response payload
        var arenaDetails = $a[0];
        var characters   = $b[0];
        var words        = $c[0];
        var mathProblems = $d[0];

        var arenaDetail  = arenaDetails[0];
        var character1 : Models.ICharacter = characters[0];
        var character2 : Models.ICharacter = characters[5];
        var wordbank     = words;
        var mathProblems = mathProblems;

        // run late check to see if the user has already
        // selected another character from another screen.
        var userHasAlreadySelectedCharacter = localStorage.getItem("SelectedCharacter");
        if (userHasAlreadySelectedCharacter){
          console.warn("USER HAS ALREADY CHOSEN CHARACTER");
          character1 = JSON.parse( localStorage.getItem("SelectedCharacter") );
        }


        var arena = new Models.Arena(arenaDetail, character1, character2, wordbank, mathProblems);
        var arenaViewModel = new ViewModels.ArenaViewModel(arena);

        self.arena = arenaViewModel;

        ko.applyBindings(arenaViewModel, document.getElementById("arena"));
        
      });
      
      
    }

  }
} 