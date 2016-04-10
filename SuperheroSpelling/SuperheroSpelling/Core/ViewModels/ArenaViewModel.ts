namespace ViewModels {

  export class ArenaViewModel {
    details             : Models.IArenaDetails;
    player1             : CharacterViewModel;
    player2             : CharacterViewModel;
    activePlayer        : KnockoutObservable<CharacterViewModel>;
    activeWord          : Models.IWord;
    words               : Array<Models.IWord>;
    mathProblems        : Array<Models.IMathProblem>;
    random4Words        : KnockoutObservableArray<Models.IWord>;
    random4Numbers      : KnockoutObservableArray<number>;
    activeMathProblem   : KnockoutObservable<Models.IMathProblem>
    showWordSelectModal : KnockoutObservable<boolean>;
    showMathProblemModal: KnockoutObservable<boolean>;

    constructor(arena : Models.Arena) {
      
      this.details      = arena.details;
      this.player1      = new ViewModels.CharacterViewModel(arena.player1);
      this.player2      = new ViewModels.CharacterViewModel(arena.player2);
      this.activePlayer = ko.observable(this.player1);

      this.showWordSelectModal = ko.observable(false);
      this.showMathProblemModal= ko.observable(false);
      
      this.words        = arena.words;
      this.mathProblems = arena.mathProblems;

      this.random4Words      = ko.observableArray([]);
      this.activeMathProblem = ko.observable(new Models.MathProblem(1,"0+0",0,""));
      this.random4Numbers    = ko.observableArray([]);
    }

    

    public nextPlayersTurn(): ArenaViewModel{
      
      var nextPlayer = (this.activePlayer() === this.player1 ) 
        ? this.player2 : this.player1;

      this.activePlayer(nextPlayer);
   
      return this;
    }

    public showWordModalWithFreshWords() : ArenaViewModel{
      // hide all windows to start fresh
      this.hideAllModals();
      
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

    public showMathProblemModalWithFreshMathProblem() : ArenaViewModel{

      // hide all windows to start fresh
      this.hideAllModals();
      this.showMathProblemModal(true);

      // Clear the list of selectable math problem answers
      this.random4Numbers.removeAll();

      var mathService = new Services.MathProblemService();
      var candidateRandomAnswers = [];

      // Get a random math problem to display and make
      // sure that it isn't the last selected problem
      var candidateMathProblem = mathService.getRandomMathProblemFromExistingArray(this.mathProblems);
      var currentMathProblem   = this.activeMathProblem();

      if ( candidateMathProblem === currentMathProblem ){
        while (candidateMathProblem !== currentMathProblem ){
          candidateMathProblem = mathService.getRandomMathProblemFromExistingArray(this.mathProblems);  
        }
      }

      this.activeMathProblem(candidateMathProblem);
      console.log("Active Math Problem: ", this.activeMathProblem());

      // Record the ansewr to the selected problem into the list
      // of answers the user can choose from when answering the question
      candidateRandomAnswers.push(this.activeMathProblem().accepts);


      /**
       * Dynamically choose the algorithm that gets used to genearate
       * a random list of answers to the math problem.
       */
      var numberOfAnswerGeneratorAlgos = 4;
      var chosenAlgoIndex = mathService.getRandomIntInRange(1, numberOfAnswerGeneratorAlgos)

      if ( 1 === chosenAlgoIndex ){
        while (candidateRandomAnswers.length < 5) {

          var candidateRandomAnswer = mathService.getRandomIntInRange(
            this.activeMathProblem().accepts - 4, 
            this.activeMathProblem().accepts + 4);
          
          if (candidateRandomAnswers.indexOf(candidateRandomAnswer) === -1 ){
            candidateRandomAnswers.push(candidateRandomAnswer);  
          }
        }
      } 
      else if ( 2 === chosenAlgoIndex ){
        var candidatePrevNumbers = mathService.getPreviousNNumbersFromN(4, candidateMathProblem.accepts);
        candidateRandomAnswers = candidateRandomAnswers.concat(candidatePrevNumbers);
      }
      else if ( 3 === chosenAlgoIndex ){
        var candidateNextNumbers = mathService.getNextNNumbersFromN(4, candidateMathProblem.accepts);
        candidateRandomAnswers = candidateRandomAnswers.concat(candidateNextNumbers);
      }
      else if ( 4 === chosenAlgoIndex ){
        var candidatePrevAndNextNumbers = mathService.getPreviousNAndNextNNumbersFromN(2, 2, candidateMathProblem.accepts);
        candidateRandomAnswers = candidateRandomAnswers.concat(candidatePrevAndNextNumbers);
      }

      mathService.shuffleArrayOfNumbers(candidateRandomAnswers);
      this.random4Numbers(candidateRandomAnswers);
      

      return this;
    }

    public hideWordModal(){
      this.showWordSelectModal(false);  
    }

    public hideAllModals(){
      this.showWordSelectModal(false);
      this.showMathProblemModal(false);  
    }

    public examinePlayerWordGuess = (word : Models.IWord) =>{
      console.log(this);
      console.log(word);
      console.log(this.activeWord);
      if ( word.word === this.activeWord.word ){
        console.log("HIT");
        this.facilitateAttack();
        this.nextPlayersTurn();
        this.hideWordModal();
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