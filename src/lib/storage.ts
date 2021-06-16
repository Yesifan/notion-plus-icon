const { storage } = chrome;

export const ICON_STORAGE_KEY = 'NOTION_PLUS_ICON_URLS';
export const SETTING_STORAGE_KEY = 'NOTION_PLUS_ICON_SETTING';

export function getStorage<T>(key:string):Promise<T>;
export function getStorage<T>(keys:string[]): Promise<T>;
export function getStorage<T>(key:string | string[]):Promise<T> {
  return new Promise<any>((resolve) => {
    storage.sync.get(key, (items) => {
      if (typeof key === 'string') {
        resolve(items[key]);
      } else {
        const value = key.map((k) => items[k]);
        resolve(value);
      }
    });
  });
}

export function setStorage(items:Object) {
  const setPromise = new Promise<boolean>((resolve) => {
    storage.sync.set(items, () => {
      resolve(true);
    });
  });
  return setPromise;
}

export default storage;
