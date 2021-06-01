const { storage } = chrome;

export const ICON_STORAGE_KEY = "NOTION_PLUS_ICON_URLS";

export function getStorage<T>(key:string) {
  return new Promise<T>(resolve => {
    storage.sync.get(key, items => {
      resolve(items[key])
    })
  })
}

export function setStorage(items:Object) {
  const setPromise = new Promise<boolean>(resolve => {
    storage.sync.set(items, () => {
      resolve(true)
    })
  });
  return setPromise;
}

interface Translation<T> {
  (icons:T): T
}
export async function setStorage4prev<T>(key:string, getNewValue:Translation<T>) {
  const value = await getStorage<T>(key);
  const newValue = getNewValue(value);
  return setStorage({[key]: newValue});
}

export default storage;