let audioRoot = 'assets/audio/';
let audioLoaded = false;

let melodiesTotal = 16;
let melodies = [];

let beatsTotal = 5;
let beats = [];

function loadSound(){

    console.log('Sound files loaded');

    for(let i = 0; i < beatsTotal; i++){
        beats.push(new AudioNode("b" + i));
    }

    for(let i = 0; i < melodiesTotal; i++){
        melodies.push(new AudioNode("m" + i));
    }

    audioLoaded = true;
}

let totalPlaying = 0;

function startAudio(){

    loadSound();

    setInterval(function(){
        beats[0].play();
        // if(devices != null){
        //     for(let i = 0; i < devices.length; i++){
        //         console.log("in set interval", devices[i].dataIn);
        //         triggerSound(devices[i].id, devices[i].dataIn);
        //     }
        // }

        totalPlaying = 0;

        for(let i = 0; i < melodies.length; i++){
            if(melodies[i].playing()){
                totalPlaying++;
            }
        }

        console.log("totalPlaying", totalPlaying);

        if(totalPlaying < 2){
            for(let i  = 1; i < beatsTotal; i++){
                beats[i].stop();
            }
        }else{
            console.log("trigger another beat");
            for(let i = 1; i < beatsTotal; i++){
                if(totalPlaying > i){
                    console.log("beat ", i);
                    beats[i].play();
                }
            }
        }
    }, 2000);

}

function triggerSound(id, data){

    if(data != null){
        //console.log('id', id);
        console.log('incoming from ' + id + ": " + data);

        for(let i = 0; i < data.length; i++){
            let currentData = parseInt(data[i]) * 2 + id;

            if(currentData < melodiesTotal){
                //console.log('currentData', currentData * 2 + parseInt(id));
                let currentAudio = melodies[currentData];

                if(!currentAudio.playing()){
                    currentAudio.play();
                }else{
                    if(currentData >= 12){
                        currentAudio.jump(1, currentAudio.duration() - 1);
                    }

                    currentAudio.jump(0, currentAudio.duration());
                }
                // currentAudio.jump(0, 5);

                // if(currentAudio.currentTime > 5){
                //     currentAudio.currentTime = 0;
                // }

                //currentAudio.play();

            }
        }

        devices[id].dataIn = [];
    }


}
