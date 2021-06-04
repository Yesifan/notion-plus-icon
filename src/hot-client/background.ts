chrome.runtime.onMessage.addListener((message)=>{
  switch(message){
    case 'reload':
      console.log('[HMRE] RELOAD');
      chrome.runtime.reload();
      break;
  }
})