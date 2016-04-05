/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class MathProblem {

    public fetchMathProblemsBylevel(level: number): JQueryPromise<Array<Models.IWord>> {
      return $.getJSON("data/Level" + level + "MathProblems.json");
    }
  }
}     