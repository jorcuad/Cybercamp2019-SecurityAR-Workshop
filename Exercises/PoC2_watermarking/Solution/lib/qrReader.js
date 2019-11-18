var video = document.createElement("video");
var canvasElement = document.createElement("canvas");
var canvas = canvasElement.getContext("2d");

navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: "environment"
  }
}).then(function(stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true);
  video.play();
  requestAnimationFrame(tick);
});

function decipher(ciphertext) {
  key = "soyunaclavesoyun"

  var ciphertext = CryptoJS.enc.Base64.parse(ciphertext);

  var iv = ciphertext.clone();
  iv.sigBytes = 16;
  iv.clamp();
  ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
  ciphertext.sigBytes -= 16;

  var key = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
    iv: iv,
    mode: CryptoJS.mode.CFB
  });

  return decrypted.toString(CryptoJS.enc.Latin1)
}

function ascii_to_hexa(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

function base64toHEX(base64) {
  var raw = atob(base64);
  var HEX = '';
  for (i = 0; i < raw.length; i++) {
    var _hex = raw.charCodeAt(i).toString(16)
    HEX += (_hex.length == 2 ? _hex : '0' + _hex);
  }
  return HEX.toUpperCase();
}

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
      var plaintext = decipher(code.data)
      console.log(plaintext)


      try {
        var obj = JSON.parse(plaintext);
        console.log(obj)
        document.getElementById('panel').setAttribute("src", "#isOK");
        document.getElementById('owner').setAttribute("text", "value: " + obj.owner + ";color:black");
        document.getElementById('lvl').setAttribute("text", "value: " + obj.sensibilityLevel + ";color:black");
      } catch (e) {
        console.log("NO-OK")
        document.getElementById('panel').setAttribute("src", "#noOK");
        document.getElementById('owner').setAttribute("text", "value: " + obj.owner + ";color:black");
        document.getElementById('lvl').setAttribute("text", "value: " + obj.sensibilityLevel + ";color:black");
      }

      video.pause();
      delete video;
      delete canvas;
      delete canvasElement;
      isDone = true;
    }
  }
  if (!isDone) {
    requestAnimationFrame(tick);
  }
}
