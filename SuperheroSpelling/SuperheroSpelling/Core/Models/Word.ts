namespace Models {

  export interface IWord {
    word             : string;
    accepts          : Array<string>;
    phoneticSpelling : string;
    usage            : string;
    level            : number;
  }

  export class Word implements IWord{
    word             : string;
    accepts          : Array<string>;
    phoneticSpelling : string;
    usage            : string;
    level            : number;

    constructor(
      word            : string, 
      accepts         : Array<string>, 
      phoneticSpelling: string, 
      usage           : string, 
      level           : number) 
    {
      this.word             = word;
      this.accepts          = accepts;
      this.phoneticSpelling = phoneticSpelling;
      this.usage            = usage;
      this.level            = level;
    }
  }
} 