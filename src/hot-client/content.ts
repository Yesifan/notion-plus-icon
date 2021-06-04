const connection = new WebSocket('wss://localhost:3333/sockjs-node');

let isFirstCompilation = true;

connection.onclose = function () {
  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info(
      'The development server has disconnected.\nRefresh the page if necessary.'
    );
  }
};

// Handle messages from the server.
connection.onmessage = function (e) {
  var message = JSON.parse(e.data);
  switch (message.type) {
    case 'still-ok':
    case 'ok':
      if(isFirstCompilation) isFirstCompilation = false;
      else{
        if(chrome){
          chrome.runtime.sendMessage('reload');
        }
      }
      break;
    case 'warnings':
      console.warn(message.data);
      break;
    case 'errors':
      console.error(message.data);
      break;
    default:
  }
};