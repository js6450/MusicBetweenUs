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

    /*
    Index of sensing area to melody:

    0: Left Back
    1: Left Sleeve
    2: Lower Left Front
    3: Upper Left Front
    4: Upper Right Front
    5: Lower Right Front
    6: Right Sleeve
    7: Right back

    */

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
            /*
            values of data[i]: 0 - 7
            if Device id = 0:
                currentData: 0, 2, 4, 6, 8, 10, 12, 14
            if Device id = 1:
                currentData: 1, 3, 5, 7, 9, 11, 13, 15
            */
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

            }
        }

        devices[id].dataIn = [];
    }


}
