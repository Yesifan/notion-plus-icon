import store, { tabOther } from './store';

export default class Observer {
  prevTab:number|'plus';
  tabs?: Node[];
  tabContainer?: Node;
  panelContainer?: Node;

  constructor(){
    const state = store.getState();
    store.subscribe(() => this.reduxEvent());

    this.prevTab = state.selected;
  }

  setContainer(tabContainer:Node, panelContainer:Node){
    this.tabContainer = tabContainer;
    this.panelContainer = panelContainer;
    if(tabContainer.firstChild?.childNodes){
      const [ emoji, upload, url ] = Array.from(tabContainer.firstChild?.childNodes);
      this.tabs = [ emoji, upload, url ];
    }
    this.Subject();
  }

  reduxEvent(){
    const { selected } = store.getState();
    const isPlus = selected === 'plus';
    this.changePanel(isPlus);
    this.changeSearch(isPlus);
    this.changeUnderline(isPlus);
  }

  Subject(){
    this.tabs?.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        store.dispatch(tabOther(index));
      })
    })
  }

  changePanel(isPlus:boolean){
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
  changeSearch(isPlus:boolean){
    if(this.tabContainer?.childNodes[1]){
      const search = <HTMLElement>this.tabContainer?.childNodes[1];
      if(isPlus){
        search.style.display = "none";
      }else{
        search.style.display = "block";
      }
    }
  }
  changeUnderline(isPlus:boolean){
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