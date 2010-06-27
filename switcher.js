window.addEventListener('keydown',checkKeyDown,false);
safari.self.addEventListener("message", handleMessage, false);

var keyCombo = 'ctrl'; //default prior to fetching the valid one

getKeyCombo();

function getKeyCombo() {
	safari.self.tab.dispatchMessage('getKeyCombo','');
}

function handleMessage(event) {
	if(event.name == 'keyCombo') {
		keyCombo = event.message;
	}
}

function checkKeyDown(event) {
	var tab;
	switch(event.keyCode) {
		case 49: //1
		case 50: //2
		case 51: //3
		case 52: //4
		case 53: //5
		case 54: //6
		case 55: //7
		case 56: //8
		case 57: //9
			tab = event.keyCode - 49;
		break;
		case 48: //0
			//tabs are zero indexed.
			tab = 9;
		break;
		case 229: //this keycode fires for some reason the first time you push ctrl-q...need to investigate why. for now, let's capture.
		case 81: //q
			tab = 10;
		break;
		case 87: //w
			tab = 11;
		break;
		case 69: //e
			tab = 12;
		break;
		case 82: //r
			tab = 13;
		break;
		case 84: //t
			tab = 14;
		break;
		case 89: //y
			tab = 15;
		break;
		case 85: //u
			tab = 16;
		break;
		case 73: //i
			tab = 17;
		break;
		case 79: //o
			tab = 18;
		break;
		case 80: //p
			tab = 19;
		break;
		default:
		//do nothing
	}
	if(tab != undefined) {
		if (
		(keyCombo == 'ctrl' && event.ctrlKey == true) || 
		(keyCombo == 'opt' && event.altKey == true) || 
		(keyCombo == 'ctrlopt' && event.altKey == true && event.ctrlKey == true) || 
		(keyCombo == 'cmd' && event.metaKey == true)
		) {
			event.stopPropagation();
			event.preventDefault();
			safari.self.tab.dispatchMessage('switchTabs',tab);
		}
	}
}
