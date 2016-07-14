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
var pipesG =[];
var pipesR =[];
/*
* Loads all resources for the game and gives them names.
*/
function preload() {

  game.load.image("playerImg1", "../assets/flappy_batman.png");


  game.load.image("backgroundImg", "../assets/backroundofawsomeness.jpg");
  game.load.audio("gunShot", "../assets/gun-gunshot-01.mp3");
game.load.audio("punch", "../assets/PUNCH.mp3");
  game.load.image("playerImg2", "../assets/flappy_superman.png");

  game.load.image("pipeBlockG","../assets/k.jpg");
  game.load.image("pipeBlockR","../assets/joker.jpg");
game.load.audio("theme", "../assets/theme.mp3");

}

/*
* Initialises the game. This function is only called once.
*/
function create() {
game.sound.play("theme");

  game.stage.setBackgroundColor ("#ff0000");
  //  set the background colour of the scene

  var backround = game.add.image(0, 0, "backgroundImg");
  backround.width = 790;
  backround.height = 400;

game.add.text(100, 20, "BATMAN:");
game.add.text(100, 50, "SUPERMAN:");

  game.add.text(375, 30, "BATMAN VS SUPERMAN", {font: "35px Charcoal CY", fill: "#FF0000"});
  //game.add.sprite(250, 350, "playerImg");
//  game.input
  //.onDown
  //.add(clickHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.Q)
  .onDown.add(QHandler);
  game.input
  .keyboard.addKey(Phaser.Keyboard.ENTER)
  .onDown.add(EnHandler);


  //alert(score);
  player1 = game.add.sprite(50, 90, "playerImg1");
  player2 = game.add.sprite(50, 220, "playerImg2");
  /*game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight1);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft1);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp1);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown1);

player1.anchor.setTo(0.5, 0.5);
  game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(moveUp2);
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(moveDown2);
  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveLeft2);
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveRight2);*/
player2.anchor.setTo(0.5, 0.5);
game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
.onDown.add(player1Jump);

game.input.keyboard.addKey(Phaser.Keyboard.Q)
.onDown.add(player2Jump);
game.physics.startSystem(Phaser.Physics.ARCADE);

game.physics.arcade.enable(player1);
game.physics.arcade.enable(player2);
//player1.body.velocity.x = 50;//
 //player2.body.velocity.x = 50;//
player1.body.gravity.y = 500;
player2.body.gravity.y = 500;

player1.scale.setTo(0.75,0.75);
player2.scale.setTo(0.75,0.75);

labelScore1 = game.add.text(300, 20, "0");
labelScore2 = game.add.text(300, 50, "0");

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
  		  pipesR,
  		  loseHealth1a);


  game.physics.arcade.overlap(
                player1,
              pipesG,
              loseHealth1b);

    game.physics.arcade.overlap(
                player2,
              pipesG,
              loseHealth2a);

              game.physics.arcade.overlap(
                          player2,
                        pipesR,
                        loseHealth2b);


  if (score1 > 1000)
  {
    gameFinished();
}
  if (score2 > 1000)
  {
    gameFinished();
}

if (score1 < -1000)
{
  gameFinished();

}

if (score2 < -1000)
{
  gameFinished();
}


if(player1.body.y < 0) {
    loseHealth1a();
}

if(player2.body.y < 0) {
    loseHealth2a();
}

if(player2.body.y > 400){
    loseHealth2a();
}

if(player1.body.y > 400){
    loseHealth1a();
}

player2.rotation = Math.atan(player2.body.velocity.y / 200);


}


function clickHandler(event) { //alert("The position is: " + event.x + "," + event.y);
game.add.sprite(event.x-20, event.y-20, "playerImg");}
function spaceHandler() {//alert("space pressed");
game.sound.play("gunShot");
}
function QHandler() {
game.sound.play("punch");
}

function EnHandler(){
location.reload();
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
    var gapStart = game.rnd.integerInRange(-4, 2);
  for(var count=-5; count<2; count+=1){
    if(count != gapStart && count != gapStart + 1)
    {addPipeBlockG(820, count*50, "pipeBlockG");}
  }changeScore2();
    changeScore1();
  }
  function generatePipeR() {
    var gapStart = game.rnd.integerInRange(6, 11);
  for(var count=6; count<14; count+=1){
    if(count != gapStart && count != gapStart + 1)
    {addPipeBlockR(1120, count*50, "pipeBlockR");}

}
changeScore2();
changeScore1();
}




  function generatePipeRandG(){
    addPipeBlockG(1420, -100, "pipeBlockG");
  addPipeBlockG(1420, 0, "pipeBlockG");
//addPipeBlock(1420, 100, "pipeBlockG");
  addPipeBlockG(1420, 50, "pipeBlockG");
  addPipeBlockG(1420, 200, "pipeBlockG");
addPipeBlockR(1420, 350, "pipeBlockR");
addPipeBlockG(1420, 400, "pipeBlockG");
addPipeBlockR(1420, 450, "pipeBlockR");
//addPipeBlockG(1420, 500, "pipeBlockG");
//addPipeBlockR(1420, 550, "pipeBlockR");
addPipeBlockG(1420, 600, "pipeBlockG");
addPipeBlockR(1420, 650, "pipeBlockR");
changeScore1();
changeScore2();}

function addPipeBlockG(x, y, colour) {
  var block = game.add.sprite(x,y,colour);
  block.scale.setTo(0.05, 0.08);
  pipesG.push(block);
  game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
block.body.velocity.y = 50;
}


function addPipeBlockR(x, y, colour) {
  var block = game.add.sprite(x,y,colour);
  block.scale.setTo(0.06, 0.1);
  pipesR.push(block);
  game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
block.body.velocity.y = -50;
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
          labelScore1.setText(score1.toString());
        }


          function loseHealth1a(){
            score1 = score1 - 2;
            labelScore1.setText(score1.toString());
}
            function loseHealth1b(){
              score1 = score1 - 1;
              labelScore1.setText(score1.toString());

        }
        function loseHealth2a(){
          score2 = score2 - 2;
          labelScore2.setText(score2.toString());
}
function loseHealth2b(){
  score2 = score2 - 1;
  labelScore2.setText(score2.toString());
}


          function gameFinished(){
            game.add.text(225, 320, "Press Enter to Restart", {font: "40px Charcoal CY", fill: "#ff0000"});
if(score1>score2){
      game.add.text(50, 250, "Batman is Victorious!",{font: "80px Charcoal CY", fill: "#000000"});
}
  else if (score2>score1) {
    game.add.text(10, 250, "Superman is Victorious!", {font: "80px Charcoal CY", fill: "#0000ff"});

  }
  else {
    game.add.text(345, 200, "It's a tie!");
}

    game.paused=true;

}
