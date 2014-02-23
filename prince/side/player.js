define('side/player', ['text!side/view/player.html', 'handlebars'], function(view) {

    return function(number, algo) {
        var that = this;

        this.createControls = function ($view, $controls) {
            //todo by value
            var template = Handlebars.compile(view);
            var html = template();
            $controls.append(html);

            this.$buttons = $controls.find(".choice-player button");
        };

        this.bindings = function(){
            return [
                { element: this.$buttons, callback: this.choice }
            ]
        };

        this.choice = function(Page, object){
            if(that.moveChoice){
                return;
            }

            object.addClass('current');
            that.moveChoice = object.attr('name');
        };

        this.move = function (prevOpponentChoice) {
            var move = that.moveChoice;
            that.moveChoice = null;
            return move;
        };

        this.clean = function () {
            that.$buttons.removeClass('current');
        };

    };

});