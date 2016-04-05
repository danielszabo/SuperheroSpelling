namespace Models {


  export interface ICharacter{
    name     : string;
    pictures : ICharacterPictures;
    stats    : ICharacterStats;
    weapons  : Array<any>;
  }
  
  export interface ICharacterPictures{
    fullbody : string;
    portrait : string;  
  }

  export interface ICharacterStats {
    battery  : number;
    health   : number;
    shields  : number;
    strength : number;
  }

  export interface ICharacterWeapons{
    
  }

  export class Character implements ICharacter{
    name     : string;
    pictures : ICharacterPictures;
    stats    : ICharacterStats;
    weapons  : Array<any>;

    constructor(name : string, pictures : ICharacterPictures, stats: ICharacterStats, weapons : Array<ICharacterWeapons>) {
      this.name     = name;
      this.pictures = pictures;
      this.stats    = stats;
      this.weapons  = weapons;
    }
  }
}