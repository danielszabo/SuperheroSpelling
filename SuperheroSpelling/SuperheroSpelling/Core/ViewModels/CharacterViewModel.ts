namespace ViewModels {

  export interface ICharacterPicturesViewModel{
    fullbody : string;
    portrait : string;  
  }

  export interface ICharacterStatsViewModel {
    battery : KnockoutObservable<number>;
    health  : KnockoutObservable<number>;
    shields : KnockoutObservable<number>;
    strength: KnockoutObservable<number>;
  }

  export class CharacterViewModel {
    name           : KnockoutObservable<string>;
    pictures       : ICharacterPicturesViewModel;
    stats          : ICharacterStatsViewModel;
    healthRepeated : any;
    
    constructor(character : Models.ICharacter) {
      var self   = this;
      this.name  = ko.observable(character.name);
      this.pictures = {
        fullbody : character.pictures.fullbody,
        portrait : character.pictures.portrait
      };
      this.stats = {
        battery : ko.observable(character.stats.battery),
        health  : ko.observable(character.stats.health),
        shields : ko.observable(character.stats.shields),
        strength: ko.observable(character.stats.strength)
      };
    
      this.healthRepeated = ko.computed(() => {
        var health = this.stats.health();
        return new Array((health > 0) ? health : 0);
      });  

      console.log(this.pictures.fullbody);
    }

  }
} 