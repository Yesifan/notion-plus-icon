import { useEffect, useMemo, useState } from "react";

import { ICON_STORAGE_KEY } from '@/api/notion/icon';

export const useGetStorage = () => {
  const { storage } = chrome;
  const [ urls, setUrls ] = useState<string[]>([]);
  useEffect(()=>{
    storage.sync.get(ICON_STORAGE_KEY, items => {
      const urls = items[ICON_STORAGE_KEY];
      setUrls(urls);
    })
  });
  return urls;
}