let soundTotal = 4;
let sounds = [];

let beatsTotal = 2;
let beats = [];

let serial;
let portName = "/dev/cu.usbmodem14601";
let ipAddr = "10.17.99.119";

let values = [];

let aPath = "assets/audio/";

function preload(){
    /*
    0: beat
    1: tick
     */
    for(let i = 0; i < beatsTotal; i++){
        beats[i] = loadSound(aPath + "b" + i + ".mp3");
    }

    /*
    0: CG
    1: EG
    2: DG
    3: GB
     */

    // for(let i = 0; i < soundTotal; i++){
    //     sounds[i] = loadSound(aPath + "s" + i + ".mp3");
    // }
    //
    sounds[0] = loadSound(aPath + "s0.mp3");
    sounds[1] = loadSound(aPath + "s2.mp3");
    sounds[2] = loadSound(aPath + "s7.mp3");
    sounds[3] = loadSound(aPath + "s10.mp3");

}

function setup(){



    serial = new p5.SerialPort(ipAddr);

    serial.on('list', printList);
    serial.on('connected', serverConnected);
    serial.on('open', portOpen);
    serial.on('data', serialEvent);
    serial.on('error', serialError);
    serial.on('close', portClose);

    serial.open(portName);

    createCanvas(windowWidth, windowHeight);

}

function draw(){

    if(!beats[0].isPlaying()){
        beats[0].loop();
    }

    // for(let i = 0; i < values.length; i++){
    //     if(values[i] == 1){
    //         console.log(i)
    //
    //         if(!sounds[i].isPlaying()){
    //             sounds[i].play();
    //         }
    //     }else{
    //         if(sounds[i].isPlaying() && sounds[i].getVolume() > 0){
    //             let currentVol = sounds[i].getVolume();
    //             sounds[i].setVolume(currentVol - 0.1);
    //         }
    //     }
    // }

    playNote(2, 0);
    playNote(4, 1);
    playNote(7, 2);
    playNote(10, 3);

}

function playNote(vIndex, sIndex){
    let s = sounds[sIndex];
    console.log(vIndex);

    if(values[vIndex] == 1){
        //console.log(vIndex);

        if(!s.isPlaying()){
            s.play();
        }else{
            if(s.currentTime() > 6){
                s.jump(0);
            }
        }
    }else{
        if(s.isPlaying){
            if(s.getVolume() > 0.1){
                s.setVolume(s.getVolume() - 0.01);
            }else{
                s.stop();
                s.setVolume(1);
            }
        }
    }
}

function printList(ports){
    console.log(ports);
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}

function serialEvent() {
    let dataIn = serial.readLine();
    //console.log(dataIn);

    if(dataIn != ""){
        values = int(dataIn.split(","));
    }
}

function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}