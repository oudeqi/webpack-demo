function scrollDirect(fn) {  
	var beforeScrollTop = document.body.scrollTop;  
	fn = fn || function () {};  
	window.addEventListener("scroll", function (event) {  
		event = event || window.event;  
		var afterScrollTop = document.body.scrollTop;  
		var delta = afterScrollTop - beforeScrollTop;  
		beforeScrollTop = afterScrollTop;  
		var scrollTop = $(this).scrollTop();  
		var scrollHeight = $(document).height();  
		var windowHeight = $(this).height();  
		if (scrollTop + windowHeight > scrollHeight - 10) {  //滚动到底部执行事件  
			fn('up');  
			return;  
		}  
		if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {  
			fn('up');  
		} else {  
			if (Math.abs(delta) < 10) {  
				return false;  
			}  
			fn(delta > 0 ? "down" : "up");  
		}  
	}, false);
}  

var upflag=1;  
var downflag= 1;  
//scroll滑动,上滑和下滑只执行一次！  
scrollDirect(function (direction) {  
	if (direction == "down") {  
		if (downflag) {
			$('.jumbotron .container').addClass('trans');
			downflag = 0;  
			upflag = 1;  
		}  
	}  
	if (direction == "up") {  
		if (upflag) {
			$('.jumbotron .container').removeClass('trans');
			downflag = 1;  
			upflag = 0;  
		}  
	}  
});  
