/**
 * Created with PhpStorm.
 * Date: 202013/11/26
 */

var Sound = function(){
    this.soundList = [
        "contents/sounds/01.wav",
        "contents/sounds/02.wav",
        "contents/sounds/03.wav",
        "contents/sounds/04.wav",
        "contents/sounds/05.wav",
        "contents/sounds/06.wav",
        "contents/sounds/07.wav",
        "contents/sounds/08.wav",
        "contents/sounds/09.wav",
        "contents/sounds/10.wav",
        "contents/sounds/fue.wav",
        "contents/sounds/good.wav",
        "contents/sounds/bad.wav",
        "contents/sounds/next.wav",
        "contents/sounds/jump.wav",
        "contents/sounds/slide.wav"
    ];

    this.sounds = [];
    for(var i=0; i<this.soundList.length; i++){
        this.sounds.push(new Audio(this.soundList[i]));
    }
};

Sound.prototype = {
    play : function(id){
        this.sounds[id].play();
        this.sounds[id] = new Audio(this.soundList[id]);
    }
};

Sound.FUE = 10;
Sound.GOOD = 11;
Sound.BAD = 12;
Sound.NEXT = 13;
Sound.JUMP = 14;
Sound.SLIDE = 15;
