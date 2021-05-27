import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parsePageId } from 'notion-utils';

import Observer from './observer'

import { getIconDom, getIconPanel } from './lib/dom';

import App from './App';

const { runtime } = chrome;

const pageId = parsePageId(location.href);
const observer = new Observer();

let icon:Element;

runtime.onMessage.addListener(async message => {
  icon && clearLastEvent(icon);
  icon = await getIconDom();
  icon.addEventListener('click',strat);
})

function clearLastEvent(icon:Element){
  icon.removeEventListener('click', strat);
}

async function strat(){
  const panel = await getIconPanel();
  const { plusTab, tabContainer, panelContainer } = panel;
  if(tabContainer && plusTab && panelContainer){
    observer.setContainer(tabContainer, panelContainer);
    const handleClick = () => {};

    ReactDom.render(
      React.createElement(App, { 
        onClick: handleClick,
        panelContainer:panelContainer
      }), 
      plusTab
    );
  }
}

