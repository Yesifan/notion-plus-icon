const { tabs, webRequest } = chrome;

const NOTION_URL = 'https://www.notion.so';

const prevUrl4id = new Map<number, string>()

const activeTabs = new Map<number, chrome.tabs.Tab>();

tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if(!activeTabs.has(tabId)) {
    activeTabs.set(tabId, tab);
  }
  const isUrlChange = changeInfo.url && (prevUrl4id.get(tabId) !== changeInfo.url);
  const isNotion = changeInfo.url?.includes(NOTION_URL);
  if(isUrlChange && isNotion){
    prevUrl4id.set(tabId, <string>changeInfo.url);
    tabs.sendMessage(tabId, 'urlchagne');
  }
});
