'use strict';
///////////////////////////////////////////////////////////////////////////
// GAME VARIABLES
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let hasgameOver = false;
///////////////////////////////////////////////////////////////////////////

///////////////  SETTERS AND GETTERS (HTML)

// (DOM)GETTERS
const contentDomGetter = function (selectorName) {
  const element = document.querySelector(selectorName);
  if (element !== null) {
    if (element.tagName.toLowerCase() !== 'input') {
      return element.textContent;
    } else {
      return element.value;
    }
  } else {
    return null;
  }
};

// (DOM)SETTERS
const contentDomSetter = function (selectorName, value) {
  const element = document.querySelector(selectorName);
  if (element !== null) {
    if (element.tagName.toLowerCase() !== 'input') {
      element.textContent = value;
    } else {
      element.value = value;
    }
    return 1;
  } else {
    return 0;
  }
};

///////////////  SETTERS AND GETTERS (CSS)

const styleDomGetter = function (selectorName, propertyName) {
  const element = document.querySelector(selectorName);
  if (element !== null) {
    return element.style[propertyName];
  } else {
    return null;
  }
};

const styleDomSetter = function (selectorName, propertyName, value) {
  const element = document.querySelector(selectorName);
  if (element !== null) {
    if (element.style[propertyName] !== undefined) {
      element.style[propertyName] = value;
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
///////////////////////////////////////////////////////////////////////////

////// GAME FUNCTIONALITY

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(contentDomGetter('.guess'));

  if (!hasgameOver) {
    // When there is no input
    if (!guess) {
      contentDomSetter('.message', '⛔️ No number!');

      // When player wins
    } else if (guess === secretNumber) {
      // CONTENT DOM
      contentDomSetter('.message', '🎉 Correct Number!');
      contentDomSetter('.number', secretNumber);

      // STYLE DOM
      styleDomSetter('body', 'backgroundColor', '#60b347');
      styleDomSetter('.number', 'width', '30rem');

      if (score > highscore) {
        highscore = score;
        contentDomSetter('.highscore', highscore);
      }

      // GAME OVER SETTINGS
      hasgameOver = true;

      // When guess is wrong
    } else if (guess !== secretNumber) {
      if (score > 1) {
        contentDomSetter(
          '.message',
          guess > secretNumber ? '📈 Too high!' : '📉 Too low!'
        );
        score--;
        contentDomSetter('.score', score);
      } else {
        styleDomSetter('body', 'backgroundColor', 'rgba(255, 0, 0, 0.5)');
        contentDomSetter('.message', '💥 You lost the game!');
        contentDomSetter('.score', 0);
        score = 0;

        // GAME OVER SETTINGS
        hasgameOver = true;
      }
    }
  }
});
///////////////////////////////////////////////////////////////////////////

//////////// GAME RESET FUNCTIONALITY

document.querySelector('.again').addEventListener('click', function () {
  // VARIABLE RESET
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // CONTENT DOM
  contentDomSetter('.message', 'Start guessing...');
  contentDomSetter('.score', score);
  contentDomSetter('.number', '?');
  contentDomSetter('.guess', '');

  // STYLE DOM
  styleDomSetter('body', 'backgroundColor', '#222');
  styleDomSetter('.number', 'width', '15rem');

  // GAME BEGIN SETTINGS
  hasgameOver = false;
});
///////////////////////////////////////////////////////////////////////////
