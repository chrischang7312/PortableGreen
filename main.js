function upload()
{
			 var vid=document.getElementById('vid').value;
			 var img=document.getElementById('img').value;
		document.div.canvas.style.background-image="url(" +img ")";
		
		var processor = {
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    console.log("got here");

    this.computeFrame();
    var self = this;
    setTimeout(function () {

        self.timerCallback();
      }, 0);
  },
  
  doLoad: function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    this.video.crossOrigin = 'anonymous';
    this.video.setAttribute("src", vid);
    /*this.video.innerHTML = "<source src='greentestgood.mp4'></source>";*/

    var self = this;
    this.video.addEventListener("play", function() {
        self.width = self.video.videoWidth * 1.2;
        self.height = self.video.videoHeight * 1.2;
        self.timerCallback();
      }, false);
  },

  computeFrame: function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
		var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      if (g > 60 && r < 10  && b > 10)
        frame.data[i * 4 + 3] = 0;
    }
    this.ctx2.putImageData(frame, 0, 0);
    return;
  }
};
}

window.onload = function() {
    processor.doLoad();
}