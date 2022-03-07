# "Hit and Pass" aka Mastermind/Hit and Blow (Clubhouse Games) clone

See live here: https://c-zhenhao.github.io/project1/

If you have any comments/feedback, please feel free to use the Github Discussions (forum) to open a thread:
https://github.com/c-zhenhao/project1/discussions

## Why

This is the first Project done after 2 instructional weeks (14 Feb - 25 Feb) and 1 project development week (28 Feb - 4 Mar) at General Assembly's Software Engineering Immersive programme.

## Getting Started

My Minimum Viable Product (MVP) was to deliver a basic working game (standard 6 colours/choices and 8 rounds) played between one player and a randomly generated sequence to be guessed.

The player inputs the combination and submits it, which will be checked sequentially.

As per the original games, hints are given to guide the player's guess. A black pin ("hit") indicates that one of four guesses have **both** the correct colour and position. A white pin ("pass" or "blow") indicates that only the colour is correct and the position is off. There is no feedback for a wrong colour and position (i.e. total "miss") guess.

The biggest caveat to the hints that is counter-intutive to beginners is that if there are duplicate colours in the answer, and the player inputs only one guess, the hint mechanism only returns the answer for that particular pin.

For example, the answer is ["blue", "blue", "red", "red"].

If the guess is ["blue", "yellow", "green", "purple"], there will only be **one** black pin for the first blue guess ("peg").

[see this for more examples and the game in very "classic" JS](https://www.onlinespiele-sammlung.de/mastermind/mastermindgames/lundy/scx.htm) (which i intend recreate in the future "how to play")

## Tech

_I have left A LOT of comments in the code for two purposes_
_1. initial pseudocoding_
_2. referencing/explanation purposes so that when I come back to work on it, I know what I was doing 😅 . Which will be removed in the final version._

The project was done using Javascript DOM manipulation to _update_ the CSS.

### interesting points

**game logic in JS**

Game logic was actually not too complex after much googling for answers. Since essentially only 1 check needs to be done at the end of every round, hence:

_in pseudocode_

1. let player guess be stored in an array = [];
2. let randomised answer be stored in another array = [];
3. create a function to check the two arrays, which includes 2 sub-steps which are sequential (i.e. first one done before the second)
   1. check if every elements in array match exactly. for each match, award 1 black pin
   2. check if every element is found "elsewhere" in the array - there is no need to check if duplicates exist
      1. if found, award 1 white pin
      2. This was actually not so straightforward since there is need to remove the element that was checked, otherwise additional white pins may be awarded in error

**CSS logic**

The simplest solution to feedback to the player what colour choice the player has made in the front-end is to use CSS classes. It is done using 3 components:

button options, which contained the colour "id" of the button

```
<div id="options" class="container">
    <button id="blue" class="option blue">1b</button>
    <button id="red" class="option red">2r</button>
    <button id="yellow" class="option yellow">3y</button>
    <button id="green" class="option green">4g</button>
    <button id="purple" class="option purple">5p</button>
    <button id="brown" class="option brown">6w</button>
</div>
```

link the button to the insertGuess function

```
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", insertGuess);
}
```

function which took the button id the className of the original

```
function insertGuess() {
    let slots = inputGuess[guessIncrement].getElementsByClassName("socket");

    slots[guess.length].className = slots[guess.length].className + " peg " + this.id;
    guess.push(this.id);
  }
}
```

div to be updated by the function

```
<div class="guess">
    <div class="socket">o1</div>
    <div class="socket">o2</div>
    <div class="socket">o3</div>
    <div class="socket">o4</div>
</div>
```

[adapted from original source code here](https://github.com/klomontes/js-mastermind/blob/master/js/main.js) thank you creator!

---

## Project post-mortems

- Couldn't have picked a more appopriate project to start my full-stack developer journey, as it balanced out the involved Javascript, HTML and CSS, rather than focusing very deeply on one aspect (which I wanted to (i.e. on JS))

- Flexbox is actually not very appropriate for browser games as generally it needs to be a fixed canvas but I wanted to understand Flexbox as I thought would be a very useful basic CSS framework versus placing things relatively/absolutely (which feels pre-CSS3/web1.0), before moving to more "cooler" tech like Bootstrap, or Style components which other more advanced classmates are using.

- That being said, "container-ception" actually made this project way more complex than it needs to be and it was really not a great experience since very tedious CSS targeting would be necessary.

## Future roadmap

**Features (stretch goals) that I plan to add:**

1. Responsive design (mobile layout)
2. Move the submit button to the pin box / move submit button beside colour choice
3. More CSS animations
4. Drag & drop functionality for the pegs/guess
5. How_to_play.html (instructions)
6. Easy mode, Hard mode, flex mode (no duplicates, more possible colour combinations & guesses, etc.)
7. scoring mechanism
   1. 2v CPU mode
   2. 1v1 PVP mode
8. local storage for game history
9. 3D graphics using CSS?? (popular request from instructional team)
