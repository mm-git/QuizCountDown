var Hash;
var URL;
var Type;

(function(){
	$(window).on("beforeunload", function(event){
        event.returnValue = "終了しますか？";

		return event.returnValue;
	});

})();