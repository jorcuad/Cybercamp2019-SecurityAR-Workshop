var video = document.createElement("video");
var canvasElement = document.createElement("canvas");
//var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");

navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment"
  }
}).then(function(stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

function tick() {
  let isDone = false;
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code) {
      console.log(code.data);
      document.getElementById('password').setAttribute("text", "value: "+code.data+";color:black");
      video.pause();
      delete video;
      delete canvas;
      delete canvasElement;
      isDone = true;
    }
  }
  if(!isDone) {
    requestAnimationFrame(tick);
  }
}
