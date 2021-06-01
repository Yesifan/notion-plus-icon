import { getUUID } from "@/lib/utils";

export function getQueryString(name:string, href = location.href) {
  const reg = new RegExp('(\\?|&)' + name + '=([^&^#]*)(&|$|#)', 'i');
  const r = href.match(reg);
  if (r !== null) return decodeURIComponent(r[2]);
  return null;
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

  return new Promise((resolve) => {
    input.onchange = () => {
      if(multiple) resolve(Array.from(input.files || []));
      else resolve(input.files?.item(0));
      document.body.removeChild(input);
    };
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