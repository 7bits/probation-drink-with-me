$(document).ready(function(){
	video = document.querySelector("#video_me"),
	getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	//window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia({video: true}, 
		function(stream) {
			alert('a');
			video.src = window.URL.createObjectURL(stream);
		},
		function(){
			console.log("Нет камеры");
		});
})