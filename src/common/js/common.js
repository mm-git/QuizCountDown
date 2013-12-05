// file			common.js
// description	共通処理

// name space
var Common = function(){
    var contentsLoaded = [];

	return {
		//--------------------------------------------------------------
		// function		removeTag
		// description	Tagを除去
		//--------------------------------------------------------------
		removeTag:function (str) {
			str = str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");

			return str;
		},

		//--------------------------------------------------------------
		// function		stringToArray
		// description	文字列を指定した文字区切りで配列に変換する
		//--------------------------------------------------------------
		stringToArray:function (text, delim) {
			var i;
			var j;
			var length;
			var data = [];

			if (!delim) {
				delim = ',';
			}

			for (i = 0, j = 0; i < text.length; i++) {
				if (text.charCodeAt(i) == delim.charCodeAt(0)) {
					data.push(text.slice(j, i));
					j = i + 1;
				}
			}
			if (j < text.length) {
				data.push(text.slice(j, text.length));
			}

			return data;
		},

		//--------------------------------------------------------------
		// function		arrayToString
		// description	配列を指定した文字区切りの文字列に変換する
		//--------------------------------------------------------------
		arrayToString:function (array, delim) {
			var data = "";

			if (!delim) {
				delim = ',';
			}

			for (var i= 0; i<array.length; i++) {
				if (data == "") {
					data = array[i];
				}
				else {
					data= data + delim + array[i];
				}
			}

			return data;
		},

		//--------------------------------------------------------------
		// function		getParameter
		// description	URLパラメータをオブジェクトにして返す
		//--------------------------------------------------------------
		getURLParameter:function () {
			var obj = {};

			var str = location.search.split("?");
			if (str.length < 2) {
				return null;
			}

			var params = str[1].split("&");
			for (var i = 0; i < params.length; i++) {
				var key = params[i].split("=");
				obj[key[0]] = key[1];
			}
			return obj;
		},

        isLoaded : function(){
            for(var i=0; i<contentsLoaded.length; i++){
                if(!contentsLoaded[i]()){
                    return false;
                }
            }
            return true;
        },

        addLoadedFunction : function(func){
            contentsLoaded.push(func);
        }
	};
}();
