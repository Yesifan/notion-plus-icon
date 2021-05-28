import { render } from 'react-dom';

import Observer from './observer'

import App from './App';

const { runtime } = chrome;

main();

function main(){
  const observer = new Observer();
  observer.subscribe(()=>{
    const { pluseTabContainer, panelContainer } = observer;
    if(pluseTabContainer && panelContainer){
      render(<App panelContainer={panelContainer}/>, pluseTabContainer);
    }
  })

  runtime.onMessage.addListener(async message => {
    observer.update();
  })
}





