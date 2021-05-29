import { parsePageId } from 'notion-utils';
import store, { changeTab } from './store';

import { getIconDom, getIconPanel } from './lib/dom';

export default class Observer {
  pageId?:string;

  icon?: Element;
  tabs?: Element[];
  tabContainer?: Element;
  panelContainer?: Element;
  pluseTabContainer?: Element;
  callback?: Function[] = [];

  constructor(){
    store.subscribe(() => this.addReduxEvent());
    this.update();
  }

  emit(){
    this.callback?.forEach(callback => callback());
  }

  subscribe(callback:Function){
    this.callback?.push(callback);
  }

  async update(){
    this.pageId = parsePageId(location.href);
    this.setIcon();
  }

  async setIcon(){
    const icon = await getIconDom();
    if(this.icon === icon) return;
    this.icon = icon;
    icon.addEventListener('click', () => this.setContainer());
  }

  async setContainer(){
    store.dispatch(changeTab(0)); // reset selected 0
    const panel = await getIconPanel();
    const { plusTab, tabContainer, panelContainer } = panel;
    if(this.panelContainer === panelContainer) return;
    if(plusTab && tabContainer && panelContainer){
      this.pluseTabContainer = plusTab;
      this.tabContainer = tabContainer;
      this.panelContainer = panelContainer;
      if(tabContainer.firstChild?.childNodes){
        const [ emoji, upload, url ] = Array.from(tabContainer.firstChild?.childNodes) as Element[];
        this.tabs = [ emoji, upload, url ];
      }
      this.addNotionTabEvent();
      this.emit();
    }
  }

  addReduxEvent(){
    const { prev, selected } = store.getState();
    if(prev === selected) return;
    const isPlus = selected === 'plus';
    this.changeNotionPanel(isPlus);
    this.changeNotionSearch(isPlus);
    this.changeNotionUnderline(isPlus);
  }

  addNotionTabEvent(){
    this.tabs?.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        store.dispatch(changeTab(index));
      })
    })
  }

  changeNotionPanel(isPlus:boolean){
    if(this.panelContainer?.childNodes){
      const panels = <HTMLElement[]>Array.from(this.panelContainer.childNodes);
      if(isPlus){
        panels?.forEach(panel => {
          panel.style.display = "none";
        })
      }else{
        panels?.forEach(panel => {
          panel.style.display = "block";
        })
      }
    }
  }

  changeNotionSearch(isPlus:boolean){
    if(this.tabContainer?.childNodes[1]){
      const search = <HTMLElement>this.tabContainer?.childNodes[1];
      if(isPlus){
        search.style.display = "none";
      }else{
        search.style.display = "block";
      }
    }
  }

  changeNotionUnderline(isPlus:boolean){
    if(this.tabs){
      const { prev, selected } = store.getState();
      if(isPlus && typeof prev === 'number'){
        const tab = this.tabs[prev]
        const underline = <HTMLElement>tab.childNodes[1];
        underline && (underline.style.display = "none");
      }else if(typeof selected === 'number'){
        const tab = this.tabs[selected]
        const underline = <HTMLElement>tab.childNodes[1];
        underline && (underline.style.display = "block");
      }
    }
  }
}