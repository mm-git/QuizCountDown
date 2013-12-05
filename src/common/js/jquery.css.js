(function($) {
	$.fn.borderRadius = function(options) {
	    return this.each(function(i){
			if(options.length === 1){
		        $(this).css({
					webkitBorderRadius: options[0],
					mozBorderRadius: options[0],
					borderRadius: options[0]
		        });
			}
		    else{
				$(this).css({
					webkitTopLeftBorderRadius: options[0],
					mozBorderRadiusTopLeft: options[0],
					borderTopLeftRadius: options[0]
			    });
				$(this).css({
					webkitTopRightBorderRadius: options[1],
					mozBorderRadiusTopRight: options[1],
					borderTopRightRadius: options[1]
			    });
				$(this).css({
					webkitBottomLeftBorderRadius: options[2],
					mozBorderRadiusBottomLeft: options[2],
					borderBottomLeftRadius: options[2]
			    });
				$(this).css({
					webkitBottomRightBorderRadius: options[3],
					mozBorderRadiusBottomRight: options[3],
					borderBottomRightRadius: options[3]
			    });
			}
	    });
	};

	$.fn.opacity = function(options){
		var op = parseInt(options*100);
		return this.each(function(i){
			$(this).css({
				filter: 'alpha(opacity=' + op + ')',
				MozOpacity: options,
				KHTMLOpacity: options,
				opacity: options
			});
		});
	};

	$.fn.boxShadow = function(options){
		return this.each(function(i){
			$(this).css({
				webkitBoxShadow: options,
				mozBoxShadow: options,
				boxShadow: options
			});
		});
	};

    var brightness = function(color, factor){
        var r = Math.min(255, Math.floor(parseInt(color.substr(1,2),16) * factor));
        var g = Math.min(255, Math.floor(parseInt(color.substr(3,2),16) * factor));
        var b = Math.min(255, Math.floor(parseInt(color.substr(5,2),16) * factor));

        return "rgb(" + r + "," + g + "," +b + ")";
    };

	$.fn.makeButton = function(options){
		return this.each(function(i){
			$(this)
                .attr({
                    href : "#"
                })
                .html(options.text)
                .css({
                    position: "fixed",
                    left: options.pos[0],
                    top: options.pos[1],
                    width : options.pos[2],
                    height : options.pos[3],
                    lineHeight : options.pos[3] + "px",
                    textAlign: "center",
                    textDecoration: "none",
                    color: options.color,
                    fontSize: "26px"
                })
                .css("background", "-moz-linear-gradient(top, #f2f5f7, #deedf7)")
                .css("background", "-webkit-gradient(linear, left top, left bottom, from(#f2f5f7), to(#deedf7))")
                .borderRadius([10])
                .boxShadow('5px 5px 5px rgba(0,0,0,0.7)')
                .on({
                    mouseenter : function(){
                        $(this)
                        .css({
                            color: brightness(options.color, 0.7)
                        })
                        .css("background", "-moz-linear-gradient(top, #e2e5e7, #becdd7)")
                        .css("background", "-webkit-gradient(linear, left top, left bottom, from(#e2e5e7), to(#becdd7))");
                    },
                    mouseleave : function(){
                        $(this)
                        .css({
                            color: options.color
                        })
                        .css("background", "-moz-linear-gradient(top, #f2f5f7, #deedf7)")
                        .css("background", "-webkit-gradient(linear, left top, left bottom, from(#f2f5f7), to(#deedf7))");
                    }
                });
		});
	};

    $.fn.fullScreen = function(){
        return this.each(function(i){
            var size = '100% 100%';

            $(this).css({
                position : 'fixed',
                width : '100%',
                height : '100%',
                top : 0,
                left : 0,
                backgroundSize : size,
                mozBackgroundSize : size,
                webkitBackgroundSize : size
            });
        });
    };

})(jQuery);
