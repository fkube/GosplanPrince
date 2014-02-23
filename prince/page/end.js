define('page/end', ['require', 'text!page/view/end.html', 'handlebars'], function (require, view) {

    return function () {

        this.create = function ($root, args) {

            var context = {
                winner: args.winner
            };

            var template = Handlebars.compile(view);
            var html = template(context);

            $root.append(html);

            $root.find('.controls').off('click');
        };

    };

});