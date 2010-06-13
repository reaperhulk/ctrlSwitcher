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
	switch(event.keyCode) {
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
			/*
			get the current keyCombo again to be safe.
			I'd rather propagate via the change event but i can't get that to work right now
			in practice this means if you change the pref you'll have to press the new key combo
			twice to make it work properly
			*/
			getKeyCombo();
			if (
			(keyCombo == 'ctrl' && event.ctrlKey == true) || 
			(keyCombo == 'opt' && event.altKey == true) || 
			(keyCombo == 'ctrlopt' && event.altKey == true && event.ctrlKey == true) || 
			(keyCombo == 'cmd' && event.metaKey == true)
			) {
				event.stopPropagation();
				event.preventDefault();
				safari.self.tab.dispatchMessage('switchTabs',event.keyCode);
			}
		break;
		default:
		//do nothing
	}
}
