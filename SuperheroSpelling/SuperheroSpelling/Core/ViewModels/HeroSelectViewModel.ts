namespace ViewModels {

  export interface IHeroSelectViewModel {
    characters               : KnockoutObservableArray<Models.ICharacter>;
    player1SelectedCharacter : KnockoutObservable<Models.ICharacter>;
    player2SelectedCharacter : KnockoutObservable<Models.ICharacter>;
    player1PreviewCharacter  : KnockoutObservable<Models.ICharacter>;
    player2PreviewCharacter  : KnockoutObservable<Models.ICharacter>;
  }

  export class HeroSelectViewModel implements IHeroSelectViewModel{
    characters              : KnockoutObservableArray<Models.ICharacter>;
    player1SelectedCharacter: KnockoutObservable<Models.ICharacter>;
    player2SelectedCharacter: KnockoutObservable<Models.ICharacter>;
    player1PreviewCharacter : KnockoutObservable<Models.ICharacter>;
    player2PreviewCharacter : KnockoutObservable<Models.ICharacter>;

    constructor(characters: Array<Models.ICharacter>) {
      var self = this;
      this.characters = ko.observableArray(characters);
      this.player1SelectedCharacter = ko.observable(null);
      this.player2SelectedCharacter = ko.observable(null);
      this.player1PreviewCharacter  = ko.observable(characters[0]);
      this.player2PreviewCharacter  = ko.observable(characters[1]);
    }

    public previewCharacter = (character: Models.ICharacter) : HeroSelectViewModel => {
      this.player1PreviewCharacter(character);
      return this;
    }
   
    public selectCharacter = (character : Models.ICharacter) : HeroSelectViewModel => {
      this.player1SelectedCharacter(character);
      return this;
    }

    public cancelSelectedCharacter = () : HeroSelectViewModel => {
      this.player1SelectedCharacter(null);
      return this;
    }

    public acceptSelectedCharacter = () : HeroSelectViewModel => {
      console.log("User has confirmed ", this.player1SelectedCharacter());
      localStorage["SelectedCharacter"] = JSON.stringify(this.player1SelectedCharacter());
      window.location.href = "arena.html";
      return this;  
    }
  }
}  