/**
 * Created with PhpStorm.
 * Date: 202013/11/20
 */

var Quiz = function(handler, sound)
{
    var _this = this;

    this.status = STATUS.QUIZ_QUESTION;
    this.quizNumber = 0;
    this.handler = handler;
    this.sound = sound;
    this.disableNext = true;

    this.base = $("<div>")
        .appendTo($('#site_box'))
        .css({
            zIndex : 200,
            background : "url(template/backexp.png) no-repeat fixed"
        })
        .fullScreen()
        .hide();

    this.nextButton = $("<div>")
        .appendTo(this.base)
        .css({
            zIndex : 300,
            position : "fixed",
            width : 80,
            height : 80,
            right : '5%',
            bottom : '10%',
            background : "url(contents/images/next_button.png) no-repeat 0 0"
        })
        .hover(
            function(){
                _this.nextButton.opacity(1.0);
            },
            function(){
                _this.nextButton.opacity(0.7);
            }
        )
        .opacity(0.7)
        .click(function(){
            _this.onNext();
        })
        .hide();

    this.question = $("<div>")
        .appendTo(this.base)
        .css({
            zIndex : 210,
            width : "100%",
            height: "100%"
        })
        .hide();

    this.quiz = $("<div>")
        .appendTo(this.question)
        .css({
            zIndex : 211,
            position : 'absolute',
            left : '10%',
            top : '15%',
            width : '80%',
            height : '70%',
            fontSize : '80px',
            lineHeight : "80px",
            color : Template.quiz.color
        });

    this.counter = $("<div>")
        .appendTo(this.question)
        .css({
            zIndex : 212,
            position : "absolute",
            bottom : '20%',
            right : '5%'
        })
        .countDown(function(){
            _this.onFinishCountdown();
        }, sound);

    this.counted = $("<div>")
        .appendTo(this.base)
        .css({
            zIndex : 220,
            width : "100%",
            height: "100%"
        })
        .hide();

    this.countedMessage = $("<div>")
        .appendTo(this.counted)
        .css({
            zIndex : 221,
            position : 'absolute',
            top : '40%',
            left : '10%',
            width : '80%',
            height : '20%',
            textAlign: 'center',
            align : 'center',
            fontSize : '100px',
            lineHeight : "100px",
            color : Template.quiz.color
        })
        .html("正解は！！");

    this.answer = $("<div>")
        .appendTo(this.base)
        .css({
            zIndex : 230,
            width : "100%",
            height: "100%"
        })
        .hide();

    this.answerMessage = $("<div>")
        .appendTo(this.answer)
        .css({
            zIndex : 231,
            position : 'absolute',
            top : '10%',
            left : '10%',
            width : '80%',
            height : '40%',
            textAlign: 'center',
            align : 'center',
            fontSize : '400px',
            lineHeight: '400px',
            fontWeight: 'bold',
            color : "#ff0000"
        })
        .html("◯");

    this.answerComment = $("<div>")
        .appendTo(this.answer)
        .css({
            zIndex : 232,
            position : 'absolute',
            bottom : '15%',
            left : '10%',
            width : '80%',
            height : '10%',
            textAlign: 'center',
            align : 'center',
            fontSize : '80px',
            lineHeight: '80px',
            color : Template.quiz.color
        });

    this.next = $("<div>")
        .appendTo(this.base)
        .css({
            zIndex : 240,
            width : "100%",
            height: "100%"
        })
        .hide();

    this.nextMessage = $("<div>")
        .appendTo(this.next)
        .css({
            zIndex : 241,
            position : 'absolute',
            top : '40%',
            left : '10%',
            width : '80%',
            height : '20%',
            textAlign: 'center',
            align : 'center',
            fontSize : '100px',
            lineHeight : "100px",
            color : Template.quiz.color
        })
        .html("次の問題！");

    this.returnButton = $("<div>")
        .appendTo(this.next)
        .css({
            zIndex : 242,
            position : "fixed",
            width : 80,
            height : 80,
            right : '5%',
            bottom : '10%',
            background : "url(contents/images/return_button.png) no-repeat 0 0"
        })
        .hover(
            function(){
                _this.returnButton.opacity(1.0);
            },
            function(){
                _this.returnButton.opacity(0.7);
            }
        )
        .opacity(0.7)
        .click(function(){
            _this.handler.onFinishQuiz();
        })
        .hide();
};

Quiz.prototype = {
    show : function(){
        var _this = this;
        this.base.show();
        $(window).on('keydown', function(event){_this.onKeyDown(event)});
    },

    hide : function(){
        $(window).off('keydown');
        this.base.hide();
    },

    onKeyDown : function(e){
        var _this = this;

        if(e.keyCode == 0x20){
            this.onNext();
        }
    },

    onNext : function(){
        var _this = this;
        var isEnd = false;

        if(this.disableNext){
            return;
        }

        this.disableNext = true;
        this.nextButton.hide();

        switch(this.status){
            case STATUS.QUIZ_QUESTION:
                this.status = STATUS.QUIZ_COUNTDOWN;
                this.handler.onChangeQuizState(this.quizNumber, this.status);
                this.counter[0].start();
                return;
            case STATUS.QUIZ_COUNTDOWN:
                return;
            case STATUS.QUIZ_TIMEOUT:
                this.status = STATUS.QUIZ_BEFORE_ANSWER;
                this.handler.onChangeQuizState(this.quizNumber, this.status);
                this.question.hide();
                this.counted.show();
                this.sound.play(9);
                break;
            case STATUS.QUIZ_BEFORE_ANSWER:
                this.status = STATUS.QUIZ_ANSWER;
                this.handler.onChangeQuizState(this.quizNumber, this.status);
                this.counted.hide();

                if(QuizList[this.quizNumber].a == 0){
                    this.answerMessage
                        .css({
                            color: "#ff0000"
                        })
                        .html("◯");
                    this.sound.play(Sound.GOOD);
                }
                else{
                    this.answerMessage
                        .css({
                            color: "#0000ff"
                        })
                        .html("✕");
                    this.sound.play(Sound.BAD);
                }
                this.answerComment.html(QuizList[this.quizNumber].comment);
                this.answer.show();
                break;
            case STATUS.QUIZ_ANSWER:
                this.status = STATUS.QUIZ_NEXT;
                this.handler.onChangeQuizState(this.quizNumber, this.status);

                this.returnButton.hide();

                if(this.quizNumber+1 == QuizList.length-1){
                    this.nextMessage.html("最後の問題！！");
                }
                else if(this.quizNumber+1 == QuizList.length){
                    this.nextMessage.html("おしまい");
                    this.returnButton.show();
                    isEnd = true;
                }
                else{
                    this.nextMessage.html("次の問題！");
                }

                this.answer.hide();
                this.next.show();
                this.sound.play(Sound.NEXT);
                break;
            case STATUS.QUIZ_NEXT:
                this.doQuestion(this.quizNumber+1, STATUS.QUIZ_QUESTION);
                break;
        }

        if(isEnd == false){
            setTimeout(function(){
                _this.disableNext = false;
                _this.nextButton.show();
            }, Template.quiz.wait);
        }
    },

    doQuestion : function(quizNumber, state){
        var _this = this;

        this.counted.hide();
        this.answer.hide();
        this.question.hide();

        if(quizNumber < QuizList.length){
            this.next.hide();

            switch(state){
                case STATUS.INIT:
                case STATUS.EXPLAIN:
                case STATUS.EXPLAIN_FINISHED:
                case STATUS.QUIZ_QUESTION:
                case STATUS.QUIZ_COUNTDOWN:
                    this.status = STATUS.QUIZ_QUESTION;
                    this.quizNumber = quizNumber;
                    this.handler.onChangeQuizState(this.quizNumber, this.status);

                    this.quiz.html(QuizList[this.quizNumber].q);
                    this.quiz.show();
                    this.counter[0].reset();
                    this.question.show();
                    this.sound.play(Sound.SLIDE);

                    this.disableNext = true;
                    this.nextButton.hide();
                    setTimeout(function(){
                        _this.disableNext = false;
                        _this.nextButton.show();
                    }, Template.quiz.wait);

                    break;
                case STATUS.QUIZ_TIMEOUT:
                case STATUS.QUIZ_BEFORE_ANSWER:
                    this.status = STATUS.QUIZ_TIMEOUT;
                    this.quizNumber = quizNumber;

                    this.disableNext = false;
                    this.nextButton.hide();

                    this.onNext();
                    break;
                case STATUS.QUIZ_ANSWER:
                case STATUS.QUIZ_NEXT:
                    this.status = STATUS.QUIZ_NEXT;
                    this.quizNumber = quizNumber;

                    this.disableNext = false;
                    this.nextButton.hide();

                    this.onNext();
                    break;
            }
        }
        else{
            this.status = STATUS.QUIZ_NEXT;
            this.quizNumber = quizNumber;
            this.handler.onChangeQuizState(this.quizNumber, this.status);

            this.disableNext = true;
            this.nextButton.hide();

            this.nextMessage.html("おしまい")
            this.next.show();
            this.returnButton.show();
        }
    },

    onFinishCountdown : function(){
        this.status = STATUS.QUIZ_TIMEOUT;
        this.handler.onChangeQuizState(this.quizNumber, this.status);

        this.quiz.fadeOut(500);

        this.disableNext = false;
        this.nextButton.show();
    }
};