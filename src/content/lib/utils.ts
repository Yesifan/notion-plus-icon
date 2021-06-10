import { getUUID } from "@/lib/utils";

export function getQueryString(name:string, href = location.href) {
  const reg = new RegExp('(\\?|&)' + name + '=([^&^#]*)(&|$|#)', 'i');
  const r = href.match(reg);
  if (r !== null) return decodeURIComponent(r[2]);
  return null;
}

interface Theme {
  mode:"light"|"dark"
}
export function getTheme():Theme{
  const theme = localStorage.getItem('theme');
  try{
    return theme ? JSON.parse(theme) : { mode: 'light' };
  }catch(e){
    return { mode: 'light' }
  }
}

export const parseClassName = (...classname: (string|undefined)[]) => {
  return classname.filter(Boolean).join(' ');
}

export function chooseFile(accept = 'image/*', multiple = false):Promise<File[]|File|undefined|null> {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept || '';
  input.multiple = multiple;
  input.style.position = 'fixed';
  input.style.width = '100px';
  input.style.left = '-10000px';

  document.body.appendChild(input);

  return new Promise((resolve, reject) => {
    let times = 0;
    let isChange = false;
    input.onfocus = () => {
      times++;
      if(times < 2) return;
      setTimeout(()=>{
        if(!isChange) reject();
        document.body.removeChild(input);
      },100)
    }
    input.onchange = () => {
      isChange = true;
      if(input.files&&input.files.item(0)){
        if(multiple) resolve(Array.from(input.files));
        else resolve(input.files.item(0));
      }else{
        reject()
      }
    };
    input.focus();
    input.click();
  });
}

export function getCurrentPageId(){
  const href = location.href;
  const subPageString = getQueryString('p', href);
  const subPageId = subPageString && getUUID(subPageString);
  if(subPageId) return subPageId;
  else return getUUID(href);
}