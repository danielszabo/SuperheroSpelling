namespace Models {

  export interface IWord {
    word             : string;
    phoneticSpelling : string;
    exampleSentence  : string;
  }

  export class Word implements IWord{
    word             : string;
    phoneticSpelling : string;
    exampleSentence  : string;

    constructor(word: string, phoneticSpelling: string, exampleSentence: string) {
      this.word             = word;
      this.phoneticSpelling = phoneticSpelling;
      this.exampleSentence  = exampleSentence;
    }
  }
} 