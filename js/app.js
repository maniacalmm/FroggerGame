// Enemies our player must avoid
// maximum number of bugs
var MaxEnemy = 5;

var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initial position of bugs
    this.x = -150;
    this.y = row;

    //intial speed of bugs
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    // when the bugs moves outside of windows, reset it's position and speed
    if (this.x >= 505) {
        this.y = randomRow();
        this.x = 0;
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
    this.x = 2;
    this.y = 5;
};

Player.prototype.update = function() {
    // update function is already handled within handleInput
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80);
};

// handles input direction for updating the player's position
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'up':
            if (this.y !== 1) this.y = this.y - 1;
            break;
        case 'down':
            if (this.y !== 5) this.y = this.y + 1;
            break;
        case 'left':
            if (this.x !== 0) this.x = this.x - 1;
            break;
        case 'right':
            if (this.x !== 4) this.x = this.x + 1;
            break;
    }
};

// this function generate bug with random position and speed,
// also check for bugs that's outside of the box, and eliminate these bugs
function bugGenerator() {
    while(allEnemies.length <= MaxEnemy) {
        allEnemies.push(new Enemy(randomRow(), randomSpeed()));
    }

    console.log(allEnemies);
}

// randomRow generate integer from [min , max)
function randomInt(max, min) {
    return Math.floor(Math.random() * max) + min;
}

// generate a random intial speed for bug
function randomSpeed() {
    return randomInt(100, 20);
}

// generate a random number between 3 and 1 for bug
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

// eventlistener for reset button
document.getElementById('button').addEventListener('click', function() {
    while(allEnemies.length) allEnemies.pop();
    bugGenerator();
    player.x = 2;
    player.y = 5;
});
