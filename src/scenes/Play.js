class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('puppy', './assets/puppy.png');
        this.load.image('mouse', './assets/mouse.png');
        this.load.image('bedroom', './assets/bedroom.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place the tile sprite
        this.bedroom = this.add.tileSprite(0, 0, 640, 480, 'bedroom').setOrigin(0,0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2,  0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add puppy (p1)
        this.p1Puppy = new Puppy(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'puppy').setOrigin(0.5, 0);
        // add mouses (x3)
        this.ship01 = new Mouse(this, game.config.width + borderUISize*6, borderUISize*4, 'mouse', 0, 30).setOrigin(0, 0);
        this.ship02 = new Mouse(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'mouse', 0, 20).setOrigin(0,0);
        this.ship03 = new Mouse(this, game.config.width, borderUISize*6 + borderPadding*4, 'mouse', 0, 10).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode', frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}), frameRate: 30
        });
        // intialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        console.log(this.scoreLeft)

        // GAME OVER flag
        this.gameOver = false;

        // 60=second play clock 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);  
                this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.bedroom.tilePositionX -= 4; // update tile sprite
        
        if(!this.gameOver) {
            this.p1Puppy.update(); // update p1
            this.ship01.update();  // update mouses (x3)
            this.ship02.update();
            this.ship03.update();
        }
        
        // check collisions
        if(this.checkCollision(this.p1Puppy, this.ship03)) {
            this.p1Puppy.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Puppy, this.ship02)) {
            this.p1Puppy.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Puppy, this.ship01)) {
            this.p1Puppy.reset();
            this.shipExplode(this.ship01);
        }  
    }

    checkCollision(puppy, ship) {
        // simple AABB checking
        if (puppy.x < ship.x + ship.width && puppy.x + puppy.width > ship.x && puppy.y < ship.y + ship.height && puppy.height + Puppy.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => { // callback after animation completes
            ship.reset(); // reset ship position
            ship.alpha = 1; ; // make ship visible again
            boom.destroy(); // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
        console.log(this.p1Score)   
    }
}  