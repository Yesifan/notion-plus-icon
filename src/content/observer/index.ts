import storage, { getStorage, ICON_STORAGE_KEY, SETTING_STORAGE_KEY } from '@/lib/storage';

import { Setting } from '@/interface/setting';
import { Icons } from '../lib/notion';
import {
  getIconPanel, getPanelMask, ICON_CLASS, SIDEBAR_CLASS, PAGE_CONTENT_CLASS, getIcon,
} from '../lib/dom';

export * from './hooks';
export { default as Provider } from './provider';
export type TabType = number | 'plus';
interface Callback {
  (observer:Observer): void
}

export default class Observer {
  pageId?:string;

  icons: Icons = { default: [] };

  setting: Setting = {};

  current:TabType = 0;

  private previous?: TabType;

  uploading:Boolean = false;

  tab?: Element | null; // <Tab/> container

  tabs?: Element[] | null;

  tabsBar?: Element | null;

  panelContainer?: Element | null;// <Panel/> container

  icon?: HTMLElement;

  mask?: HTMLElement;

  private observers: Callback[] = [];

  constructor(pageId:string) {
    this.storageObserver();
    this.iconClickListener();
    this.dispatch('PAGE_CHANGE', pageId);
  }

  subscribe(callback:Callback) {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter((item) => item !== callback);
    };
  }

  async dispatch(type:string, payload?:any) {
    switch (type) {
      case 'PAGE_CHANGE':
        this.pageId = payload;
        this.uploading = false;
        break;
      case 'TAB_CHANGE': {
        if (payload === this.current) return;
        this.previous = this.current;
        this.current = payload;
        const isPlus = this.current === 'plus';
        if (this.tabs) changeNotionUnderline(this.tabs, isPlus, this.previous, this.current);
        if (this.tabsBar) changeNotionSearch(this.tabsBar, isPlus);
        if (this.panelContainer) changeNotionPanel(this.panelContainer, isPlus);
        break;
      }
      case 'ICONS_CHANGE':
        this.icons = payload || { default: [] };
        break;
      case 'SETTING_CHANGE':
        this.setting = payload || {};
        this.hidePanelTab();
        break;
      case 'UPLOAD_CHANGE':
        this.uploading = payload;
        break;
      case 'HIDE_NOTION_ICON_PANEL':
        this.mask?.click();
        break;
      case 'SHOW_NOTION_ICON_PANEL': {
        this.current = 0;
        const {
          tab, tabs, tabsBar, panelContainer,
        } = await getIconPanel();
        this.icon = getIcon();
        this.mask = getPanelMask();
        if (this.panelContainer === panelContainer) return;
        this.tab = tab;
        this.tabs = tabs;
        this.tabsBar = tabsBar;
        this.panelContainer = panelContainer;
        this.hidePanelTab();
        this.tabs?.forEach((node, index) => {
          node?.addEventListener('click', () => {
            this.dispatch('TAB_CHANGE', index);
          });
        });
        break;
      }
      default:
        break;
    }
    this.observers.forEach((callback) => callback(this));
  }

  private async storageObserver() {
    const [icons, setting] = await getStorage<[Icons, Setting]>([
      ICON_STORAGE_KEY,
      SETTING_STORAGE_KEY,
    ]);
    this.dispatch('ICONS_CHANGE', icons);
    this.dispatch('SETTING_CHANGE', setting);
    storage.onChanged.addListener((changes) => {
      if (changes[ICON_STORAGE_KEY]) {
        const { newValue } = changes[ICON_STORAGE_KEY];
        this.dispatch('ICONS_CHANGE', newValue);
      }
      if (changes[SETTING_STORAGE_KEY]) {
        const { newValue } = changes[SETTING_STORAGE_KEY];
        this.dispatch('SETTING_CHANGE', newValue);
      }
    });
  }

  private async iconClickListener() {
    document.addEventListener('click', (event) => {
      const path = <HTMLElement[]>(<any>event).path;
      const isIcon = path.find(({ className }) => className?.indexOf?.(ICON_CLASS) >= 0);
      const isContent = path.find(({ className }) => className?.indexOf?.(PAGE_CONTENT_CLASS) >= 0);
      const isSideBar = path.find(({ className }) => className?.indexOf?.(SIDEBAR_CLASS) >= 0);
      if (isIcon && !isContent && !isSideBar) {
        this.dispatch('SHOW_NOTION_ICON_PANEL');
      }
    });
  }

  private hidePanelTab() {
    const { tabs, setting: { notion } } = this;
    const iamge = <HTMLElement> tabs?.[1];
    const link = <HTMLElement> tabs?.[2];
    if (iamge) iamge.style.display = notion?.image ? 'block' : 'none';
    if (link) link.style.display = notion?.link ? 'block' : 'none';
  }
}

// #region change notion dom
function changeNotionPanel(element:Element, isPlus:boolean) {
  const panels = <HTMLElement[]>Array.from(element.childNodes);
  panels?.forEach((panel) => {
    // eslint-disable-next-line no-param-reassign
    panel.style.display = isPlus ? 'none' : 'block';
  });
}

function changeNotionSearch(element:Element, isPlus:boolean) {
  const search = <HTMLElement>element.childNodes[1];
  if (search) {
    search.style.display = isPlus ? 'none' : 'block';
  }
}

function changeNotionUnderline(tabs:Element[], isPlus:boolean, prev:TabType, current:TabType) {
  if (isPlus && typeof prev === 'number') {
    const tab = tabs[prev];
    const underline = <HTMLElement>tab.childNodes[1];
    if (underline) underline.style.display = 'none';
  } else if (typeof current === 'number') {
    const tab = tabs[current];
    const underline = <HTMLElement>tab.childNodes[1];
    if (underline) underline.style.display = 'block';
  }
}
// #endregion
