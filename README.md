# memoryGame for Udacity project

Started on 14.03.2019

## Game mechanics:

There is 16 cards at the board with 8 pairs of the images (icons).

Cards are shuffled every new game.

Player could open two cards in one move.
- If both cards contains the same image - they are matched and remain opened.
- Otherwise - they are turning back again after one second.

### The goal is to match all the pairs with a minimal moves and in a shortest time.

## Additional functional:

1. Move counter (started after first move)
2. Timer (started after first click)
3. Score rating (3 stars as long as moves are less than 13, 2 stars as long as moves are less than 23, 1 star after 23)

## Win Popup:

After all pairs are matched - player will be notified about the winning conditions with a popup.

Popup contains game summary: moves counter, time and rating.

Player could start game again from the Popup.

## Dependencies:

1. Font Awesome https://fontawesome.com/
2. Shuffle function from http://stackoverflow.com/a/2450976
