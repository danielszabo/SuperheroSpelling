/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class ArenaService {

    public fetchArenas() : JQueryPromise<Array<Models.IArenaDetails>> {

      return $.getJSON("data/Arenas.json");
    }
  }
}  