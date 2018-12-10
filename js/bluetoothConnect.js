let devices = [];

let rx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
let tx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

let feather1 = {
	filters: [{
		name: "Adafruit Bluefruit LE"
	}],
	optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
};

let feather2 = {
	filters: [{
		name: "Adafruit Bluefruit LE"
	}],
    optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
};

//let optionalServices = 0x1800;

// function makeConnection1(){
// 	navigator.bluetooth.requestDevice(options).then(device => {
// 		myDevice = device;
// 		// console.log(device);
// 		console.log(device.name);
// 		document.getElementById('msg').append(device.name + ' connecting to GATT server...');
// 		console.log('Connecting to GATT server...');
// 		return device.gatt.connect();
// 	}).then(server => {
// 		document.getElementById('msg').append("getting service...");
// 		console.log("getting service...");
// 		return server.getPrimaryService(options.optionalServices);
// 	}).then(service => {
// 		document.getElementById('msg').append("getting characteristic...");
// 		console.log("getting characteristic...");
// 		return service.getCharacteristic(tx);
// 	}).then(characteristic => {
// 		document.getElementById('msg').append("connected to characterstic...");
// 		console.log(characteristic);
// 		deviceCharacteristic = characteristic;
// 		// loadSound();
// 		return deviceCharacteristic.startNotifications().then(_ => {
// 			document.getElementById('msg').append("> notifications started...");
// 			console.log('> notifications started...');
// 			deviceCharacteristic.addEventListener('characteristicvaluechanged', function(event){
// 				  let value = event.target.value;
//
// 				  dataIn = [];
//
// 				  for(let i = 0; i < value.byteLength; i++){
// 				  	let currentValue = String.fromCharCode(value.getUint8(i));
// 				  	dataIn.push(currentValue);
// 				  }
//
// 				  triggerSound(dataIn);
//
// 				  //console.log(value);
//
//                   //
// 				  // for (let i = 0; i < value.byteLength; i++) {
// 				  // 	let currentValue = String.fromCharCode(value.getUint8(i));
//                   //
// 				  // 	if(currentValue == 'a'){
// 					// 	dataIn = [];
// 				  // 	}else if(currentValue == '1' || currentValue == '0'){
// 				  // 		dataIn.push(value.getUint8(i));
// 				  // 	}
// 				  //
// 				  // }
// 				  // if(dataIn.length == 12){
// 				  // 	//console.log(dataIn);
// 				  // 	//document.getElementById('msg').append(dataIn);
// 					//   triggerSound(dataIn);
// 				  // }
//
// 				  //console.log('> ' + a.join(' '));
// 			})
// 		});
// 	})
// 	.catch(function(error) {
// 	  console.log("Something went wrong. " + error);
// 	});
// }

class BluetoothDevice{

	constructor(id, options){

		this.device;
		this.options = options;
		this.dataIn = [];

		this.id = id;

		this.msgDiv = document.createElement('DIV');
		this.msgDivID = this.id;
		this.msgDiv.id = this.msgDivID;
		document.body.appendChild(this.msgDiv);

        this.makeConnection();

	}

	makeConnection(){

        navigator.bluetooth.requestDevice(this.options).then(device => {
            this.device = device;
            // console.log(device);
            this.printConsole(device.name);
            this.printConsole('Connecting to GATT server...');
            return device.gatt.connect();
        }).then(server => {
            this.printConsole("getting service...");
            return server.getPrimaryService(this.options.optionalServices);
        }).then(service => {
            this.printConsole("getting characteristic...");
            return service.getCharacteristic(tx);
        }).then(characteristic => {
            this.printConsole("connected to characterstic...");
            let deviceCharacteristic = characteristic;
            // loadSound();
            return deviceCharacteristic.startNotifications().then(_ => {
                this.printConsole('notifications started...');
                deviceCharacteristic.addEventListener('characteristicvaluechanged', function(event){
                    let value = event.target.value;

                    this.dataIn = [];

                    for(let i = 0; i < value.byteLength; i++){
                        let currentValue = String.fromCharCode(value.getUint8(i));
                        this.dataIn.push(currentValue);
                    }

                    //console.log("in event", this.dataIn);

                    if(audioLoaded){
                        triggerSound(this.id, this.dataIn);
                    }

                    //console.log(value);

                    //
                    // for (let i = 0; i < value.byteLength; i++) {
                    // 	let currentValue = String.fromCharCode(value.getUint8(i));
                    //
                    // 	if(currentValue == 'a'){
                    // 	dataIn = [];
                    // 	}else if(currentValue == '1' || currentValue == '0'){
                    // 		dataIn.push(value.getUint8(i));
                    // 	}
                    //
                    // }
                    // if(dataIn.length == 12){
                    // 	//console.log(dataIn);
                    // 	//document.getElementById('msg').append(dataIn);
                    //   triggerSound(dataIn);
                    // }

                    //console.log('> ' + a.join(' '));
                }.bind(this))
            });
        }).catch(function(error) {
                console.log("Something went wrong. " + error);
        });

	}

	printConsole(msg){

		console.log(msg);

		if( document.getElementById(this.id) != null){
            let newMsg = document.createElement('p');
            newMsg.innerHTML = this.id + ": " + msg;
            document.getElementById(this.id).append(newMsg);
        }

	}
}