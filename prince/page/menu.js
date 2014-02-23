define('page/menu', ['require', 'text!page/view/menu.html',
                        'side/abstract', 'side/player', 'side/computer', 'side/algorithm',
                        'side/render/guard',
                     'handlebars'
        ], function(require, view, SideInterface) {

    var context = {
        sideTypes: {
            player: 'Игрок',
            computer: 'Компьютер',
            algorithm: 'Алгоритм'
        },
        computerTypes: ['grunt', 'boss', 'jaffar'],
        sides: [
            { i: 1, types: ['player', 'computer', 'algorithm'] },
            { i: 2, types: ['computer', 'algorithm'] }
        ]
    };

    Handlebars.registerHelper('compTypes', function(items, options) {
        var result = '';
        for(var i in context.computerTypes) {
            result += options.fn(context.computerTypes[i]);
        }
        return result;
    });
    Handlebars.registerHelper('label', function(items, options) {
        return context.sideTypes[this];
    });
    Handlebars.registerHelper('firstChecked', function(i, options) {
        if((i==1 && this == 'player') || (i==2 && this == 'computer')){
            return options.fn(this);
        }
    });
    Handlebars.registerHelper('isPlayer', function(items, options) {
        return (items == 'player') ? options.fn(this) : '';
    });
    Handlebars.registerHelper('isComputer', function(items, options) {
        return (items == 'computer') ? options.fn(this) : '';
    });
    Handlebars.registerHelper('isAlgorithm', function(items, options) {
        return (items == 'algorithm') ? options.fn(this) : '';
    });

    var algoDefault = "if(prevOpponentChoice) {\n\
    return prevOpponentChoice;\n\
}\n\
\n\
var rand = parseInt(Math.random() * 10 % 3);\n\
return (rand == 2 ? 'rock' : (rand == 1 ? 'scissors' : 'paper' ));\n";

    return function(){
        var that = this;

        this.create = function ($root, args) {
            $root.empty();
            var template = Handlebars.compile(view);
            var html = template(context);
            $root.append(html);

            this.$campaign = $root.find('.campaign button');
            this.$skirmish = $root.find('.skirmish button');

            this.$side1 = $root.find('.side-1 input');
            this.$side2 = $root.find('.side-2 input');

            var $side1 = $root.find('.side-1 .algorithm');
            var $algo1 = $side1.find('.algo');
            if(typeof args.sige1algo != 'undefined' && args.sige1algo){
                $side1.find('input').attr('checked', 'checked');

                $algo1.val(args.sige1algo);
            } else {
                $algo1.val(algoDefault);
            }

            var $side2 = $root.find('.side-2 .algorithm');
            var $algo2 = $side2.find('.algo');
            if(typeof args.sige2algo != 'undefined' && args.sige2algo){
                $side2.find('input').attr('checked', 'checked');

                $algo2.val(args.sige2algo);
            } else {
                $algo2.val(algoDefault);
            }
        };

        this.bindings = function () {
            return [
                { element: this.$campaign, callback: this.startCampaign },
                { element: this.$skirmish, callback: this.startSkirmish }
            ];
        };

        this.createSide = function(name, number, algo){
            var side = require("side/" + name);
            SideInterface.extend(side);

            return new side(number, algo);
        };

        this.startCampaign = function(Page){
            Page.changeTo('campaign', {
                side1: that.createSide('player', 1, null),
                side2: that.createSide('computer', 2, null)
            });
        };

        this.getSideFromForm = function(inputs, number){
            var checked = inputs.filter(':checked');

            var name = checked.val();
            var algo = checked.closest('.side-option').find('.algo').val();

            return that.createSide(name, number, algo);
        };

        this.startSkirmish = function(Page){
            Page.changeTo('skirmish', {
                side1: that.getSideFromForm(that.$side1, 1),
                side2: that.getSideFromForm(that.$side2, 2)
            });
        };
    };

});