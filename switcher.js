window.addEventListener('keydown',checkKeyDown,false)
window.addEventListener('keyup',checkKeyUp,false)
safari.self.addEventListener("message", globalCtrlStatus, false);
var ctrl = false

/*
by dispatching events when ctrl changes status we can maintain global knowledge across all 
tabs of the meta key keydown/keyup status. this way if you hit ctrl-1 and then immediately 
press 2 to go to another tab it will work properly
*/
function globalCtrlStatus(event) {
	if (event.name == 'globalCtrlStatus') {
		ctrl = event.message
	}
}
function checkKeyDown(event) {
	if(event.keyCode == 17) {
		safari.self.tab.dispatchMessage('ctrlStatusUpdate',true);
	}
	if(ctrl == true) {
		switch(event.keyCode) {
			case 49:
				safari.self.tab.dispatchMessage('switchTabs',0);
			break;
			case 50:
				safari.self.tab.dispatchMessage('switchTabs',1);
			break;
			case 51:
				safari.self.tab.dispatchMessage('switchTabs',2);
			break;
			case 52:
				safari.self.tab.dispatchMessage('switchTabs',3);
			break;
			case 53:
				safari.self.tab.dispatchMessage('switchTabs',4);
			break;
			case 54:
				safari.self.tab.dispatchMessage('switchTabs',5);
			break;
			case 55:
				safari.self.tab.dispatchMessage('switchTabs',6);
			break;
			case 56:
				safari.self.tab.dispatchMessage('switchTabs',7);
			break;
			case 57:
				safari.self.tab.dispatchMessage('switchTabs',8);
			break;
			case 58:
				safari.self.tab.dispatchMessage('switchTabs',9);
			break;
			default:
			//do nothing
		}
	}
}

function checkKeyUp(event) {
	if(event.keyCode == 17) {
		safari.self.tab.dispatchMessage('ctrlStatusUpdate',false);
	}
}