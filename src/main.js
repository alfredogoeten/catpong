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
let isGameStarted = false
let arrows
let keys = {}
let paddleSpeed = 400
let randomDirectionX
let randomDirectionY
let randomSpeed = (Math.random() * 250) + 150;
let leftScoreText
let rightScoreText
let leftPointText
let rightPointText
let leftScore = 0
let rightScore = 0

function preload() {

    this.load.image('ball', require('../assets/sprites/ball.png'))
    this.load.image('paddleLeft', require('../assets/sprites/leftcat.png'))
    this.load.image('paddleRight', require('../assets/sprites/rightcat.png'))

    this.load.bitmapFont('font', require('../assets/font/font.png'), require('../assets/font/font.xml'))

}

function create() {

    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    )

    ball.setCollideWorldBounds(true)
    ball.setBounce(1, 1)
    randomDirectionX = Math.random() < 0.5 ? -1 : 1
    randomDirectionY = Math.random() < 0.5 ? -1 : 1

    paddleLeft = this.physics.add.sprite(
        ball.body.width / 2 + 40,
        this.physics.world.bounds.height / 2,
        'paddleLeft'
    )

    paddleLeft.setImmovable(true)
    paddleLeft.setCollideWorldBounds(true)

    paddleRight = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 40),
        this.physics.world.bounds.height / 2,
        'paddleRight'
    )

    paddleRight.setImmovable(true)
    paddleRight.setCollideWorldBounds(true)

    this.physics.add.collider(paddleLeft, ball)
    this.physics.add.collider(paddleRight, ball)

    arrows = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    leftScoreText = this.add.bitmapText(120, 25, 'font', '0', 72)
    rightScoreText = this.add.bitmapText(this.physics.world.bounds.width - 150, 25, 'font', '0', 72)



    leftPointText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "Good cat scored!"
    )

    rightPointText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "Evil cat scored!"
    )

    leftPointText.setOrigin(.5)
    rightPointText.setOrigin(.5)
    leftPointText.setVisible(false)
    rightPointText.setVisible(false)
}

function update() {

    //Set ball speed to a random value when game starts

    if (!isGameStarted) {
        ball.setVelocity(randomDirectionX * randomSpeed, randomDirectionY * randomSpeed)
        isGameStarted = true
        this.input.keyboard.enabled = true;
    }

    leftScoreText.text = leftScore
    rightScoreText.text = rightScore

    paddleLeft.body.setVelocity(0)
    paddleRight.body.setVelocity(0)

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

    // Left scores

    if (ball.body.x > paddleRight.body.x + 75) {
        paddleLeft.body.setVelocity(0)
        leftPointText.setVisible(true)
        ball.setVelocity(0)
        isGameStarted = false
        this.input.keyboard.enabled = false;
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
        paddleLeft.body.setVelocity(0)
        rightPointText.setVisible(true)
        ball.setVelocity(0)
        isGameStarted = false
        this.input.keyboard.enabled = false;
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                rightScore += 1
                this.scene.restart()
            },
            loop: true
        })
    }

}

