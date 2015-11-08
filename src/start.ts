/// <reference path="game/game.ts"/>
/// <reference path="renderer/stage.ts"/>

let stage = new Stage('voyager');
let game = new Game(stage, [{ id: 'level1' }, { id: 'level2' }]);
game.play();
