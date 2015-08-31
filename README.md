# Javascript Snake Game 
* check it out [here](http://zackattack01.github.io/snake/)

## Game logic
* Uses Javascript constructors for a board and snake class
* Snake is responsible for moving forward in its current direction each time its move function is called
* Board is responsible for initializing a snake and dropping apples as necessary

## View
* Uses jQuery to toggle classes for each div making up the game grid based on the feedback provided from the board
* Juggles setting and clearing game interval to render the game and allow pause/unpause and ending/starting the game
* Uses css repeating radial gradients to give texture to game elements