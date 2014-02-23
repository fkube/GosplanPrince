define('side/abstract', [], function() {

    var SideInterface = function(){
        return {
            setHealth: function (health) {
                this.health = health;
            },
            getHealth: function () {
                return this.health;
            },
            isDead: function () {
                return (this.health <= 0);
            },
            hurt: function () {
                this.health--;

                //TODO render!
                this.$health.html(this.health);
            },

            create: function ($view, $info, $controls) {
                this.$health = $info;

                this.createControls($view, $controls);

                this.$health.html(this.health);
            },

            createControls: function ($view, $controls) {

            },
            bindings: function () {
                return [];
            },
            destroy: function () {

            },
            move: function (prevOpponentChoice) {
                return 'scissors';
            },
            clean: function(){

            },
            update: function () {
                return 'scissors';
            },
            render: function(interpolation){

            }
        };
    };

    return {
        'extend': function(side){
            side.prototype = new SideInterface();
            side.prototype.constructor = side;
            side.prototype.parent = SideInterface.prototype;
        }
    };

});

