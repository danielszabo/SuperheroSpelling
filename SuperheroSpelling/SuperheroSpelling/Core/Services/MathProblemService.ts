/// <reference path="../models/character.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
namespace Services {

  export class MathProblemService {

    public fetchMathProblemsBylevel(level: number): JQueryPromise<Array<Models.IWord>> {
      return $.getJSON("data/Level" + level + "MathProblems.json");
    }

    

    public getRandomMathProblemFromExistingArray(mathproblems : Array<Models.IMathProblem>){
      var min  = 0;
      var max  = mathproblems.length - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return mathproblems[rand];
    }

    /**
     * Performs an IN PLACE shuffle of an array.
     * IMPORTANT: - This modifies the original array!
     */
    public shuffleArrayOfNumbers(numbers : Array<number>){
      var j, x, i;
      for (i = numbers.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = numbers[i - 1];
        numbers[i - 1] = numbers[j];
        numbers[j] = x;
      }  
    }

    public getRandomIntInRange(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public getNextNNumbersFromN(nextCount:number, fromN:number) :Array<number>{
      var nextNumbers = [];
      var min = fromN + 1;
      var max = min + nextCount;
      for ( var i = min; i < max; i++ ){
        nextNumbers.push(i);    
      }
      return nextNumbers;
    }

    public getPreviousNNumbersFromN(previousCount:number, fromN:number) : Array<number>{
      var previousNumbers = [];
      for (var i = 0; i < previousCount; i++ ){
        previousNumbers.push((fromN-1) - i);
      }
      return previousNumbers;
    }

    public getPreviousNAndNextNNumbersFromN(lastCount:number, nextCount, fromN:number) : Array<number>{
      var results = [];

      results = results.concat(
        this.getPreviousNNumbersFromN(lastCount, fromN));

      results = results.concat(
        this.getNextNNumbersFromN(nextCount, fromN));

      return results;
    }

  }
}     