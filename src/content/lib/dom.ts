import { delay } from '@/lib/utils';
import { getQueryString } from './utils';

const ICON_SELECTOR = '.notion-frame .notion-scroller .notion-record-icon';
const SUB_ICON_SELECTOR = '.notion-peek-renderer .notion-scroller .notion-record-icon';
const PANEL_SELECTOR = '.notion-default-overlay-container .notion-media-menu';
const PANEL_MASK_SELECTOR = '.notion-default-overlay-container div[style*="100vw"]';

export const getIconDom = () => {
  const isSubPage = getQueryString('p')
  return new Promise<Element>(resolve => {
    const dom = document.querySelector(isSubPage?SUB_ICON_SELECTOR:ICON_SELECTOR)
    if(dom) resolve(dom);
    else delay(100).then(getIconDom).then(resolve);
  })
}

interface ExElement extends Element {
  tab?: Element,
  tabs?:Element[],
  tabsBar?: Element,
  panelContainer?: Element,
}

export const getIconPanel = () => {
  return new Promise<ExElement>(resolve => {
    const dom:ExElement|null = document.querySelector(PANEL_SELECTOR);
    if(dom) {
      const tab = document.createElement('div');
      const content = dom.querySelector('.notion-scroller');
      const tabsBar = dom.querySelector('div>div>div:first-child');
      const tabsContainer = tabsBar?.firstChild;

      tabsContainer?.insertBefore(tab, tabsContainer.lastChild);

      dom.tab = tab;
      dom.tabs = tabsContainer?<Element[]>Array.from(tabsContainer.childNodes):undefined;
      dom.tabsBar = <Element>tabsBar;
      dom.panelContainer = <Element>content;

      resolve(dom);
    }else delay(100).then(getIconPanel).then(resolve);
  })
}

export const getPanelMask = () => <HTMLElement>document.querySelector(PANEL_MASK_SELECTOR);