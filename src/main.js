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

function preload() {

    this.load.image('ball', require('../assets/ball.png'))
    this.load.image('paddleLeft', require('../assets/leftcat.png'))
    this.load.image('paddleRight', require('../assets/rightcat.png'))

}

function create() {

    ball = this.physics.add.sprite(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        'ball'
    )

    ball.setCollideWorldBounds(true)
    ball.setBounce(1,1) 

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

}

function update() {

    if (!isGameStarted){
        ball.setVelocity(200, 200)
        isGameStarted = true
    }

}

