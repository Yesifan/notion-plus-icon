import { useEffect, useRef, useState } from "react";

import { ICON_STORAGE_KEY } from '@/api/notion/icon';

const { storage } = chrome;

export const useGetStorage = () => {
  const isDestory = useRef(false);
  const [ urls, setUrls ] = useState<string[]>([]);
  const setUrl = () => {
    storage.sync.get(ICON_STORAGE_KEY, items => {
      if(isDestory.current) return;
      const urls = items[ICON_STORAGE_KEY];
      setUrls(urls);
    })
  }
  useEffect(()=>{
    setUrl();
    storage.onChanged.addListener(setUrl)
    return () => {
      isDestory.current = true;
      storage.onChanged.removeListener(setUrl);
    }
  }, []);


  return urls;
}