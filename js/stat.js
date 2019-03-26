'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_HEIGHT = 20;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var barHeight = MAX_BAR_HEIGHT - TEXT_HEIGHT - GAP;

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function(ctx, players, times) {
  var currentBarHeight;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_HEIGHT, CLOUD_Y + TEXT_HEIGHT + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_HEIGHT, CLOUD_Y + TEXT_HEIGHT + TEXT_HEIGHT + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    currentBarHeight = (barHeight * times[i]) / maxTime;

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + TEXT_WIDTH) * i), CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + TEXT_WIDTH) * i), CLOUD_HEIGHT - TEXT_HEIGHT - TEXT_HEIGHT - currentBarHeight);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + (Math.random() * (1 - 0.4) + 0.4) + ')';
    }

    ctx.fillRect(CLOUD_X + BAR_WIDTH + ((BAR_WIDTH + TEXT_WIDTH) * i), CLOUD_HEIGHT - TEXT_HEIGHT - GAP - currentBarHeight, BAR_WIDTH, currentBarHeight);
  }
}
