// configure score board and sprites here

var scoreBoardColor = 'white';
var scoreBoardFont = '48px serif';
var playerSprite = 'images/char-boy.png';
var enemySprite = 'images/enemy-bug.png';

// controls pause state
var paused = false;

// set to true if overlay is present
var overlayPresent = true;

/**
 * @description Represents the score board
 * @constructor
 */

var ScoreBoard = function() {
    this.alpha = 1;
    this.score = 0;
    this.deaths = 0;
    this.color = scoreBoardColor;
    this.font = scoreBoardFont;

    this.lifeSprite = playerSprite;
};

/**
 * @description Draws the score board on the canvas
 * @returns {void}
 */

ScoreBoard.prototype.render = function() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(0,0,505,50);
    
    this.renderScore();
    this.renderDeaths();
};

/**
 * @description Adds the score to the score board
 * @returns {void}
 */

ScoreBoard.prototype.renderScore = function() {
    ctx.font = this.font;
    ctx.strokeText('SCORE: '+this.score, 10, 40);
};

/**
 * @description Updates remaining lives on score board
 * @returns {void}
 */

ScoreBoard.prototype.renderDeaths = function() {
    var resource = Resources.get(this.lifeSprite);
    if(this.deaths < 3) ctx.drawImage(resource, 300, -30, resource.width/2, resource.height/2);
    if(this.deaths < 2) ctx.drawImage(resource, 340, -30, resource.width/2, resource.height/2);
    if(this.deaths < 1) ctx.drawImage(resource, 380, -30, resource.width/2, resource.height/2);
    if(this.deaths > 3) { this.reset(); }
};

/**
 * @description Adds 1 point to score
 * @returns {void}
 */

ScoreBoard.prototype.addPoint = function() {
    this.score++;
};

/**
 * @description Adds 1 death
 * @returns {void}
 */

ScoreBoard.prototype.addDeath = function() {
    this.deaths++;
};

ScoreBoard.prototype.reset = function() {
    this.score = 0;
    this.deaths = 0;
};




var Overlay = function(player, scoreBoard) {
    this.scoreBoard = scoreBoard;
    this.player = player;
    this.alpha = 0.5;
};

Overlay.prototype.render = function() {
    ctx.globalAlpha = this.alpha;
    if(overlayPresent) this.gameStart();
};

Overlay.prototype.update = function() {

};

//fade overlay in
Overlay.prototype.fadeIn = function() {

};

//fade overlay out
Overlay.prototype.remove = function() {
    this.scoreBoard.reset();
    this.player.reset();
    overlayPresent = false;
};

//instructions before game play, integrate play button
Overlay.prototype.gameStart = function() {

    var displayText = [
        'Use the arrow keys to move your player.',
        'Press P to pause and unpause.',
        'You get 4 lives.',
        'If you come into contact with a bug you\'ll lose a life.',
        'If you make it across to the river you\'ll score a point.',
        'Try it. Press the spacebar when you\'re ready to start.'
    ];
    //'Good luck. Remember your training and you might make it back alive.'

    this.display(displayText);
};

Overlay.prototype.display = function(displayText, start_x = 150, start_y = 40, verticalSpacing = 50) {

    overlayPresent = true;
    ctx.fillRect(20, 100, 465, 346); //20,546
    ctx.font = '20px serif';
    ctx.fillStyle = 'green';
    ctx.globalAlpha=1;
    var verticalSpacing = verticalSpacing;
    var start_y = start_y;
    var start_x = start_x;

    displayText.forEach(function(line) {
        ctx.fillText(line, start_y, start_x);
        start_x += verticalSpacing;
    });
}

//game lose screen, continue button
Overlay.prototype.gameLose = function() {

};

//game win screen, continue button
Overlay.prototype.gameWin = function() {

};

/**
 * @description Represents an enemy
 * @param {number} row
 * @param {number} speed how fast you want the enemy to go in ms
 * @param {string} direction 'right' or 'left'
 * @constructor
 */

var Enemy = function(row, speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.alpha = 1;
    var row_y = [135,215,300];
    this.x = -100;
    this.direction = direction;
    if(this.direction == 'left') {
        this.x = 600;
    }
    this.y = row_y[row];
    console.log(this.y);
    this.speed = speed;
    

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = enemySprite;
};

/**
 * @description Updates enemy position
 * @param {number} dt a time delta between ticks
 * @return {void}
 */

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var move = this.speed * dt;
    if(this.direction == 'right') this.x += move;
    else this.x -= move;
    
    //off screen reset
    if(this.x > 600) {
        this.x = -100;
    } else if(this.x < -100) {
        this.x = 600;
    }

};

/**
 * @description Draws the enemy on the canvas
 * @return {void}
 */

Enemy.prototype.render = function() {
    var resource = Resources.get(this.sprite);
    
    //grab sprite image height and width
    this.width = resource.width;
    this.height = resource.height;
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(resource, this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * @description Respresents player
 * @constructor
 */

var Player = function(scoreBoard) {
    this.scoreBoard = scoreBoard;
    this.alpha = 1;
    this.start_x = 200;
    this.start_y = 405;
    this.x = this.start_x;
    this.y = this.start_y;

    this.sprite = playerSprite;
};

/**
 * @description Updates player position
 * @param {number} x player x coordinate
 * @param {number} y player y coordinate
 * @return {void}
 */

Player.prototype.update = function(x = this.x, y = this.y) {

    //Update player location
    this.x = x;
    this.y = y;

    if(this.y < 73) {
        this.score();
    }

    console.log('x:'+this.x+'y:'+this.y);

};

/**
 * @description Moves player back to starting position
 * @return {void}
 */

Player.prototype.reset = function() {
    this.update(this.start_x, this.start_y);
}

/**
 * @description Updates player score
 * @return {void}
 */

Player.prototype.score = function() {
    this.reset();    
    this.scoreBoard.addPoint();
};

/**
 * @description Kills player
 * @return {void}
 */

Player.prototype.die = function() {
    this.reset();
    this.scoreBoard.addDeath();
}

/**
 * @description Draws player on canvas
 * @return {void}
 */

Player.prototype.render = function() {
    var resource = Resources.get(this.sprite);
    this.width = resource.width;
    this.height = resource.height;
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(resource, this.x, this.y);
};

/**
 * @description Interprets keystrokes for player movement
 * @param {number} input keystroke code
 * @return {void}
 */

Player.prototype.handleInput = function(input) {

    var moveVertical = 83;
    var moveHorizontal = 101;
    
    var y = this.y;
    var x = this.x;

    switch(input) {
        case 'up':
            y -= moveVertical;
            break;
        case 'down':
            y += moveVertical;
            break;
        case 'left':
            x -= moveHorizontal;
            break;
        case 'right':
            x += moveHorizontal;
            break;
    }

    // Do not move if offscreen
    if(x > 402 || x < -2 || y > 415 || y < -10) {
        console.log('STOP:x:'+x+'y:'+y);
        return;
    } 

    this.update(x, y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var scoreBoard = new ScoreBoard();

var allEnemies = [new Enemy(0,300,'right'),new Enemy(1,200,'left'),new Enemy(2,100,'left')];

var player = new Player(scoreBoard);

var overlay = new Overlay(player, scoreBoard);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    // if p key pressed toggle pause
    if(e.keyCode === 80) {
        paused = !paused;
        return;
    }

    // if space pressed fade out overlay and reset score
    if(e.keyCode === 32 && overlayPresent !== false)
    {
        overlay.remove();
        return;
    }

    player.handleInput(allowedKeys[e.keyCode]);
});
