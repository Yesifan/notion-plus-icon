export const parseClassName = (...classname: (string|undefined)[]) => {
  return classname.filter(Boolean).join(' ');
}

export const delay = (time:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

export function chooseFile(accept = 'image/*', multiple = false):Promise<File[]> {
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
      resolve(Array.from(input.files || []));
      document.body.removeChild(input);
    };
    input.click();
  });
}