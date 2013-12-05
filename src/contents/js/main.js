/**
 * Created with PhpStorm.
 * Date: 202013/11/16
 */
var STATUS = {
    INIT : 0,
    EXPLAIN : 1,
    EXPLAIN_FINISHED : 2,
    QUIZ_QUESTION : 3,
    QUIZ_COUNTDOWN : 4,
    QUIZ_TIMEOUT : 5,
    QUIZ_BEFORE_ANSWER : 6,
    QUIZ_ANSWER : 7,
    QUIZ_NEXT : 8
};

(function(){window.addEventListener("load", function(){
    var _this = this;
    var VARS_KEY = "QUIZ_COUNTDOWN_VARS";

    _this.vars = {
        state : STATUS.INIT,
        explanationPage : 0,
        quizNumber : 0
    };

    _this.objs = {
        top : null,
        explanation : null,
        quiz : null,
        sound : null,
        button : {
            explanation : null,
            start : null,
            reset : null
        }
    };

    _this.handlers = {
        // 説明ボタン
        onClickExplanation : function(){
            _this.vars.state = STATUS.EXPLAIN;
            _this.funcs.saveVars();

            _this.funcs.hide();
            _this.objs.explanation.show();
        },

        // 説明ページ変更
        onChangeExplanationPage : function(page){
            _this.vars.explanationPage = page;
            _this.funcs.saveVars();
        },

        // 説明終了
        onFinishExplanation : function(){
            _this.vars.state = STATUS.EXPLAIN_FINISHED;
            _this.funcs.saveVars();

            _this.objs.explanation.hide();
            _this.funcs.show();
        },

        // スタートボタン
        onClickStart : function(){
            _this.funcs.hide();
            _this.objs.quiz.show();
            _this.objs.quiz.doQuestion(_this.vars.quizNumber, _this.vars.state);
        },

        // Quiz状態変更
        onChangeQuizState : function(quizNumber, state){
            _this.vars.state = state;
            _this.vars.quizNumber = quizNumber;
            _this.funcs.saveVars();
        },

        // リセットボタン
        onClickReset : function(){
            if(confirm("最初から始めますか？") == true){
                _this.vars.quizNumber = 0;
                _this.vars.explanationPage = 0;
                _this.vars.state = STATUS.INIT;
                _this.handlers.onClickStart();
            }
        },

        onFinishQuiz : function(){
            _this.objs.quiz.hide();
            _this.objs.button.start.hide();
            _this.funcs.show();
        }
    };

    _this.funcs = {
        // 初期化
        init : function(){
            _this.objs.top = $("<div>")
                .appendTo($("#site_box"))
                .css({
                    zIndex : 0,
                    background : "url(template/background.png) no-repeat fixed"
                })
                .fullScreen();

            var title = $("<div>")
                .appendTo(_this.objs.top)
                .css({
                    zIndex : 10,
                    position : "fixed",
                    left : '10%',
                    top : '15%',
                    width : '80%',
                    height : 100,
                    textAlign: 'center',
                    fontSize : '100px',
                    lineHeight: '100px',
                    color : Template.top.titleColor
                })
                .html(Template.top.title);

            var subTitle = $("<div>")
                .appendTo(_this.objs.top)
                .css({
                    zIndex : 11,
                    position : 'fixed',
                    bottom : '50%',
                    right : '5%',
                    width : '35%',
                    height : 80,
                    fontSize : '80px',
                    lineHeight: '80px',
                    color : Template.top.titleColor
                })
                .html("◯✕クイズ");


            _this.objs.button.explanation = $("<a>")
                .appendTo(_this.objs.top)
                .css({
                    zIndex : 10
                })
                .makeButton({
                    text : 'ルール説明',
                    pos : ['20%', '65%', 200, 60],
                    color : Template.top.buttonColor
                })
                .on('click', function(){
                    _this.handlers.onClickExplanation();
                });

            var restart = (_this.vars.quizNumber != 0 || _this.vars.state >= STATUS.QUIZ_TIMEOUT);

            _this.objs.button.start = $("<a>")
                .appendTo(_this.objs.top)
                .css({
                    zIndex : 10
                })
                .makeButton({
                    text : restart ? 'クイズ再開' : 'クイズスタート',
                    pos : restart ? ['45%', '65%', 200, 60] : ['70%', '65%', 200, 60],
                    color : Template.top.buttonColor
                })
                .on('click', function(){
                    _this.handlers.onClickStart();
                });

            _this.objs.button.reset = $("<a>")
                .css({
                    zIndex : 10
                })
                .makeButton({
                    text : '最初から始める',
                    pos :  ['70%', '65%', 200, 60],
                    color : Template.top.buttonColor
                })
                .on('click', function(){
                    _this.handlers.onClickReset();
                });

            if(!restart){
                _this.objs.button.reset.hide();
            }
            _this.objs.button.reset.appendTo(_this.objs.top)


            _this.objs.sound = new Sound();
            _this.objs.explanation = new Explanation(_this.handlers, _this.objs.sound);
            _this.objs.quiz = new Quiz(_this.handlers, _this.objs.sound);
        },

        // トップ画面を表示する
        show : function(){
            _this.objs.top.show();
        },

        // トップ画面を隠す
        hide : function(){
            _this.objs.top.hide();
        },

        restoreVars : function(){
            _this.vars = $.extend(true, {}, _this.vars, JSON.parse(localStorage.getItem(VARS_KEY)));
        },

        saveVars : function(){
            localStorage.setItem(VARS_KEY, JSON.stringify(_this.vars));
        }
    };

    _this.funcs.restoreVars();
    _this.funcs.init();

}, false);})();
