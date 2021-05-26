import * as React from 'react';
import * as ReactDom from 'react-dom';
import { parsePageId } from 'notion-utils';

import { getIconDom, getIconPanel } from './lib/dom';

import Tab from './components/tab';

const { runtime } = chrome;

const pageId = parsePageId(location.href);
console.log('notion-plus-icon load', pageId);

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
  const { tab } = panel;
  console.log('handleIconClick', tab);
  const handleClick = () => {};
  
  ReactDom.render(React.createElement(Tab, { onClick: handleClick }), tab);
}

