namespace ViewModels {

  export class ArenaViewModel {
    details      : Models.IArenaDetails;
    player1      : CharacterViewModel;
    player2      : CharacterViewModel;
    activePlayer : KnockoutObservable<CharacterViewModel>;

    constructor(arena : Models.Arena) {
      
      this.details = arena.details;
      this.player1 = new ViewModels.CharacterViewModel(arena.player1);
      this.player2 = new ViewModels.CharacterViewModel(arena.player2);

      this.activePlayer = ko.observable(this.player1);

    }


    public nextPlayersTurn(): ArenaViewModel{
      
      var nextPlayer = (this.activePlayer() === this.player1 ) 
        ? this.player2 : this.player1;

      this.activePlayer(nextPlayer);
   
      return this;
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