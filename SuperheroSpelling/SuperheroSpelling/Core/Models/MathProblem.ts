namespace Models {

  export interface IMathProblem {
    level       : number;
    expression  : string;
    accepts     : Array<number>;
    usage       : string;
  }

  export class MathProblem implements IMathProblem {
    level       : number;
    expression  : string;
    accepts     : Array<number>;
    usage       : string;

    constructor(
      level     : number,
      expression: string,
      accepts   : Array<number>,
      usage     : string) 
    {
      this.level      = level;
      this.expression = expression;
      this.accepts    = accepts;
      this.usage      = usage;
    }
  }
}   