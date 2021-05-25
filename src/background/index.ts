const { tabs } = chrome;

interface Urlhistory {
  [key: number]: string
}

const urlhistory:Urlhistory = {}

tabs.onUpdated.addListener(function(tabId, changeInfo) {
  const oldUrl = urlhistory[tabId];
  if(changeInfo.url){
    if(oldUrl === changeInfo.url) return;
    urlhistory[tabId] = changeInfo.url;
    chrome.tabs.sendMessage(tabId, 'urlchagne');
  }
});