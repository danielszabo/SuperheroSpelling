/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class WordService {

    public fetchWordsByLevel(level:number): JQueryPromise<Array<Models.IWord>> {
      return $.getJSON("data/Level" + level + "Words.json");
    }
  }
}    