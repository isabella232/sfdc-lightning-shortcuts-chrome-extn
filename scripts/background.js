chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onActivated.addListener(async info => {
    const tab = await chrome.tabs.get(info.tabId);
    
    // Match only *.salesforce.com or *.lightning.force.com URLs
    const isSalesforceRegex = /(\.force\.com)|(\.salesforce.com)/;
    const isGithub = isSalesforceRegex.test(tab.url) 
      ? chrome.action.enable(tab.tabId) 
      : chrome.action.disable(tab.tabId);
  });
});