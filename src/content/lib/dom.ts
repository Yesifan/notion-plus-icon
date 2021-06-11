import { delay } from '@/lib/utils';

export const ICON_CLASS = 'notion-record-icon';
export const SIDEBAR_CLASS = 'notion-sidebar-container';
export const PAGE_CONTENT_CLASS = 'notion-page-content';

export const ICON_SELECTOR = '.notion-frame>.notion-scroller>div:first-child .notion-record-icon';
export const PANEL_SELECTOR = '.notion-default-overlay-container .notion-media-menu';
export const PANEL_MASK_SELECTOR = '.notion-default-overlay-container div[style*="100vw"]';


interface ExElement extends Element {
  tab?: Element,
  tabs?:Element[],
  tabsBar?: Element,
  panelContainer?: Element,
}

export const getIcon = () => <HTMLElement>document.querySelector(ICON_SELECTOR);

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