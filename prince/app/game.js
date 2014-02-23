define('app/game', ['jquery', 'module', 'app/page'], function($, module, Page) {

    var $root = $( module.config().root );

    return {

        $root: function(){
            return $root;
        },

        start: function() {
            var fps = 24;

            var loops = 0, skipTicks = 1000 / fps,
                maxFrameSkip = 10,
                nextGameTick = (new Date).getTime(),
                lastGameTick;

            var onEachFrame;
            if (window.webkitRequestAnimationFrame) {
                onEachFrame = function (cb) {
                    var _cb = function () {
                        cb();
                        webkitRequestAnimationFrame(_cb);
                    };
                    _cb();
                };
            } else if (window.mozRequestAnimationFrame) {
                onEachFrame = function (cb) {
                    var _cb = function () {
                        cb();
                        mozRequestAnimationFrame(_cb);
                    };
                    _cb();
                };
            } else {
                onEachFrame = function (cb) {
                    window.setInterval(cb, 1000 / 60);
                };
            }

            this.onEachFrame = onEachFrame;

            var that = this;

            that.loop = function () {
                loops = 0;

                while ((new Date).getTime() > nextGameTick) {
                    Page.update();

                    nextGameTick += skipTicks;
                    loops++;
                }

                if (!loops) {
                    Page.render((nextGameTick - (new Date).getTime()) / skipTicks);
                } else {
                    Page.render(0);
                }
            };

            that.onEachFrame(that.loop);
        }

    };
});