namespace Models {

  export interface IMathProblem {
    level       : number;
    expression  : string;
    accepts     : number;
    usage       : string;
  }

  export class MathProblem implements IMathProblem {
    level       : number;
    expression  : string;
    accepts     : number;
    usage       : string;

    constructor(
      level     : number,
      expression: string,
      accepts   : number,
      usage     : string) 
    {
      this.level      = level;
      this.expression = expression;
      this.accepts    = accepts;
      this.usage      = usage;
    }
  }
}   