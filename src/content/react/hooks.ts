import { useEffect, useRef, useState } from "react";

import { ICON_STORAGE_KEY } from '@/api/notion/icon';

const { storage } = chrome;

export const useGetStorage = () => {
  const isDestory = useRef(false);
  const [ urls, setUrls ] = useState<string[]>([]);
  useEffect(()=>{
    storage.sync.get(ICON_STORAGE_KEY, items => {
      if(isDestory.current) return;
      const urls = items[ICON_STORAGE_KEY];
      setUrls(urls);
    })
    return () => {
      isDestory.current = true;
    }
  });
  return urls;
}