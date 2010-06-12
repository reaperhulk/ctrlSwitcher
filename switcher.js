window.addEventListener('keydown',checkKeyDown,false);
window.addEventListener('keyup',checkKeyUp,false);


/*
by dispatching events when ctrl/opt chang status we can maintain global knowledge across all 
tabs of the meta key keydown/keyup status. this way if you hit ctrl/opt-1 and then immediately 
press 2 to go to another tab it will work properly
*/
function checkKeyDown(event) {
	switch(event.keyCode) {
		case 17:
			safari.self.tab.dispatchMessage('ctrlStatusUpdate',true);
		break;
		case 18:
			safari.self.tab.dispatchMessage('optStatusUpdate',true);
		break;
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
			safari.self.tab.dispatchMessage('switchTabs',event.keyCode-49);
		break;
		default:
		//do nothing
	}
}

function checkKeyUp(event) {
	if(event.keyCode == 17) {
		safari.self.tab.dispatchMessage('ctrlStatusUpdate',false);
	} else if(event.keyCode == 18) {
		safari.self.tab.dispatchMessage('optStatusUpdate',false);
	}
}