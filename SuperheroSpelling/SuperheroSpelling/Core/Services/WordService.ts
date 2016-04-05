/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class WordService {

    public fetchWordsByLevel(level:number): JQueryPromise<Array<Models.IWord>> {
      return $.getJSON("data/Level" + level + "Words.json");
    }


    public getRandomNWordsFromExistingArray(words: Array<Models.IWord>, n: number) : Array<Models.IWord> {
      var min = 0
        , wordCount = n
        , randomWords = [];

      for (var i = 0; i < wordCount; i++) {
        var max       = words.length - 1;
        var rand      = Math.floor(Math.random() * (max - min + 1)) + min;
        var candidate = words[rand];

        if (randomWords.indexOf(candidate) !== -1) {
          i--;
          continue;
        }

        randomWords.push(words[rand]);
      }

      return randomWords;
      
    }

    public selectRandomWordFromExistingArray(words: Array<Models.IWord>):Models.IWord{
      var min       = 0;
      var max       = words.length - 1;
      var rand      = Math.floor(Math.random() * (max - min + 1)) + min;
      return words[rand];
    }

  }
}    