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
	var keyCode;
	switch(event.keyCode) {
        case 37: // left arrow
        case 39: // right arrow
		case 49: //1
		case 50: //2
		case 51: //3
		case 52: //4
		case 53: //5
		case 54: //6
		case 55: //7
		case 56: //8
		case 57: //9
		case 48: //0
		case 189: // -
		case 187: // =
		case 229: //this keycode fires for some reason the first time you push ctrl-q...need to investigate why. for now, let's capture.
		case 81: //q
		case 87: //w
		case 69: //e
		case 82: //r
		case 84: //t
		case 89: //y
		case 85: //u
		case 73: //i
		case 79: //o
		case 80: //p
			keyCode = event.keyCode;
		break;
		default:
		//do nothing
	}
	if(keyCode != undefined) {
		if (
		(keyCombo == 'ctrl' && event.ctrlKey == true) ||
		(keyCombo == 'opt' && event.altKey == true) ||
		(keyCombo == 'ctrlopt' && event.altKey == true && event.ctrlKey == true) ||
		(keyCombo == 'cmd' && event.metaKey == true) ||
		(keyCombo == 'cmdopt' && event.metaKey == true && event.altKey == true)
		) {
			event.stopPropagation();
			event.preventDefault();
			safari.self.tab.dispatchMessage('switchTabs',keyCode);
		}
	}
}
