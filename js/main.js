var CIRCLE = '<div class="game__move-circle" id="circle"></div>';
var CROSS = '<div class="game__move-cross" id="cross"></div>';
var COLORCELL = '#9885ec';
var classNameForCircle = 'game__move-circle';
var classNameForCross = 'game__move-cross';
var gamingCells = document.querySelectorAll('[data-sell-state]');
var gamingField = document.querySelector('#field');
var gameState = document.querySelector('#stateGame');
gameInit();
var game = {
    state: '',
    numPlayerForMove: 1
};
function gameInit() {
    gamingField.addEventListener('click', gamingMove);
    gameState.textContent = 'step cross';
}
function gamingMove(event) {
    var gamingCell = event.target;
    if (gamingCell.getAttribute('data-sell-state') === 'circle' ||
        gamingCell.getAttribute('data-sell-state') === 'cross' ||
        gamingCell.id === 'active') {
        return;
    }
    if (gamingCell.getAttribute('data-sell-state') === 'cell') {
        moveSelect(game.numPlayerForMove, gamingCell);
        game.numPlayerForMove++;
        checkWin();
    }
}
function moveSelect(numPlayer, cell) {
    if (numPlayer % 2 === 0) {
        cell.classList.add('game__move-circle');
        cell.setAttribute('data-sell-state', 'circle');
        gameState.textContent = 'step cross';
    }
    if (numPlayer % 2 > 0) {
        cell.classList.add('game__move-cross');
        cell.setAttribute('data-sell-state', 'cross');
        gameState.textContent = 'step circle';
    }
}
function gameStart() {
    game.numPlayerForMove = 1;
    game.state = 'play';
}
function gameStop() {
    game.state = 'stop';
}
function clearGamingField() {
    gamingCells.forEach(function (elem) {
        elem.classList.remove('game__move-circle');
        elem.classList.remove('game__move-cross');
        elem.setAttribute('data-sell-state', 'cell');
    });
    game.state = '';
    game.numPlayerForMove = 1;
}
function gameFinish(player) {
    gameState.textContent = 'win ' + player;
    gamingField.removeEventListener('click', gamingMove);
}
function checkWin() {
    comboForWin([0, 1, 2], 'cross', 'crossPlayer');
    comboForWin([3, 4, 5], 'cross', 'crossPlayer');
    comboForWin([6, 7, 8], 'cross', 'crossPlayer');
    comboForWin([0, 3, 6], 'cross', 'crossPlayer');
    comboForWin([1, 4, 7], 'cross', 'crossPlayer');
    comboForWin([2, 5, 8], 'cross', 'crossPlayer');
    comboForWin([0, 4, 8], 'cross', 'crossPlayer');
    comboForWin([2, 4, 6], 'cross', 'crossPlayer');
    comboForWin([0, 1, 2], 'circle', 'circlePlayer');
    comboForWin([3, 4, 5], 'circle', 'circlePlayer');
    comboForWin([6, 7, 8], 'circle', 'circlePlayer');
    comboForWin([0, 3, 6], 'circle', 'circlePlayer');
    comboForWin([1, 4, 7], 'circle', 'circlePlayer');
    comboForWin([2, 5, 8], 'circle', 'circlePlayer');
    comboForWin([0, 4, 8], 'circle', 'circlePlayer');
    comboForWin([2, 4, 6], 'circle', 'circlePlayer');
    if (game.numPlayerForMove >= 10) {
        gameState.textContent = 'draw';
    }
}
function comboForWin(arrCells, mark, nameWinner) {
    if (gamingCells[arrCells[0]].getAttribute('data-sell-state') === mark &&
        gamingCells[arrCells[1]].getAttribute('data-sell-state') === mark &&
        gamingCells[arrCells[2]].getAttribute('data-sell-state') === mark) {
        gameFinish(nameWinner);
        paintCells(arrCells, 'blue');
        return;
    }
}
function waitBetweenMoves(time) {
    gamingField.removeEventListener('click', gamingMove);
    setTimeout(function () { gamingField.addEventListener('click', gamingMove); }, time);
}
function paintCells(arrIndex, color) {
    for (var _i = 0, arrIndex_1 = arrIndex; _i < arrIndex_1.length; _i++) {
        var index = arrIndex_1[_i];
        gamingCells[index].style.background = color;
    }
}
var btnRestart = document.querySelector('#restartGame');
btnRestart.addEventListener('click', function () {
    if (game.numPlayerForMove > 1) {
        clearGamingField();
        gameState.textContent = 'retart, field game cleared';
        setTimeout(function () {
            gameState.textContent = 'step cross';
        }, 2000);
        paintCells([0, 1, 2, 3, 4, 5, 6, 7, 8], COLORCELL);
        gamingField.addEventListener('click', gamingMove);
    }
});
