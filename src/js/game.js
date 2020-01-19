class Game {
  constructor(name) {
    console.log('Game constructor');
    this.playerList = [];
    this.playerName = name;

    //Duration of a Game in Seconds 5 * 60
    this.duration = 300;

    //
  }

  setup() {
    console.log('Setup');
    this.player = new Player();
  }



  
}
