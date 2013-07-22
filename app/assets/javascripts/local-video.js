$(document).ready(function(){
	video = document.querySelector("#video_me"),
	getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	//window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia({video: true}, 
		function(stream) {
			console.log('connect to cam');
			video.src = window.URL.createObjectURL(stream);
			/*var width=$('#content_wrapper').width();
			var height=($('#content_wrapper').height()-$('#video_me').height())/4;
			console.log('height='+height);
			$('#video_me').css({
				width:width,
				marginTop:height+"px"
			})*/
		},
		function(){
			console.log("Нет камеры");
		})
})