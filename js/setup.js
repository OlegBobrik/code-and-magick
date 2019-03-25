'use strict';

var AMOUNT_WIZARDS = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = [];

var list = document.querySelector('.setup-similar-list');

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

for (var i = 0; i < AMOUNT_WIZARDS; i++) {
  wizards[i] = new Wizard();
}

function Wizard() {

  this.firstName = random(FIRST_NAMES);
  this.secondName = random(SECOND_NAMES);
  this.coatColor = random(COAT_COLORS);
  this.eyesColor = random(EYES_COLORS);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


for (var j = 0; j < wizards.length; j++) {
  var label = document.createElement('p');

  label.classList.add('setup-similar-label');
  label.innerText = wizards[j].firstName;

  list.appendChild(label);
}

console.log(document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'));
