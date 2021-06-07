const connection = new WebSocket('ws://localhost:3333/sockjs-node');

let isFirstCompilation = true;

connection.onclose = function () {
  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info(
      'The development server has disconnected.\nRefresh the page if necessary.'
    );
  }
};

connection.onmessage = function (e) {
  var message = JSON.parse(e.data);
  switch (message.type) {
    case 'still-ok':
    case 'ok':
      if(isFirstCompilation) isFirstCompilation = false;
      else{
        if(chrome){
          console.log('[HMRE] RELOAD');
          chrome.runtime.reload();
        }
      }
      break;
  }
};