const { tabs, webRequest } = chrome;

const NOTION_URL = 'notion';

const prevUrl4id = new Map<number, string>()

tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const isUrlChange = changeInfo.url && (prevUrl4id.get(tabId) !== changeInfo.url);
  const isNotion = changeInfo.url?.includes(NOTION_URL);
  if(isUrlChange && isNotion){
    prevUrl4id.set(tabId, <string>changeInfo.url);
    tabs.sendMessage(tabId, 'urlchagne');
  }
});
