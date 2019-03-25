'use strict';

var CLOUD_WIDTH = 420; // ширина облака
var CLOUD_HEIGHT = 270; // высота облака
var CLOUD_X = 100; // координата облака по оси X
var CLOUD_Y = 10; // координата облака по оси Y
var GAP = 10; // смещение
var FONT_GAP = 50; // смещение текста
var TEXT_WIDTH = 80; // ширина текста
var BAR_HEIGHT = 220; // макс высота столбца
var BAR_WIDTH = 40; // ширина столбца

// var barWidth = CLOUD_WIDTH - GAP - TEXT_WIDTH - GAP;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function renderHistogram(ctx, names, times) {
  var textY = 100;

  for (var i = 0; i < names.length; i++) {
    // выводим список имен
    ctx.fillText(names[i], CLOUD_X + GAP, textY);
    // и их время
    ctx.fillText(getTimePlayer(times, i), CLOUD_X + TEXT_WIDTH, textY);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.4) + 0.4) + ')';
    }

    // рисуем столбец
    var heightColumn = getHeightColumn(times, times[i]);
    ctx.fillRect(CLOUD_X + TEXT_WIDTH * 2, textY - 25, heightColumn, BAR_WIDTH);

    ctx.fillStyle = '#000';

    textY += FONT_GAP;
  }
}

// получаем максимальное время игроков
function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return Math.round(maxElement);
}

// получаем время заданного игрока
function getTimePlayer(arr, index) {
  return arr.length < 0 ? 0 : Math.round(arr[index]);
}

// высчитывем и получем высоту столбца
function getHeightColumn(arr, time) {
  return Math.round(BAR_HEIGHT * time / getMaxElement(arr));
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * GAP, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * GAP, CLOUD_Y + GAP * 5);
  renderHistogram(ctx, names, times);
};
