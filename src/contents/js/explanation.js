/**
 * Created with PhpStorm.
 * Date: 202013/11/16
 */

var Explanation = function(handlers, sound)
{
    var _this = this;

    this.contents = {
        "title" : "説明",
        "pages" : [
            {
                "title" : "説明1",
                "items" : [
                    {
                        "type" : "text",
                        "pos" :['15%', '15%', '70%', 200],
                        "text" : "問題は◯✕クイズです。頭の上で◯か✕を出して答えてください。",
                        "class" : "slideDescription"
                    },
                    {
                        "type" : "image",
                        "pos" :['20%', '30%', 400, 600],
                        "image" : "template/goodman.png"
                    },
                    {
                        "type" : "image",
                        "pos" :['50%', '30%', 400, 600],
                        "image" : "template/badman.png"
                    }
                ]
            },
            {
                "title" : "説明2",
                "items" : [
                    {
                        "type" : "text",
                        "pos" :['15%', '15%', '70%', 200],
                        "text" : "問題の制限時間は10秒です。問題を読み終えるとカウントダウンを始めます。",
                        "class" : "slideDescription"
                    },
                    {
                        "type" : "counter",
                        "pos" :['40%', '40%', 300, 300]
                    }
                ]
            },
            {
                "title" : "説明3",
                "items" : [
                    {
                        "type" : "text",
                        "pos" :['15%', '15%', '70%', 200],
                        "text" : "問題の答えは隣の人とは相談せず、自分で考えて下さい。",
                        "class" : "slideDescription"
                    },
                    {
                        "type" : "image",
                        "pos" :['20%', '30%', 400, 600],
                        "image" : "template/earman.png"
                    },
                    {
                        "type" : "image",
                        "pos" :['50%', '25%', 400, 600],
                        "image" : "template/chatman.png"
                    },
                    {
                        "type" : "image",
                        "pos" :['30%', '50%', 600, 200],
                        "image" : "template/bad.png"
                    },
                    {
                        "type" : "sound",
                        "number" : Sound.BAD,
                        "delay" : 500
                    }
                ]
            },
            {
                "title" : "説明4",
                "items" : [
                    {
                        "type" : "text",
                        "pos" :['15%', '15%', '70%', 200],
                        "text" : "それではクイズを始めます。皆さん御起立お願いします。間違えた人は着席してください。",
                        "class" : "slideDescription"
                    }
                ]
            }
        ]        
    };


    this.slide = $("<div>")
        .appendTo($('#site_box'))
        .css({
            zIndex : 100,
            background : "url(template/backexp.png) no-repeat fixed"
        })
        .fullScreen()
        .siteDescriptionSlide(this.contents, handlers, sound)
        .hide();
};

Explanation.prototype = {
    show : function(){
        this.slide[0].setVisibility(true);
        this.slide.show();
    },

    hide : function(){
        this.slide.hide();
        this.slide[0].setVisibility(false);
    }
};
