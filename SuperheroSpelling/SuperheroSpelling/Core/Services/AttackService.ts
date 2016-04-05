/// <reference path="../models/character.ts" />
namespace Services{

  export class AttackService  {
  
    public attack (
      attacker : ViewModels.CharacterViewModel,
      attackee : ViewModels.CharacterViewModel) 
      : AttackService 
    {

      var attackeeHealth = attackee.stats.health();
      attackeeHealth -= 1;

      // health can never be less than zero
      attackee.stats.health( (attackeeHealth < 0) ? 0 : attackeeHealth );

      return this;
    }
  }
} 