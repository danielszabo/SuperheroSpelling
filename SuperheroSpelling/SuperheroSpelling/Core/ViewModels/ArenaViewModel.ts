namespace ViewModels {

  export class ArenaViewModel {
    details             : Models.IArenaDetails;
    player1             : CharacterViewModel;
    player2             : CharacterViewModel;
    activePlayer        : KnockoutObservable<CharacterViewModel>;
    activeWord          : Models.IWord;
    words               : Array<Models.IWord>;
    random4Words        : KnockoutObservableArray<Models.IWord>;
    showWordSelectModal : KnockoutObservable<boolean>;

    constructor(arena : Models.Arena) {
      
      this.details      = arena.details;
      this.player1      = new ViewModels.CharacterViewModel(arena.player1);
      this.player2      = new ViewModels.CharacterViewModel(arena.player2);
      this.activePlayer = ko.observable(this.player1);

      this.showWordSelectModal = ko.observable(false);
      
      this.words        = arena.words;
      this.random4Words = ko.observableArray([]);
    }

    

    public nextPlayersTurn(): ArenaViewModel{
      
      var nextPlayer = (this.activePlayer() === this.player1 ) 
        ? this.player2 : this.player1;

      this.activePlayer(nextPlayer);
   
      return this;
    }

    public showWordModalWithFreshWords() : ArenaViewModel{
      this.showWordSelectModal(true);  

      // Clear existing word list
      this.random4Words.removeAll();

      var wordService = new Services.WordService();

      // Generate new list of words to display
      var randomWords = wordService.getRandomNWordsFromExistingArray(this.words, 4);
      
      // Populate observable with new words
      randomWords.forEach((word) =>{
        this.random4Words.push(word);
      });

      this.activeWord = wordService.selectRandomWordFromExistingArray(randomWords);
      console.log("Active Word:" , this.activeWord);
      return this;
    }

    public examinePlayerWordGuess(word : Models.IWord) {
      console.log(this);
      console.log(word);
      console.log(this.activeWord);
      if ( word.word === this.activeWord.word ){
        console.log("HIT");
        this.facilitateAttack();
        this.nextPlayersTurn();  
      }
      else{
        console.log("MISS");  
      }

      console.log("SI");
    }


    public facilitateAttack(): ArenaViewModel {
      var attacker: CharacterViewModel = this.activePlayer();
      var attackee: CharacterViewModel = this.player1 === attacker ? this.player2 : this.player1;

      var svc = new Services.AttackService();
      svc.attack(attacker, attackee);

      return this;
    }

    public facilitateBuff(): ArenaViewModel {
      var buffer: CharacterViewModel = this.activePlayer();
      var buffee: CharacterViewModel = this.player1 === buffer ? this.player2 : this.player1;

      var svc = new Services.BuffService()
      svc.buff(buffer, buffee);

      return this;
    }

    public facilitateCast(): ArenaViewModel {
      var caster: CharacterViewModel = this.activePlayer();
      var castee: CharacterViewModel = this.player1 === caster ? this.player2 : this.player1;

      var svc = new Services.CastService();
      svc.cast(caster, castee);

      return this;
    }

    public facilitateHeal(): ArenaViewModel {
      var healer: CharacterViewModel = this.activePlayer();
      var healee: CharacterViewModel = this.player1 === healer ? this.player2 : this.player1;

      var svc = new Services.HealService();
      svc.heal(healer, healee);

      return this;
    }
  }
} 