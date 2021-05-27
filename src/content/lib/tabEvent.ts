import store, { tabOther } from '../store';

export default class Listen {
  prevTab:number|'plus';
  tabs?: Node[];
  tabContainer?: Node;
  constructor(){
    const state = store.getState();
    store.subscribe(() => this.reduxEvent());

    this.prevTab = state.selected;
  }

  setContainer(tabContainer:Node){
    this.tabContainer = tabContainer;
    if(tabContainer.firstChild?.childNodes){
      const [ emoji, upload, url ] = Array.from(tabContainer.firstChild?.childNodes);
      this.tabs = [ emoji, upload, url ];
    }
    this.listenClickEvent();
  }

  reduxEvent(){
    if(this.tabs){
      const { selected } = store.getState();
      const prevTab = this.prevTab;
      this.prevTab = selected;
      if(selected === 'plus' && prevTab !== 'plus'){
        const tab = this.tabs[prevTab]
        const underline = <HTMLElement>tab.childNodes[1];
        underline && (underline.style.display = "none");
      }else if(typeof selected === 'number'){
        const tab = this.tabs[selected]
        const underline = <HTMLElement>tab.childNodes[1];
        underline && (underline.style.display = "block");
      }
    }
  }

  listenClickEvent(){
    this.tabs?.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        store.dispatch(tabOther(index));
      })
    })
  }
}