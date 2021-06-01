export const uuidToId = (uuid: string) => uuid.replace(/-/g, '');

export const idToUuid = (id: string = '') => `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16,4)}-${id.substr(20)}`;

const uuidRe = /\b([a-f0-9]{32})\b/;
const uuidRe2 = /\b([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\b/;
export function getUUID(string:string, uuid=true){
  const match = string.match(uuidRe);
  if(match){
    return uuid ? idToUuid(match[1]) : match[1];
  }

  const match2 = string.match(uuidRe2)
  if (match2) {
    return uuid ? match2[1] : uuidToId(match2[1]);
  }

  return ''
}

export const delay = (time:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
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