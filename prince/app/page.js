define('app/page', ['require', 'app/render', 'page/abstract',
                        'page/menu', 'page/skirmish'
        ], function(require, Render, PageInterface) {

    var Page = function(){
        this.page = null;
        this.pageName = '';
    };

    Page.prototype.create = function(args){
        var $root = Render.$root;

        this.page.create($root, args);
        console.log('Page ' + this.pageName + ' created');

        var that = this;
        var bindings = this.page.bindings();
        $.each(bindings, function(element, binding){
            var callback = null, event = null;

            if(typeof binding == 'function'){
                callback = binding;
            } else {
                event = binding.event;
                callback = binding.callback;
                element = binding.element;
            }

            if(typeof(element) == 'string'){
                element = $root.find(element);
            }

            if(typeof event == 'undefined'){
                event = 'click';
            }

            element.on(event, function(){
                callback(that, $(this));
                return false;
            });
        });
    };

    Page.prototype.destroy = function(){
        if(! this.page) return;

        this.page.destroy();
        delete this.page;
    };

    Page.prototype.update = function(){
        if(! this.page) return;

        this.page.update();
    };

    Page.prototype.render = function(interpolation){
        if(! this.page) return;

        this.page.render(interpolation);
    };

    Page.prototype.changeTo = function(pageName, args){
        this.destroy();

        this.pageName = pageName;

        var page = require("page/" + pageName);
        PageInterface.extend(page);

        this.page = new page();

        this.create(args);
    };

    var page = new Page();

    page.changeTo('menu', {});

    return page;
});