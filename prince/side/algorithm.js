define('side/algorithm', [], function() {

    return function(number, algo) {
        var ctx = {};
        ctx.this = this;
        ctx.code = algo;

        this.createControls = function ($view, $controls) {
            var $change = $view.parent().find('.change-algo');
            $change.show();

            var $changeForm = $change.find('.side-' + number + '-algo');
            $changeForm.show();

            $changeForm.find('textarea').val(algo);
        };

        this.move = function (prevOpponentChoice) {
            // safe IIFE container with
            // legacy context execution
            var move = (function() {

                with( this ) {
                    return eval( '(function(prevOpponentChoice){ '+ this.code +' })(prevOpponentChoice);' );
                }

            }).apply( ctx );

            return move;
        };

        this.clean = function () {

        };

    };

});