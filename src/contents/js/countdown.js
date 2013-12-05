/**
 * Created with PhpStorm.
 * Date: 202013/11/21
 */

(function($){
    $.fn.countDown=function(onFinish, sound){
        var count = 10;

        return this.each(function(i){
            var j;
            var _this = this;

            var onTimer = function(){
                count = count - 1;

                meters[count]
                    .fadeOut(500, function(){
                        $(this).hide();
                    });

                if(count > 0){
                    sound.play(count)
                    number.html("" + count);
                    setTimeout(function(){
                        onTimer();
                    }, 1000);
                }
                else{
                    sound.play(Sound.FUE);
                    number.hide();
                    timeUp.show();
                    onFinish();
                }
            };

            $(this)
                .css({
                    width : 300,
                    height : 300
                })
                .opacity(0.7);

            var number = $("<div>")
                .appendTo($(this))
                .css({
                    zIndex: 301,
                    position: "absolute",
                    top: 50,
                    left :0,
                    width : 300,
                    height : 200,
                    textAlign: 'center',
                    fontFamily : 'Osaka',
                    fontSize : '200px',
                    color : "333333",
                    lineHeight: '200px',
                    textShadow: "-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff"
                })
                .html("" + count);

            var timeUp = $("<div>")
                .appendTo($(this))
                .css({
                    zIndex: 301,
                    position: "absolute",
                    top: 115,
                    left :0,
                    width : 300,
                    height : 70,
                    textAlign: 'center',
                    fontFamily : 'Osaka',
                    fontSize : '70px',
                    color : "#ff0000",
                    textShadow: "-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff"
                })
                .html("TimeUp");

            var meters = [];
            for(j=0; j<10; j++){
                var imageNo = j<9 ? "0" + (j+1) : "" + (j+1);
                var meter = $("<div>")
                    .appendTo($(this))
                    .css({
                        zIndex : 300,
                        position: "absolute",
                        top: 0,
                        left :0,
                        width: 300,
                        height: 300,
                        background : "url(contents/images/counter" + imageNo + ".png) no-repeat"
                    });

                meters.push(meter);
            }

            this.reset = function(){
                count = 10;

                number
                    .html("" + count)
                    .show();
                for(j=0; j<10; j++){
                    meters[j].show();
                }
                timeUp.hide();

                $(_this).hide();
            };

            this.start = function(){
                $(_this).show();

                setTimeout(function(){
                    onTimer();
                }, 1000);
            }
        });
    };
})(jQuery);