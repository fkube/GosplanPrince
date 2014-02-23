define('side/computer', ['require',
            'side/algo/grunt', 'side/algo/boss','side/algo/jaffar'
], function(require) {

    return function(number, algo) {
        this.moveChoice = null;

        var sideAlgo = require("side/algo/" + algo);
        this.algo = new sideAlgo();

        this.move = function (prevOpponentChoice) {
            return this.algo.move(prevOpponentChoice);
        };

    };

});