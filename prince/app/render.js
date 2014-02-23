define('app/render', ['jquery', 'module'], function($, module) {

    var $root = $( module.config().root );

    return {

        $root: $root

    };
});