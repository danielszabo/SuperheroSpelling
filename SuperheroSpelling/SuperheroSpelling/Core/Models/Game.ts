namespace Models {


  export interface IGame {
    arena  : ViewModels.ArenaViewModel;
  }


  export class Game implements IGame {
    public arena         : ViewModels.ArenaViewModel;

    constructor(){

      window["game"] = this;
      window["Game"] = this;

    }

    runTest() {
      var self = this;
      
      return $.when<any>(
        new Services.ArenaService().fetchArenas(),
        new Services.CharacterService().fetchCharacters())
      .done(function($a,$b){
        // Position 0 in jquery params is response payload
        var arenaDetails = $a[0];
        var characters   = $b[0];
        
        var arenaDetail = arenaDetails[0];
        var character1  = characters[0];
        var character2  = characters[1];

        var arena = new Models.Arena(arenaDetail, character1, character2);
        var arenaViewModel = new ViewModels.ArenaViewModel(arena);

        self.arena = arenaViewModel;

        ko.applyBindings(arenaViewModel, document.getElementById("arena"));
        
      });
      
      
    }

  }
} 