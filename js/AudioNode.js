class AudioNode{

    constructor(fileName){
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        this.audioElement = document.createElement('audio');
        this.audioElement.id = fileName;
        this.audioId = fileName;

        document.body.appendChild(this.audioElement);

        this.audioElement.src = audioRoot + fileName + ".mp3";

        this.audioElement.onpause = function(){
            this.playing = false;
        };

        this.audioSource = this.audioCtx.createMediaElementSource(this.audioElement);

        this.pannerNode = this.audioCtx.createPanner();
        this.pannerNode.panningModel = 'HRTF';

        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.value = 1;

        this.audioSource.connect(this.pannerNode);
        this.pannerNode.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);

       // this.playing = false;
    }


    async play(){
        try{
            await this.audioElement.play();
           // this.playing = true;
        }catch(err){
            console.log(err);
        }
    }

    playing(){
        return ! document.getElementById(this.audioId).paused;
    }

    currentTime(){
        return document.getElementById(this.audioId).currentTime;
    }

    duration(){
        return document.getElementById(this.audioId).duration;
    }

    pause(){
        this.audioElement.pause();
        this.playing = false;
    }

    stop(){
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
       // this.playing = false;
    }

    stopAt(time){

        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        //this.playing = false;
    }

    loop(){
        this.audioElement.loop = true;
    }

    noLoop(){
        this.audioElement.loop = false;
    }

    jump(start, end){

        if(this.audioElement.currentTime > end - 0.5){
          //  this.easeVolume(0, 0.5);
        }

        if(this.audioElement.currentTime > end){
           // this.easeVolume(1, 0.5);
            this.audioElement.currentTime = start;
        }
    }

    getVolume(){
        return this.gainNode.gain.value;
    }

    easeVolume(vol, t){
        this.gainNode.gain.setTargetAtTime(vol, this.audioCtx.currentTime + t, 0.5);
    }

    setPan(x, y, z){
        this.pannerNode.positionX.value = x;
        this.pannerNode.positionY.value = y;
        this.pannerNode.positionZ.value = z;
    }

    easePan(x, y, z, t){
        this.pannerNode.positionX.setTargetAtTime(x, this.audioCtx.currentTime + t, 0.5);
        this.pannerNode.positionY.setTargetAtTime(y, this.audioCtx.currentTime + t, 0.5);
        this.pannerNode.positionZ.setTargetAtTime(z, this.audioCtx.currentTime + t, 0.5);
    }

}