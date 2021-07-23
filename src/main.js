let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// Name: Mel Morris
// Project Title: Puppy Patrol
// Date: 7/23/21
// Time To Complete: About 12 hours
// Points Breakdown:
// Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)