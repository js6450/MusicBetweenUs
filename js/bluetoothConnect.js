let myDevice;
let deviceCharacteristic;

let rx = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
let tx = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'

let options = {
	filters: [{
		name: "Adafruit Bluefruit LE"
	}],
	optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e']
}

let options2 = {
	filters: [{
		name: "Adafruit EZ-Link 79d9"
	}]
}

let dataIn = [];

//let optionalServices = 0x1800;

function makeConnection1(){
	navigator.bluetooth.requestDevice(options).then(device => {
		myDevice = device;
		// console.log(device);
		console.log(device.name);
		document.getElementById('msg').append('Connecting to GATT server...');
		console.log('Connecting to GATT server...');
		return device.gatt.connect();
	}).then(server => {
		document.getElementById('msg').append("getting service...");
		console.log("getting service...");
		return server.getPrimaryService(options.optionalServices);
	}).then(service => {
		document.getElementById('msg').append("getting characteristic...");
		console.log("getting characteristic...");
		return service.getCharacteristic(tx);
	}).then(characteristic => {
		document.getElementById('msg').append("connected to characterstic...");
		console.log(characteristic);
		deviceCharacteristic = characteristic;
		return deviceCharacteristic.startNotifications().then(_ => {
			document.getElementById('msg').append("> notifications started...");
			console.log('> notifications started...');
			deviceCharacteristic.addEventListener('characteristicvaluechanged', function(event){
				  let value = event.target.value;
				  

				  for (let i = 0; i < value.byteLength; i++) {
				  	let currentValue = String.fromCharCode(value.getUint8(i));

				  	if(currentValue == 'a'){
						dataIn = [];
				  	}else if(currentValue == '1' || currentValue == '0'){
				  		dataIn.push(value.getUint8(i));
				  	}
				    
				  }
				  if(dataIn.length == 12){
				  	console.log(dataIn);
				  	document.getElementById('msg').append(dataIn);
				  }
				  
				  //console.log('> ' + a.join(' '));
			})
		});
	})
	.catch(function(error) {
	  console.log("Something went wrong. " + error);
	});	
}

function makeConnection2(){
	navigator.bluetooth.requestDevice(options2).then(device => {
		myDevice = device;
		// console.log(device);
		console.log(device.name);
		document.getElementById('msg').append('Connecting to GATT server...');
		console.log('Connecting to GATT server...');
		return device.gatt.connect();
	})
	.catch(function(error) {
	  console.log("Something went wrong. " + error);
	});	
}