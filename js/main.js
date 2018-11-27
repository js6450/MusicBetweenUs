let soundTotal = 4;
let sounds = [];

let beatsTotal = 2;
let beats = [];

let serial;
let portName = "/dev/cu.usbmodem14601";
let ipAddr = "10.17.99.119";

let values = [];

let audioRoot = "assets/audio/";

function preload(){
    /*
    0: beat
    1: tick
     */
    for(let i = 0; i < beatsTotal; i++){
        beats.push(new AudioNode("b" + i));
    }

    /*
    0: CG
    1: EG
    2: DG
    3: GB
     */

    for(let i = 0; i < soundTotal; i++){
        sounds.push(new AudioNode("s" + i));
    }

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

    beats[0].loop();
    beats[1].loop();

}

function draw(){

    beats[0].play();
    //beats[1].play();

    for(let i = 0; i < 4; i++){
        playNote(i, i);
    }

    let numPlaying = 0;

    for(let i = 0; i < sounds.length; i++){
        //console.log(i + ": " + sounds[i].playing);
        if(sounds[i].playing){
            numPlaying++;
        }else{

        }
    }

    //console.log(numPlaying);

    // if(numPlaying > 2){
    //     console.log("play new beats");
    //     beats[1].play();
    // }else{
    //     beats[1].easeVolume(0, 0.5);
    //     beats[1].stop();
    // }

}

function playNote(vIndex, sIndex){
    let s = sounds[sIndex];
    console.log(vIndex);

    if(values[vIndex] == 1){
        //console.log(vIndex);
        if(s.getVolume() < 0.5){
            s.easeVolume(1, 0.5);
        }

        s.play();
        s.jump(1, 4);

    }else{
        s.easeVolume(0, 1);
        if(s.getVolume() < 0.1){
            s.stop();
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