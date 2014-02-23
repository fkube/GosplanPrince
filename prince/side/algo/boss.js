define('side/algo/boss', [], function() {

    return function() {
        console.log("Hi, I'm Boss");
        
        this.move = function (prevOpponentChoice) {
            var rand = parseInt(Math.random() * 10 % 3);
            switch (rand) {
                case 0:
                    return 'rock';
                case 1:
                    return 'paper';
                case 2:
                default:
                    return 'scissors';
            }
        };

    };

});