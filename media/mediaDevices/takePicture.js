var theStream;
var theRecorder;
var recorded = [];

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {video: true, audio: true};
  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    }
    
    theStream = stream;
    try {
      recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      return;
    }
    theRecorder = recorder;
    console.log('MediaRecorder created');
    recorder.ondataavailable = recorderOnDataAvailable;
    recorder.start(100);
  }, function (err) {
    alert('Error: ' + err);
  });
}

function recorderOnDataAvailable(event) {
  if (event.data.size == 0) return;
  recorded.push(event.data);
}

function download() {
  theRecorder.stop();
  theStream.getTracks()[0].stop();
  var blob = new Blob(recorded, {type: "video/webm"});
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = 'test.webm';
  a.click();
  setTimeout(function () {
      (window.URL || window.webkitURL).revokeObjectURL(url);
  }, 100); 
}