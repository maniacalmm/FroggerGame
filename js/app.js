//Tang
// Enemies our player must avoid
var MaxEnemy = 5;
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = row;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    if (this.x >= 505) {
        this.x = randomRow();
        this.speed = randomSpeed();
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 75);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 0;
    this.y = 3;
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 75);
}

Player.prototype.handleInput = function() {

}

// this function generate bug with random position and speed,
// also check for bugs that's outside of the box, and eliminate these bugs
function bugGenerator() {
    while(allEnemies.length <= MaxEnemy) {
        allEnemies.push(new Enemy(randomRow(), randomSpeed()))
    }

    console.log(allEnemies);
}

// randomRow generate integer from [min , max)
function randomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
}

function randomSpeed() {
    return randomInt(100, 20);
}

function randomRow() {
    return randomInt(3, 1);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

bugGenerator();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(e.keyCode + " pressed!");
    player.handleInput(allowedKeys[e.keyCode]);
});
