import Phaser from 'phaser'


const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 768,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload,
        create,
        update

    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
}

const game = new Phaser.Game(config)

let ball
let paddleLeft
let paddleRight
let arrows
let keys = {}
let paddleSpeed = 400
let randomDirectionX
let randomDirectionY
let randomSpeed;
let leftScoreText
let rightScoreText
let leftPointText
let rightPointText
let leftScore = 0
let rightScore = 0
let leftWin
let rightWin
let startGame
let hitSound

function preload() {

    this.load.image('ball', require('../assets/sprites/ball.png'))
    this.load.image('paddleLeft', require('../assets/sprites/leftcat.png'))
    this.load.image('paddleRight', require('../assets/sprites/rightcat.png'))

    this.load.bitmapFont('font', require('../assets/font/font.png'), require('../assets/font/font.xml'))

    this.load.audio('hit', require('../assets/sounds/pong.ogg'))


}


function create() {

    //Create ball and paddles

    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    )
        .setCollideWorldBounds(true)
        .setBounce(1, 1)

    randomSpeed = (Math.random() * 250) + 150
    randomDirectionX = Math.random() < 0.5 ? -1 : 1
    randomDirectionY = Math.random() < 0.5 ? -1 : 1

    var create_paddle = (x, sprite) => {
        var paddle = this.physics.add.sprite(x, this.physics.world.bounds.height / 2, sprite);
        paddle.setImmovable(true).setCollideWorldBounds(true)
        return paddle
    }

    paddleLeft = create_paddle(
        ball.body.width / 2 + 40,
        'paddleLeft');

    paddleRight = create_paddle(
        this.physics.world.bounds.width - (ball.body.width / 2 + 40),
        'paddleRight');


    hitSound = this.sound.add('hit')


    this.physics.add.collider(paddleLeft, ball, function () {
        hitSound.play()
    })

    this.physics.add.collider(paddleRight, ball, function () {
        hitSound.play()
    })


    //Inputs

    arrows = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)



    //Texts   

    var create_bitmap = (message, size, visible) => {
        var message = this.add.bitmapText(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2 - 50, 'font', message, size, "center");
        message.setOrigin(.5).setVisible(visible)
        return message
    }

    leftPointText = create_bitmap(
        "Good cat\n\n  scored!", 26, false
    )

    rightPointText = create_bitmap(
        "Evil cat\n\n scored!", 26, false
    )

    leftWin = create_bitmap(
        'Good cat\n   WINS', 90, false
    )

    rightWin = create_bitmap(
        'Evil cat\n\n   WINS', 90, false
    )

    startGame = create_bitmap(
        "Press SPACE to start", 44, true
    )

    leftScoreText = this.add.bitmapText(120, 25, 'font', '0', 72)
    rightScoreText = this.add.bitmapText(this.physics.world.bounds.width - 150, 25, 'font', '0', 72)

}

function update() {

    //Set ball speed to a random value when space key is pressed  

    this.input.keyboard.enabled = true;

    keys.space.on('down', function () {
        ball.setVelocity(randomDirectionX * randomSpeed, randomDirectionY * randomSpeed)
        startGame.setVisible(false)
        keys.space.enabled = false
    })

    leftScoreText.text = leftScore
    rightScoreText.text = rightScore

    paddleLeft.body.setVelocity(0)
    paddleRight.body.setVelocity(0)

    //Movement

    if (keys.w.isDown) {
        paddleLeft.body.setVelocityY(-paddleSpeed)
    }

    if (keys.s.isDown) {
        paddleLeft.body.setVelocityY(paddleSpeed)
    }

    if (arrows.up.isDown) {
        paddleRight.body.setVelocityY(-paddleSpeed)
    }

    if (arrows.down.isDown) {
        paddleRight.body.setVelocityY(paddleSpeed)
    }



    var game_reset = () => {
        paddleLeft.body.setVelocity(0)
        paddleRight.body.setVelocity(0)
        ball.setVelocity(0)
        startGame.setVisible(false)
        this.input.keyboard.enabled = false;
    }


    // Left scores

    if (ball.body.x > paddleRight.body.x + 75) {
        game_reset()
        leftPointText.setVisible(true)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                leftScore += 1
                this.scene.restart()
            },
            loop: true
        })
    }

    //Right scores

    if (ball.body.x < paddleLeft.body.x) {
        game_reset()
        rightPointText.setVisible(true)
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                rightScore += 1
                this.scene.restart()
            },
            loop: true
        })
    }


    //Endgame

    if (leftScore == 7) {
        game_reset()
        ball.setVisible(false)
        leftWin.setVisible(true)
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                leftScore = rightScore = 0
                this.scene.restart()
            },
            loop: true
        })
    }

    if (rightScore == 7) {
        game_reset()
        ball.setVisible(false)
        rightWin.setVisible(true)
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                leftScore = rightScore = 0
                this.scene.restart()
            },
            loop: true
        })
    }
}













