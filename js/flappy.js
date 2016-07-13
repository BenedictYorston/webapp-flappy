// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score1 = -90;
var score2 = -90;
var labelScore1;
var labelScore2;
var player1;
var player2;
var pipes =[];
/*
* Loads all resources for the game and gives them names.
*/
function preload() {

  game.load.image("playerImg1", "../assets/flappy_batman.png");


  game.load.image("backgroundImg", "../assets/Toy-Story-Sky.jpg");
  game.load.audio("gunShot", "../assets/gun-gunshot-01.mp3");
game.load.audio("punch", "../assets/PUNCH.mp3");
  game.load.image("playerImg2", "../assets/flappy_superman.png");

  game.load.image("pipeBlockR","../assets/pipe_red.png");
  game.load.image("pipeBlockG","../assets/pipe2-body.png");
}

/*
* Initialises the game. This function is only called once.
*/
function create() {


  game.stage.setBackgroundColor ("#FFFFFF");
  //  set the background colour of the scene

  var backround = game.add.image(0, 0, "backgroundImg");
  backround.width = 790;
  backround.height = 400;


  game.add.text(50, 300, "BATMAN VS SUPERMAN", {font: "45px Charcoal CY", fill: "#FF0000"});
  //game.add.sprite(250, 350, "playerImg");
  game.input
  .onDown
  .add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.Q)
  .onDown.add(QHandler);


  //alert(score);
  player1 = game.add.sprite(50, 90, "playerImg1");
  player2 = game.add.sprite(50, 220, "playerImg2");
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight1);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft1);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp1);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown1);


  game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(moveUp2);
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(moveDown2);
  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveLeft2);
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveRight2);

game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
.onDown.add(player1Jump);

game.input.keyboard.addKey(Phaser.Keyboard.Q)
.onDown.add(player2Jump);
game.physics.startSystem(Phaser.Physics.ARCADE);

game.physics.arcade.enable(player1);
game.physics.arcade.enable(player2);
//player1.body.velocity.x = 50;//
 //player2.body.velocity.x = 50;//
player1.body.gravity.y = 400;
player2.body.gravity.y = 400;

player1.scale.setTo(0.5,0.5);
player2.scale.setTo(0.5,0.5);

labelScore1 = game.add.text(350, 20, "0");
labelScore2 = game.add.text(350, 50, "0");

generatePipeR();
generatePipeG();
generatePipeRandG();
var pipeInterval = 4.5 * Phaser.Timer.SECOND;
game.time.events.loop(
    pipeInterval,
    generatePipeG
);

game.time.events.loop(
    pipeInterval,
    generatePipeR
  );
  game.time.events.loop(
      pipeInterval,
      generatePipeRandG
    );
}

/*
* This function updates the scene. It is called for every new frame.
*/
function update() {
  game.physics.arcade.overlap(
          player1,
  		  pipes,
  		  gameOver);

        game.physics.arcade.overlap(
                player2,
              pipes,
              gameOver2);
  }




function clickHandler(event) { //alert("The position is: " + event.x + "," + event.y);
game.add.sprite(event.x-20, event.y-20, "playerImg");}
function spaceHandler() {//alert("space pressed");
game.sound.play("gunShot");
}
function QHandler() {
game.sound.play("punch");
}
/*function changeScore2(){

  score2 = score2 + 1;
  labelScore2.setText(score2.toString());
}

function changeScore1() {


  score1 = score1 + 1;
  labelScore1.setText(score1.toString());}*/

  function moveRight1() {
    player1.x =
    player1.x +10;
  }
  function moveLeft1(){
    player1.x =
    player1.x -10;
  }
  function moveUp1(){
    player1.y =
    player1.y - 10;
  }
  function moveDown1(){
    player1.y =
    player1.y +10;
  }

  function moveUp2()
  {

    player2.y = player2.y - 10;

  }

  function moveDown2(){
    player2.y = player2.y + 10;
  }

  function moveLeft2(){
    player2.x = player2.x - 10;
  }

  function moveRight2 (){
    player2.x =player2.x+10;
  }








  function generatePipeG() {
    var gapStart = game.rnd.integerInRange(1, 6);
  for(var count=0; count<8; count+=1){
    if(count != gapStart && count != gapStart + 1)
    {addPipeBlock(820, count*50, "pipeBlockG");}
  }changeScore2();
    changeScore1();
  }
  function generatePipeR() {
    var gapStart = game.rnd.integerInRange(1, 6);
  for(var count=0; count<8; count+=1){
    if(count != gapStart && count != gapStart + 1)
    {addPipeBlock(1120, count*50, "pipeBlockR");}

}
changeScore2();
changeScore1();
}




  function generatePipeRandG(){
    addPipeBlock(1420, 0, "pipeBlockG");
  addPipeBlock(1420, 50, "pipeBlockR");
addPipeBlock(1420, 100, "pipeBlockG");
  addPipeBlock(1420, 150, "pipeBlockR");
  addPipeBlock(1420, 200, "pipeBlockG");
addPipeBlock(1420, 350, "pipeBlockR");
changeScore1();
changeScore2();}

function addPipeBlock(x, y, colour) {
  var block = game.add.sprite(x,y,colour);
  pipes.push(block);
  game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}

function player1Jump() {
    player1.body.velocity.y = -200;}

    function player2Jump() {
        player2.body.velocity.y = -200;}


        function changeScore2(){

          score2 = score2 + 30;
          labelScore2.setText(score2.toString());
        }

        function changeScore1() {


          score1 = score1 + 30;
          labelScore1.setText(score1.toString());}


          function gameOver(){
            score1 = score1 - 1;
            labelScore1.setText(score1.toString());

        }
        function gameOver2(){
          score2 = score2 - 1;
          labelScore2.setText(score2.toString());}
