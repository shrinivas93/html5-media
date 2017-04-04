//alert("You must accept all the permissions");

var message = new SpeechSynthesisUtterance();

function speak(text) {
	message.text = text;
	speechSynthesis.speak(message);
}

window.speechSynthesis.onvoiceschanged = function() {
	message.voice = window.speechSynthesis.getVoices().filter(function(voice) {
		return voice.lang == "hi-IN" || voice.lang == "hi_IN";
	})[0];
	speak("Let's click a selfie!");
}

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var currentLocation = document.getElementById('currentLocation');
var context = canvas.getContext('2d')

var videoTrack;

function startVideo() {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({
			video : true
		}).then(function(stream) {
			videoTrack = stream.getVideoTracks()[0];
			video.src = window.URL.createObjectURL(stream);
			video.play();
		});
	}
}

function stopVideo() {
	videoTrack.stop();
}

startVideo();

video.addEventListener("click", function() {
	context.drawImage(video, 0, 0, 450, 640);
	setTimeout(stopVideo, 50);
});

canvas.addEventListener("click", function() {
	startVideo();
});

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(location) {
		alert(location);
		currentLocation.innerHTML = location.coords.latitude + ", "
				+ location.coords.longitude;
	});
}