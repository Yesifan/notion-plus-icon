import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parsePageId } from 'notion-utils';

import Observer from './observer'

import { getIconDom, getIconPanel } from './lib/dom';

import App from './App';
import store, { tabOther } from './store';

const { runtime } = chrome;

main();

function main(){
  const observer = new Observer();
  let pageId, icon:Node;
  start();

  runtime.onMessage.addListener(async message => {
    start();
  })

  async function start(){
    pageId = parsePageId(location.href);
    const newIcon = await getIconDom();
    if(newIcon === icon) return;
    icon = newIcon;
    icon.addEventListener('click',addPanelEvent);
  }

  async function addPanelEvent(){
    store.dispatch(tabOther(0)); //reset selected 0

    const panel = await getIconPanel();
    const { plusTab, tabContainer, panelContainer } = panel;
    if(tabContainer && plusTab && panelContainer){
      observer.setContainer(tabContainer, panelContainer);
      ReactDom.render(
        React.createElement(App, { 
          panelContainer:panelContainer
        }), 
        plusTab
      );
    }
  }

  function clearLastEvent(icon:Element){
    icon.removeEventListener('click', addPanelEvent);
  }
}





