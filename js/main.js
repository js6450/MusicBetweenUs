let audioRoot = 'assets/audio/';

let soundTotal = 8;
let sounds = [];

let beatsTotal = 3;
let beats = [];

let audioDiv;

let mainBeat;

window.onload = () => {

    console.log('window loaded');

    // audioDiv = document.getElementById('audioDiv');
    //
    // for(let i = 0; i < numBeats; i++){
    //     let audioTag = document.createElement('audio');
    //     audioTag.id = 'b' + i;
    //     audioTag.src = audioRoot + 'b' + i + '.mp3';
    //
    //     audioDiv.appendChild(audioTag);
    // }

    for(let i = 0; i < beatsTotal; i++){
        beats.push(new AudioNode("b" + i));
    }


    // mainBeat = document.getElementById('b0');
    // mainBeat.loop = true;

    // for(let i = 0; i < numMelodies; i++){
    //     let audioTag = document.createElement('audio');
    //     audioTag.id = 's' + i;
    //     audioTag.src = audioRoot + 's' + i + '.mp3';
    //
    //     audioDiv.appendChild(audioTag);
    // }

    for(let i = 0; i < soundTotal; i++){
        sounds.push(new AudioNode("s" + i));
    }
};

function startAudio(){
    beats[0].loop();
    beats[0].play();
    //
}

function triggerSound(data){

    console.log('incoming', data);

    let totalPlaying = 0;

    for(let i = 0; i < data.length; i++){
        let currentData = parseInt(data[i]);

        if(currentData < soundTotal){
            console.log('currentData', currentData);
            let currentAudio = sounds[currentData];
            currentAudio.play();
            currentAudio.jump(0, 5);

            // if(currentAudio.currentTime > 5){
            //     currentAudio.currentTime = 0;
            // }

            //currentAudio.play();

        }

        // if(i < numMelodies){
        //     let currentAudio = document.getElementById('s' + i);
        //     let currentData = data[i];
        //     if(currentData == int(String.fromCharCode(value.getUint8(i)))){
        //         currentAudio.play();
        //     }else{
        //         currentAudio.pause();
        //     }
        //}
    }


    for(let i = 0; i < sounds.length; i++){
        if(sounds[i].playing){
            totalPlaying++;
        }
    }

    if(totalPlaying < 2){
        for(let i  = 1; i < beatsTotal; i++){
            beats[i].stop();
        }
    }else{
        if(totalPlaying >= 2){
            beats[1].loop();
            beats[1].play();
        }

        if(totalPlaying >= 4){
            beats[2].loop();
            beats[2].play();
        }
    }

    console.log("total playing", totalPlaying);
}
