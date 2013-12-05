/**
 * Created with JetBrains PhpStorm.
 * Date: 2013/01/17
 */

(function($){
	$.fn.siteDescriptionSlide=function(contents, handlers, sound){
		var vars = {
			page : 0,
			contents : contents,
			pages : [],
			visibility : false,
            handlers : handlers,
            disableNext : true
		};

        return this.each(function(i){
			var _this = this;

            var onKeyDown = function(e){
                if(e.keyCode == 0x20 && vars.visibility){
                    onNext();
                }
            };

			var onNext = function(){
                if(vars.disableNext == false){
                    if(vars.page+1 < vars.pages.length){
                        setPage(vars.page+1);
                    }
                    else{
                        vars.handlers.onFinishExplanation();
                    }
                }
			};

			var writePage = function(){
				for(var i=0; i<vars.contents.pages.length; i++){
					var page = $("<div>")
						.css({
							position : "absolute",
							display : "block",
							visibility : "hidden",
							width : '100%',
							height : '100%'
						})
						.appendTo(contents);

					var items = vars.contents.pages[i].items;
					for(var j=0; j<items.length; j++){
                        if(items[j].type == "sound"){
                            continue;
                        }

						var item;
						switch(items[j].type){
							case "text":
								item = $("<div>")
									.css({
                                        zIndex : 110,
										position: "absolute",
										left: items[j].pos[0],
										top: items[j].pos[1],
										width : items[j].pos[2],
										height : items[j].pos[3],
                                        fontSize: '50px',
                                        color : Template.explanation.color
									})
									.html(items[j].text);
								break;

							case "image":
								item = $("<div>")
									.css({
                                        zIndex : 110,
										position: "absolute",
										left: items[j].pos[0],
										top: items[j].pos[1],
										width : items[j].pos[2],
										height : items[j].pos[3],
										background: "url(" + items[j].image + ") no-repeat 0 0"
									});
								break;

                            case "counter":
                                item = $("<div>")
                                    .css({
                                        position: "absolute",
                                        left: items[j].pos[0],
                                        top: items[j].pos[1],
                                        width : items[j].pos[2],
                                        height : items[j].pos[3],
                                        zIndex : 110
                                    })
                                    .countDown(function(){
                                        vars.disableNext = false;
                                        nextButton.show();
                                    }, sound);

                                break;
						}

						if(items[j]["class"]){
							item.attr({
								"class" : items[j]["class"]
							})
						}

						page.append(item);
                        items[j].obj = item;
					}
					vars.pages.push(page);
				}
			};

			var setPage = function (page) {
                var isCounter = false;

                sound.play(Sound.SLIDE);

                vars.disableNext = true;
                nextButton.hide();

                for(var j=0; j<vars.contents.pages[page].items.length; j++){
                    switch(vars.contents.pages[page].items[j].type){
                        case "counter":
                            vars.contents.pages[page].items[j].obj[0].reset();
                            vars.contents.pages[page].items[j].obj[0].start();
                            isCounter = true;
                            break;
                        case "sound":
                            var number = vars.contents.pages[page].items[j].number;
                            setTimeout(function(){
                                sound.play(number);
                            }, vars.contents.pages[page].items[j].delay);
                            break;
                    }
                }

                if(vars.page != page){
                    vars.pages[vars.page]
                        .animate({
                            left : -$(_this).width(),
                            visibility : "hidden",
                            opacity : 0.0
                        }, 750);
                }

                vars.pages[page]
                    .css({
                        visibility : vars.visibility ? "visible" : "hidden",
                        left : $(_this).width(),
                        opacity : 0.0
                    })
                    .animate({
                        left : 0,
                        visibility : vars.visibility ? "visible" : "hidden",
                        opacity : 1.0
                    }, 750);

				vars.page = page;
                vars.handlers.onChangeExplanationPage(page);

                if(isCounter == false){
                    setTimeout(function(){
                        vars.disableNext = false;
                        nextButton.show();
                    }, Template.explanation.wait);
                }
			};

			$(this)
				.css({
					position: "relative",
					display : "block",
					overflow : "hidden",
					zIndex : 50
				});

            var nextButton = $("<div>")
                .css({
                    position : "fixed",
                    width : 80,
                    height : 80,
                    right : '10%',
                    bottom : '10%',
                    background : "url(contents/images/next_button.png) no-repeat 0 0",
                    zIndex : 120
                })
                .hover(
                    function(){
                        nextButton.opacity(1.0);
                    },
                    function(){
                        nextButton.opacity(0.7);
                    }
                )
                .opacity(0.7)
                .click(function(){
                    onNext();
                })
                .appendTo($(this))
                .hide();

			var contents = $("<div>")
				.css({
					position : "fixed",
					display : "inline-block",
					width : '100%',
					height : '100%',
					left : 0,
					top: 0
				})
				.appendTo($(this));

			this.setVisibility = function(visibility){
				vars.visibility = visibility;
                if(vars.visibility){
                    setPage(0);
                    $(window).on('keydown', function(event){onKeyDown(event);});
                }
                else{
                    $(window).off('keydown');
    				vars.pages[vars.page]
	    				.css({
		    				visibility : "hidden"
			    		});
                    vars.disableNext = true;
                    nextButton.hide();
                }
			};

            writePage();
		});
	};
})(jQuery);



