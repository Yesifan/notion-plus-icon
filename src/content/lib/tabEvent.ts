export const tabsClickListen = (tab:Element) => {
  if(tab.firstChild?.childNodes){
    const [ emoji, upload, url ] = Array.from(tab.firstChild?.childNodes);
    [ emoji, upload, url ].forEach(dom => {
      dom.addEventListener('click', () => {

      })
    })
  }
}