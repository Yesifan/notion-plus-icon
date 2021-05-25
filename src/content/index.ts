import { parsePageId } from 'notion-utils';

const pageId = parsePageId(location.href);
console.log('notion-plus-icon load', pageId);

setTimeout(()=>{
  console.log('2s.....')

  const iconButton = document.querySelector('.notion-frame .notion-scroller .notion-record-icon>div');

  console.log(iconButton)
},2000)

chrome.runtime.onMessage.addListener((message)=>{
  console.log(message)
})