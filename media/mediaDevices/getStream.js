/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

import getUserMedia from '../getUserMedia'

/**
 * class to deal with media.
 */

class mediaStream {

  /**
   * start recording...
   * @constructor
   * @param {string} type 
   * @param {element} element 
   */

  constructor(type, element){
    this.recorderOnDataAvailable = this.recorderOnDataAvailable.bind(this)
    this.stream;
    this.type = type;
    this.pause = false;

    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }

    var constraints = {};
    var self = this;
    constraints[type] = true;

    getUserMedia(constraints, function (stream) {
      var mediaControl = document.querySelector(element);

      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      }
      self.stream = stream

    }, function (err) {
      alert('Error: ' + err);
    });
    
  }

  /**
   * take picture of element
   * @param {element} element 
   */

  takePicture(element) {
    if( this.type == 'video' ){
      if (!('ImageCapture' in window)) {
        alert('ImageCapture is not available');
        return;
      }
      
      if (!this.stream) {
        alert('Grab the video stream first!');
        return;
      }
      
      var theImageCapturer = new ImageCapture(this.stream.getVideoTracks()[0]);
    
      theImageCapturer.takePhoto()
        .then(blob => {
          var theImageTag = document.querySelector(element);
          theImageTag.src = URL.createObjectURL(blob);
        })
        .catch(err => alert('Error: ' + err));  
    }
  }

  /**
   * start capturing video
   */
  startCaptureVideo(){
    this.recordedChunks = []
    var stream = this.stream;
    try {
      this.recorder = new MediaRecorder(stream, {mimeType : "video/webm"});
    } catch (e) {
      console.error('Exception while creating MediaRecorder: ' + e);
      return;
    }
    this.theRecorder = this.recorder;
    this.recorder.ondataavailable = this.recorderOnDataAvailable;
    this.recorder.start(100);
  }

  recorderOnDataAvailable(event) {
    if(this.pause == true) return;
    if (event.data.size == 0) return;
    this.recordedChunks.push(event.data);
  }

  
  // pause recording
  pause(){
    this.pause = true;
  }

  // start recording
  start(){
    this.pause = false;
  }
  

  // download video was created using startCaptureVideo() method.
  download() {
    var theStream = this.stream;
    // stop record.
    this.theRecorder.stop();
    theStream.getTracks()[0].stop();

    // make a Blob for the recorded video.
    var blob = new Blob(this.recordedChunks, {type: "video/webm"});
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    
    // create <a /> to download it using it.
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = 'test.webm';

    // click element.
    a.click();
    
    setTimeout(function () {
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }, 100); 
  }

}


export default function getStream(type, element) {
  return new mediaStream(type, element)
}