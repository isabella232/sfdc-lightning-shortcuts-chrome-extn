chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onActivated.addListener(async info => {
    const tab = await chrome.tabs.get(info.tabId);
    
    // Match only *.salesforce.com or *.lightning.force.com URLs
    const isSalesforceRegex = /(\.force\.com)|(\.salesforce\.com)/;
    const isSalesforce = isSalesforceRegex.test(tab.url) 
      ? chrome.action.enable(tab.tabId) 
      : chrome.action.disable(tab.tabId);
  });
});