const urlMapping = {
    "setupHome": "/lightning/setup/SetupOneHome/home",
    "objectManager": "/lightning/setup/ObjectManager/home",
    "sandboxes": "/lightning/setup/DataManagementCreateTestInstance/home",
    "debugLogs": "/lightning/setup/ApexDebugLogs/home",
    "deployments": "/lightning/setup/DeployStatus/home",
    "classic": "/ltng/switcher?destination=classic",
}

function navigate(ev) {
    ev.preventDefault();
    const src = ev.target.dataset['src'];
    const path = urlMapping[src];
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	    const baseURL = tabs[0].url;
	    // Open new tab
	    chrome.tabs.create({
	        url: baseURL + path,
	        active: false
	    });
	});
}
const allButtons = document.getElementsByTagName("button");
const allButtonsArray = Array.from(allButtons);
allButtonsArray.forEach(function(buttonElement) {
	buttonElement.addEventListener("click", navigate);
});
