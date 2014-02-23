define('page/skirmish', ['require', 'text!page/view/skirmish.html', 'page/end'], function (require, view) {

    var HEALTH = 3;

    return function () {
        this.side1choice = null;
        this.side2choice = null;

        this.side1LastChoice = null;
        this.side2LastChoice = null;

        this.end = false;

        var that = this;

        this.create = function ($root, args) {
            $root.empty();
            $root.append(view);

            this.$root = $root;

            this.$quit = $root.find('.quit');
            this.$showAlgo = $root.find('.show-algo');
            this.$algoForm = $root.find('.algo-form');

            this.$side1algo= $root.find('.side-1-algo textarea');
            this.$side2algo= $root.find('.side-2-algo textarea');

            this.$view = $root.find('.view');
            this.$info = $root.find('.info');
            this.$controls = $root.find('.controls');

            this.side1 = args.side1;
            this.side2 = args.side2;

            this.initSide(this.side1, 1);
            this.initSide(this.side2, 2);
        };

        this.initSide = function(side, number){
            side.setHealth(HEALTH);

            side.create(this.$view, this.$info.find('.side-' + number + '-health'), this.$controls);
        };

        this.destroy = function() {
            if(this.side1){
                this.side1.destroy();
                delete this.side1;
            }
            if(this.side2){
                this.side2.destroy();
                delete this.side1;
            }
        };

        this.bindings = function () {
            var bindings = $.merge(this.side1.bindings(), this.side2.bindings());

            bindings = $.merge(bindings, [
                { element: this.$quit, callback: this.quit },
                { element: this.$showAlgo, callback: this.showAlgo },
                { element: this.$root, event: 'player1win', callback: this.player1win },
                { element: this.$root, event: 'player2win', callback: this.player2win }
            ]);

            return bindings;
        };

        this.showAlgo = function (Page, el) {
            that.$algoForm.show();
        };

        this.endGame = function(Page, winner){
            that.end = true;
            Page.changeTo('end', {
                winner: winner
            });
        };

        this.player1win = function(Page, el) {
            that.endGame(Page, 1);
        };

        this.player2win = function(Page, el) {
            that.endGame(Page, 2);
        };

        this.quit = function (Page, el) {
            var side1html = that.$side1algo.val();
            var side2html = that.$side2algo.val();
            Page.changeTo('menu', {
                sige1algo: side1html,
                sige2algo: side2html
            });
        };

        this.isCorrectChoice = function (choice) {
            var choices = ['paper', 'scissors', 'rock'];
            for (var key in choices) {
                if (choice == choices[key]) {
                    return true;
                }
            }

            return false;
        };

        this.whoWin = function (choice1, choice2) {
            if (!this.isCorrectChoice(choice1)) {
                return 2;
            }
            if (!this.isCorrectChoice(choice2)) {
                return 1;
            }

            if (choice1 == choice2) {
                return 0;
            }

            switch (choice1) {
                case 'rock':
                    return choice2 == 'paper' ? 2 : 1;
                case 'paper':
                    return choice2 == 'scissors' ? 2 : 1;
                case 'scissors':
                    return choice2 == 'rock' ? 2 : 1;
            }

            //FIXME unexpected!
            return 2;
        };

        this.result = function(win){
            switch (win) {
                case 0:
                    break;
                case 1:
                    this.side2.hurt();
                    break;
                default:
                case 2:
                    this.side1.hurt();
                    break;
            }
        };

        this.moveDone = function(choice1, choice2){
            if(!choice1 || !choice2){
                return false;
            }

            //this.$result.html('y:' + choice1 + ' c:' + choice2);

            var win = this.whoWin(choice1, choice2);

            var who = this.result(win);

            if(this.side1.isDead()){
                this.$root.trigger('player2win');
            }
            if(this.side2.isDead()){
                this.$root.trigger('player1win');
            }

            this.side1previousChoice = choice1;
            this.side2previousChoice = choice2;

            this.side1.clean();
            this.side2.clean();

            return true;
        };

        this.update = function () {
            if(this.end){
               return;
            }

            this.side1.update();
            this.side2.update();

            if(!this.side1choice){
                this.side1choice = this.side1.move(this.side2LastChoice)
            }

            if(!this.side2choice){
                this.side2choice = this.side2.move(this.side1LastChoice)
            }

            if( this.moveDone(this.side1choice, this.side2choice) ) {
                this.side1LastChoice = this.side1choice;
                this.side2LastChoice = this.side2choice;

                this.side1choice = null;
                this.side2choice = null;
            }
        };

        this.render = function (interpolation) {
            this.side1.render(interpolation);
            this.side2.render(interpolation);
        }
    };

});