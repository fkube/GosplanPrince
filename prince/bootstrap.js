require(['domReady', 'jquery', 'app/game'], function(doc, $, Game) {

    console.log('ready');
    Game.start();

});