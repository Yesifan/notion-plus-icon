import { render } from 'react-dom';

import Observer from './observer'

import App from './App';

const { runtime } = chrome;

main();

function main(){
  const observer = new Observer();
  observer.subscribe(()=>{
    const { pageId, pluseTabContainer, panelContainer } = observer;
    if(pageId && pluseTabContainer && panelContainer){
      render(<App panelContainer={panelContainer} pageId={pageId}/>, pluseTabContainer);
    }
  })

  runtime.onMessage.addListener(async message => {
    observer.update();
  })
}
