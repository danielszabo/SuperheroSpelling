/// <reference path="../models/character.ts" />
namespace Models {

  export interface IArenaDetails{
    name    : string;
    bgImage : string;
    bgSong  : string;
  }

  export class Arena {
    public details      : IArenaDetails;
    
    // Players
    public player1      : ICharacter;
    public player2      : ICharacter;
    public activePlayer : ICharacter;
    
    
    constructor(
      details : IArenaDetails, 
      player1 : ICharacter, 
      player2 : ICharacter)
    {
      this.details  = details;
      this.player1  = player1;
      this.player2  = player2;
    }
  }
}    