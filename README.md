# CatPong

## Run
    npm install
    npm run start

## Controls
    W and S - move left paddle
    Up and Down - move right paddle
    Spacebar - start game
## Mechanics 
Each player must use the keyboard to control their paddle, the first player must press [W] 
key to move paddle up and [S] key to move down and the second player, [Up] and [Down] 
arrows. The game should start when the [Space] button is pressed and the ball, positioned in 
the middle of the screen, should start move to a random direction. 
 
The ball should move until it collides with the top or the bottom of the screen, then it should 
change its angle, where the angle of incidence is the angle of the refraction (for example if the 
ball collides with an angle of 45 degrees, it should reflect 45 degrees to the opposite way). It also 
should bounce when colliding with any of the player’s paddle. If the ball collides with the left or 
the right side of the screen, then the opposite side player scores one point, the scoreboard 
should be updated and the ball should return to the center of the screen, where the gameplay 
starts again. 
 
The game ends when one of the players scores 7 points and a message showing the player 
number who won the match is showed and then the scoreboard is reset, starting a new game 
match.

