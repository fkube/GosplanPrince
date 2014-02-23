define('page/abstract', [], function() {

    var PageInterface = function(){
        return {
            create: function ($root, args) {

            },

            bindings: function () {
                return {
                    '.non': function(Page, el){  }
                };
            },

            destroy: function () {

            },

            render: function (interpolation) {
            },

            update: function () {
            }
        };
    };

    return {
        'extend': function(page){
            page.prototype = new PageInterface();
            page.prototype.constructor = page;
            page.prototype.parent = PageInterface.prototype;
        }
    };

});