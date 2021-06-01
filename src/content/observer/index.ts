import storage, { getStorage, ICON_STORAGE_KEY } from '@/lib/storage';

import { StorageIcons } from '../lib/notion';
import { getIconDom, getIconPanel, getPanelMask } from '../lib/dom';
import { delay } from '@/lib/utils';

export * from './hooks';

export { default as Provider } from './provider';

interface Callback {
  (observer:Observer): void
}

export type TabType = number| 'plus';

export default class Observer {
  pageId?:string;
  isSubPage = false;

  icons: StorageIcons = { default:[] };

  current:TabType = 0;
  private previous?: TabType;

  mask?: HTMLElement;

  icon?: Element;
  iconContainer? :Element;

  tab?: Element; // <Tab/> container
  tabs?: Element[];
  tabsBar?: Element;
  panelContainer?: Element;// <Panel/> container

  private observers?: Callback[] = [];
  private iconObserver?: MutationObserver;

  constructor(pageId:string){
    this.storageObserver();
    this.dispatch('PAGE_CHANGE', pageId);
  }

  async dispatch(type:string, payload?:any){
    switch(type){
      case 'TAB_CHANGE':
        if(payload === this.current) return;
        this.previous = this.current;
        this.current = payload;
        const isPlus = this.current === 'plus';
        this.panelContainer && changeNotionPanel(this.panelContainer, isPlus);
        this.tabsBar && changeNotionSearch(this.tabsBar, isPlus);
        this.tabs && changeNotionUnderline(this.tabs, isPlus, this.previous, this.current);
        break;
      case 'STORAGE_ICONS_CHANGE':
        this.icons = payload||{ default:[] };
        break;
      case 'PAGE_CHANGE':
        this.pageId = payload;
        await delay(100);
        this.dispatch("ICON_CONTAINER_CHANGE");
        break;
      case 'ICON_CONTAINER_CHANGE':
        const iconContainer = await getIconDom();
        console.log(iconContainer)
        if(iconContainer === this.iconContainer) return;
        this.iconContainer = iconContainer;
        this.iconObserver?.disconnect();
        this.iconObserver = new MutationObserver(()=>this.dispatch("ICON_CHANGE"));
        this.iconObserver.observe(this.iconContainer, {childList: true});
      case 'ICON_CHANGE':
        const icon = <Element>this.iconContainer?.firstChild;
        if(this.icon === icon) return;
        this.icon = icon;
        this.icon.addEventListener('click', () => this.dispatch("SHOW_NOTION_ICON_PANEL"));
        break;
      case 'HIDE_NOTION_ICON_PANEL':
        this.mask?.click();
        break;
      case 'SHOW_NOTION_ICON_PANEL':
        this.dispatch('TAB_CHANGE', 0);
        const { tab, tabs, tabsBar, panelContainer } = await getIconPanel();
        this.mask = getPanelMask();
        if(this.panelContainer === panelContainer) return;
        this.tab = tab;
        this.tabs = tabs;
        this.tabsBar = tabsBar;
        this.panelContainer = panelContainer;
        // watching notion tab click
        this.tabs?.slice?.(0, -2).forEach((tab, index) => {
          tab.addEventListener('click', () => {
            this.dispatch('TAB_CHANGE', index);
          })
        })
        break;
    }
    this.observers?.forEach(callback => callback(this));
  }

  subscribe(callback:Callback){
    this.observers?.push(callback);
    return () => {
      this.observers?.filter(item => item!==callback);
    }
  }

  private async storageObserver(){
    const icons = await getStorage(ICON_STORAGE_KEY)
    this.dispatch('STORAGE_ICONS_CHANGE', icons);
  
    storage.onChanged.addListener((changes)=>{
      if(changes[ICON_STORAGE_KEY]){
        const { newValue } = changes[ICON_STORAGE_KEY];
        this.dispatch('STORAGE_ICONS_CHANGE', newValue);
      }
    })
  }
}

function changeNotionPanel(element:Element, isPlus:boolean){
  const panels = <HTMLElement[]>Array.from(element.childNodes);
  panels?.forEach(panel => {
    panel.style.display = isPlus? "none" : "block";
  })
}

function changeNotionSearch(element:Element, isPlus:boolean){
  const search = <HTMLElement>element.childNodes[1];
  if(search){
    search.style.display = isPlus? "none" : "block";
  }
}

function changeNotionUnderline(tabs:Element[], isPlus:boolean, prev:TabType, current:TabType){
  if(isPlus && typeof prev === 'number'){
    const tab = tabs[prev]
    const underline = <HTMLElement>tab.childNodes[1];
    underline && (underline.style.display = "none");
  }else if(typeof current === 'number'){
    const tab = tabs[current]
    const underline = <HTMLElement>tab.childNodes[1];
    underline && (underline.style.display = "block");
  }
}