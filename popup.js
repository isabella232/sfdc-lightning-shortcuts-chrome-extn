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
	    const baseURL = getBaseURLFromPageURL(tabs[0].url);
	    // Open new tab
	    chrome.tabs.create({
	        url: baseURL + path,
	        active: false
	    });
	});
}

function getBaseURLFromPageURL(pageURL) {
	// pageURL is for the form https://abc
	// base url is the url till the next / found after https://
	// which is 8 chars long
	return pageURL.substring(0, pageURL.indexOf('/', 8))
}

const allButtons = document.getElementsByTagName("button");
const allButtonsArray = Array.from(allButtons);
allButtonsArray.forEach(function(buttonElement) {
	buttonElement.addEventListener("click", navigate);
});
