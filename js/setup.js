'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var AMOUNT_WIZARDS = 4;

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');

var similarSetup = document.querySelector('.setup-similar');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var inputCoatColor = document.querySelector('input[name="coat-color"]');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var inputEyesColor = document.querySelector('input[name="eyes-color"]');
var setupFireball = document.querySelector('.setup-fireball-wrap');
var inputSetupFireball = document.querySelector('input[name="fireball-color"]');

var fragment = document.createDocumentFragment();

var wizards = [];

// создаем волшебников
for (var i = 0; i < AMOUNT_WIZARDS; i++) {
  wizards[i] = new Wizard();
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function Wizard() {
  this.name = random(FIRST_NAMES) + ' ' + random(SECOND_NAMES);
  this.coatColor = random(COAT_COLORS);
  this.eyesColor = random(EYES_COLORS);
}

// рисуем волшебника
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  return wizardElement;
}

// добавляем волшебников во временный контейнер
for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
}

// добавлем волшебников в основное DOM-дерево
similarListElement.appendChild(fragment);

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    // если поле ввода имени игрока не в фокусе - закрыть меню игрока
    if (setupUserName !== document.activeElement) {
      closePopup();
    }
  }
}

// открытие меню игрока
function openPopup() {
  setup.classList.remove('hidden');
  similarSetup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

// закрытие меню игрока
function closePopup() {
  setup.classList.add('hidden');
  similarSetup.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

// открытие меню по клику
setupOpen.addEventListener('click', function() {
  openPopup();
});

// открытие меню по нажатию клавиши
setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode == ENTER_KEYCODE) {
    openPopup();
  }
});

// закрытие меню по клику
setupClose.addEventListener('click', function() {
  closePopup();
});

// закрытие меню по нажатию клавиши
setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode == ENTER_KEYCODE) {
    closePopup();
  }
});

//
setupUserName.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    setupUserName.blur();
    evt.stopPropagation();
  }
});

// изменение цвета мантии
wizardCoat.addEventListener('click', function() {
  var color = random(COAT_COLORS);

  inputCoatColor.setAttribute('value', color);
  wizardCoat.style.fill = color;
});

// изменение цвета глаз
wizardEyes.addEventListener('click', function() {
  var color = random(EYES_COLORS);

  inputEyesColor.setAttribute('value', color);
  wizardEyes.style.fill = color;
});

// изменение цвета фаербола
setupFireball.addEventListener('click', function() {
  var color = random(FIREBALL_COLORS);

  inputSetupFireball.setAttribute('value', color);
  setupFireball.style.background = random(FIREBALL_COLORS);
});
