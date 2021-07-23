class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav'); // from https://freesound.org/people/Andromadax24/sounds/186719/
        this.load.audio('sfx_squeak', './assets/squeak38.wav'); // from https://freesound.org/people/AntumDeluge/sounds/188043/
        this.load.audio('sfx_puppy', './assets/puppy_shot.wav'); // from https://freesound.org/people/noctaro/sounds/242413/
    }
    
    create() {
        let menuConfig = {
            fontFamily: 'Century Gothic',
            fontSize: '28px',
            backgroundColor: '#C88CFA',
            color: '#6F0584',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'PUPPY PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrow to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#6F0584';
        menuConfig.color = '#E0C5F0';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = { mouseSpeed: 3, gameTimer: 60000
            }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // easy mode
            game.settings = { mouseSpeed: 4, gameTimer: 45000
            }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
        }
    }
}