/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class CharacterService {

    public fetchCharacters(): JQueryPromise<Array<Models.ICharacter>> {
      return $.getJSON("data/Characters.json");
    }
  }
}   