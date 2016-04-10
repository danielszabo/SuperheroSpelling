namespace Models {

  export interface ISaveFile {
    
  }

  export interface ICharacterProgress{
    character : Models.ICharacter;
    level     : number;  
  }

  export class SaveFile implements ISaveFile {
    name      : string;
    level     : number;
    character : Array<Models.ICharacterProgress>;

    constructor(){
      
    }
  }
}   