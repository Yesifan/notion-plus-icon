import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parsePageId } from 'notion-utils';

import TabEvent from './lib/tabEvent'

import { getIconDom, getIconPanel } from './lib/dom';

import Tab from './components/tab';

const { runtime } = chrome;

const pageId = parsePageId(location.href);
const tabEvent = new TabEvent();

let icon:Element;

runtime.onMessage.addListener(async message => {
  icon && clearLastEvent(icon);
  icon = await getIconDom();
  icon.addEventListener('click',handleIconClick);
  console.log(icon);
})

function clearLastEvent(icon:Element){
  icon.removeEventListener('click', handleIconClick);
}

async function handleIconClick(){
  const panel = await getIconPanel();
  const { plusTab, tabContainer } = panel;
  if(tabContainer && plusTab){
    tabEvent.setContainer(tabContainer);
    const handleClick = () => {};

    ReactDom.render(React.createElement(Tab, { onClick: handleClick }), plusTab);
  }
}

