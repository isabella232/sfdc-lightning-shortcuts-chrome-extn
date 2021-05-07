const isSalesforceRegex = /(\.force\.com)|(\.salesforce\.com)/;

// Enable extension only for *.salesforce.com 
// or *.lightning.force.com URLs  
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener(async info => {
    const tab = await chrome.tabs.get(info.tabId);
    enableTab(tab.tabId, tab.url);
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  	const tabURL = changeInfo.url;
  	// Only enable/disable when url has changed
  	if(tabURL) {
	    enableTab(tabId, tabURL);
	}
  });
});

function enableTab(tabId, tabURL) {
	const isSalesforce = isSalesforceRegex.test(tabURL)
      ? chrome.action.enable(tabId) 
      : chrome.action.disable(tabId);
}
