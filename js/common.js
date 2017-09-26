var progress = 0;
var time = 100;

var mucBtn = document.getElementById("imgMucBtn");

function loadProgress(callBack) {

	if (typeof(callBack) == "undefined") {
		callBack = "";
	}

	progress ++;
	if(document.readyState == "interactive") {
		if(progress >= 70) {
			time = 500
		}

		if(progress >= 80) {
			time = 1000
		}

		if(progress >= 90) {
			time = 2000
		}

		if(progress >= 99) {
			progress = 99;
		}
	}
	if(document.readyState == "complete") {
		time = 2;
	}

	document.getElementById("loading").innerHTML = progress + "%";
	if(progress >= 100 && document.readyState == "complete") {

		setTimeout("audioPlayContinue('audioMain1');mySwiper.slideNext(true, 0);", 1000);
		return;
		
	}

	setTimeout("loadProgress('" + callBack + "')", time);
	eval(callBack + "(" + progress + ")");

}

function loadProgressNo() {
	
	if(document.readyState == "complete") {

		setTimeout("audioPlayContinue('audioMain1');mySwiper.slideNext(true, 0);", 1000);
		return;
		
	}

	setTimeout("loadProgressNo()", time);

}

function slideTo(index, speed, runCallbacks) {

	if (typeof(speed) == "undefined") {
		speed = 0;
	}

	if (typeof(runCallbacks) == "undefined") {
		runCallbacks = true;
	}

	mySwiper.unlockSwipeToNext();
	mySwiper.unlockSwipeToPrev();

	mySwiper.slideTo(index, speed, runCallbacks);

	mySwiper.lockSwipeToNext();
	mySwiper.lockSwipeToPrev();

}

function slideNext(runCallbacks, speed) {
	
	if (typeof(runCallbacks) == "undefined") {
		runCallbacks = true;
	}

	if (typeof(speed) == "undefined") {
		speed = 0;
	}

	mySwiper.unlockSwipeToNext();
	mySwiper.slideNext(runCallbacks, speed)
	mySwiper.lockSwipeToNext();
	mySwiper.lockSwipeToPrev();

}

function slidePrev(runCallbacks, speed) {

	if (typeof(runCallbacks) == "undefined") {
		runCallbacks = true;
	}

	if (typeof(speed) == "undefined") {
		speed = 0;
	}

	mySwiper.unlockSwipeToPrev();
	mySwiper.slidePrev(runCallbacks, speed);
	mySwiper.lockSwipeToNext();
	mySwiper.lockSwipeToPrev();

}

function playDHReady(obj, callBack) {

	$("div[id*='" + obj + "']").each(function(){
		$(this).css("visibility", "hidden");
	});

	if (typeof(callBack) == "undefined") {
		callBack = "";
	}

	eval(callBack);

}

function playDH(obj, callBack, time, index, addCallBackIndex, addCallBack) {

	if (typeof(time) == "undefined" || time == "") {
		time = 200;
	}

	if (typeof(callBack) == "undefined" || callBack == "") {
		callBack = "";
	}

	if (typeof(index) == "undefined" || index == "") {
		index = 1;
	}

	if(index == addCallBackIndex) {
		eval(addCallBack);
	}

	var dh1 = document.getElementById(obj + (index * 1 - 1));
	if(dh1) {
		dh1.style.visibility = "hidden";
	}

	var dh2 = document.getElementById(obj + index);
	if(dh2) {
		dh2.style.visibility = "visible";
	} else {
		eval(callBack);
		return;
	}

	index++;			

	setTimeout("playDH('" + obj + "','" + callBack + "'," + time + "," + index + "," + addCallBackIndex + ",'" + addCallBack + "')", time);

}

function playDHLastShow(obj, callBack, time, index, addCallBackIndex, addCallBack) {

	if (typeof(time) == "undefined" || time == "") {
		time = 200;
	}

	if (typeof(callBack) == "undefined" || callBack == "") {
		callBack = "";
	}

	if (typeof(index) == "undefined" || index == "") {
		index = 1;
	}

	if(index == addCallBackIndex) {
		eval(addCallBack);
	}

	var dh1 = document.getElementById(obj + (index * 1 - 1));
	var dh2 = document.getElementById(obj + index);
	if(dh1 && dh2) {
		dh1.style.visibility = "hidden";
	}

	if(dh2) {
		dh2.style.visibility = "visible";
	} else {
		eval(callBack);
		return;
	}

	index++;			

	setTimeout("playDHLastShow('" + obj + "','" + callBack + "'," + time + "," + index + "," + addCallBackIndex + ",'" + addCallBack + "')", time);

}

function audioPlay(audioId) {

	if(mucBtn && mucBtn.src.indexOf("image/music_open_btn.png") == -1) {
		return;
	}

	var audio = document.getElementById(audioId);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

function audioPlayContinue(audioId) {

	if(mucBtn && mucBtn.src.indexOf("image/music_open_btn.png") == -1) {
		return;
	}

	var audio = document.getElementById(audioId);
	audio.play();
}

function audioPause(audioId) {
	var audio = document.getElementById(audioId);
	audio.pause();
}

function ajaxSubmit(url, callBack) {
	$.ajax({
		url: url,
		type: "GET",
		dataType: 'jsonp',
		jsonp: 'imCallback',
		jsonpCallback: 'jsonp1',
		data: {url: location.href, imCallback: "jsonp1"},	// 暂时解决zepto jsonp问题
		timeout: 5000,
		success: function(json) {
			eval(callBack + "('" + JSON.stringify(json) + "')");
		}
	});
}

function pad(num, n) {  
    var len = num.toString().length;  
    while(len < n) {  
        num = "0" + num;  
        len++;  
    }  
    return num;  
} 

function getParameter(param) {

	var query = decodeURI(window.location.search);
	var iLen = param.length;
	var iStart = query.indexOf(param);

	if (iStart == -1) {
	    return "";
	}

	iStart += iLen + 1;

	var iEnd = query.indexOf("&", iStart);
	if (iEnd == -1) {
	    return query.substring(iStart);
	}

	return query.substring(iStart, iEnd);

}

function isPlayEnd(id, second) {

	if (typeof(second) == "undefined") {
		second = 0;
	}

	var vid = document.getElementById(id);
	return vid.currentTime >= vid.duration - second;

}

function MM_showHideLayers() { //v9.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_showHideLayersDispaly() { //v9.0
  var i,p,v,obj,args=MM_showHideLayersDispaly.arguments;
  for (i=0; i<(args.length-2); i+=3) 
  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'':(v=='hide')?'none':v; }
    obj.display=v; }
}

function clickMucBtn() {
	if(mucBtn.src.indexOf("image/music_open_btn.png") != -1) {
		mucBtn.src = "image/music_close_btn.png";
		$('audio').each(function(i){
			$(this)[0].pause();
		})
	} else {
		mucBtn.src = "image/music_open_btn.png";
		audioPlayContinue("audioMain1");
	}
}

function dateSubtract(date1, date2){

	var d1;
	var d2;

	if(date1 instanceof Date) {
		d1 = date1;
	} else {
		d1=new Date(date1);
	}

	if(date2 instanceof Date) {
		d2 = date2;
	} else {
		d2=new Date(date2);
	}

	return parseInt((d1 - d2)/1000);

}

function playDHLastShowByClassReady(className) {
	$("." + className).each(function(index){
		$(this).css("visibility", "hidden");
	});
}

function playDHLastShowByClass(className, callBack, time, index, addCallBackIndex, addCallBack) {

	if (typeof(time) == "undefined" || time == "") {
		time = 200;
	}

	if (typeof(callBack) == "undefined" || callBack == "") {
		callBack = "";
	}

	if (typeof(index) == "undefined" || index == "") {
		index = 1;
	}

	if(index == addCallBackIndex) {
		eval(addCallBack);
	}

	var dh1 = document.querySelectorAll('.' + className)[index * 1 - 1];
	var dh2 = document.querySelectorAll('.' + className)[index];
	if(dh1 && dh2) {
		dh1.style.visibility = "hidden";
	}

	if(dh2) {
		dh2.style.visibility = "visible";
	} else {
		eval(callBack);
		return;
	}

	index++;			

	setTimeout("playDHLastShowByClass('" + className + "','" + callBack + "'," + time + "," + index + "," + addCallBackIndex + ",'" + addCallBack + "')", time);

}