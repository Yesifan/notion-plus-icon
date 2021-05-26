import { delay } from './utils';

const ICON_SELECTOR = '.notion-frame .notion-scroller .notion-record-icon>div';
const PANEL_SELECTOR = '.notion-default-overlay-container .notion-media-menu';

export const getIconDom = () => {
  return new Promise<Element>(resolve => {
    const dom = document.querySelector(ICON_SELECTOR);
    if(dom) resolve(dom);
    else delay(1000).then(getIconDom).then(resolve);
  })
}

interface ExElement extends Element {
  tab:Element|null,
  tabContainer: Element|null,
  content: Element|null,
}

export const getIconPanel = () => {
  return new Promise<ExElement>(resolve => {
    const dom:ExElement|null = document.querySelector(PANEL_SELECTOR);
    if(dom) {
      const tab = document.createElement('div');
      const content = dom.querySelector('.notion-scroller');
      const tabContainer = dom.querySelector('div>div>div:first-child');
      const tabs = tabContainer?.firstChild;

      tabs?.insertBefore(tab, tabs.lastChild);

      dom.tabContainer = tabContainer;
      dom.tab = tab;
      dom.content = content;

      resolve(dom);
    }else delay(100).then(getIconPanel).then(resolve);
  })
}