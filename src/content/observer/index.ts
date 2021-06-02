import storage, { getStorage, ICON_STORAGE_KEY } from '@/lib/storage';

import { StorageIcons } from '../lib/notion';
import { getIconPanel, getPanelMask } from '../lib/dom';

export * from './hooks';
export { default as Provider } from './provider';
export type TabType = number| 'plus';
interface Callback {
  (observer:Observer): void
}

const ICON_CLASS = 'notion-record-icon';
const PAGE_CONTENT = 'notion-page-content';

interface Theme {
  mode:"light"|"dark"
}
export default class Observer {
  pageId?:string;

  theme:Theme = { mode: "light" };

  icons: StorageIcons = { default:[] };

  current:TabType = 0;
  private previous?: TabType;

  tab?: Element|null; // <Tab/> container
  tabs?: Element[]|null;
  tabsBar?: Element|null;
  panelContainer?: Element|null;// <Panel/> container

  mask?: HTMLElement;

  private observers: Callback[] = [];

  constructor(pageId:string){
    this.storageObserver();
    this.iconClickListener();
    this.dispatch('PAGE_CHANGE', pageId);
  }
  
  subscribe(callback:Callback){
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter(item=>item!==callback);
    }
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
        break;
      case 'HIDE_NOTION_ICON_PANEL':
        this.mask?.click();
        break;
      case 'SHOW_NOTION_ICON_PANEL':
        this.current = 0;
        this.theme = getTheme();
        const { tab, tabs, tabsBar, panelContainer } = await getIconPanel();
        this.mask = getPanelMask();
        if(this.panelContainer === panelContainer) return;
        this.tab = tab;
        this.tabs = tabs;
        this.tabsBar = tabsBar;
        this.panelContainer = panelContainer;
        // watching notion tab click
        const [emoji, upload, link] = <HTMLElement[]>this.tabs||[];
        upload && (upload.style.display = "none");
        link && (link.style.display = "none");
        emoji?.addEventListener('click', () => {
          this.dispatch('TAB_CHANGE', 0);
        })
        break;
    }
    this.observers.forEach(callback => callback(this));
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

  private async iconClickListener(){
    document.addEventListener('click', (event)=>{
      const path:HTMLElement[] = (<any>event).path;
      const isIcon = path.find(element => element?.className?.indexOf?.(ICON_CLASS)>=0);
      const isContent = path.find(element => element?.className?.indexOf?.(PAGE_CONTENT)>=0);
      if(isIcon&&!isContent){
        this.dispatch('SHOW_NOTION_ICON_PANEL')
      }
    })
  }
}

export function getTheme():Theme{
  const theme = localStorage.getItem('theme');
  try{
    return theme ? JSON.parse(theme) : { mode: 'light' };
  }catch(e){
    return { mode: 'light' }
  }
}

//#region change notion dom
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
    const tab = tabs[prev];
    const underline = <HTMLElement>tab.childNodes[1];
    underline && (underline.style.display = "none");
  }else if(typeof current === 'number'){
    const tab = tabs[current];
    const underline = <HTMLElement>tab.childNodes[1];
    underline && (underline.style.display = "block");
  }
}
//#endregion