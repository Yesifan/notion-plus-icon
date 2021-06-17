import { useEffect, useState } from 'react';
import { Setting } from '@/interface/setting';
import storage, { getStorage, setStorage, SETTING_STORAGE_KEY } from './storage';

export const useDark = () => {
  const [isDark, setDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const callback = (e:MediaQueryListEvent) => {
      const prefersDarkMode = e.matches;
      if (prefersDarkMode) setDark(true);
      else setDark(false);
    };
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  }, []);
  return isDark;
};

export const useSetting = ():[Setting, (value:Setting)=>void] => {
  const [setting, setSetting] = useState({});

  useEffect(() => {
    const handleChanges:Parameters<typeof storage.onChanged.addListener>[0] = (changes) => {
      if (changes[SETTING_STORAGE_KEY]) {
        const setting:Setting = changes[SETTING_STORAGE_KEY].newValue;
        setSetting(setting || {});
      }
    };
    storage.onChanged.addListener(handleChanges);
    return () => {
      storage.onChanged.removeListener(handleChanges);
    };
  }, []);

  getStorage<Setting>(SETTING_STORAGE_KEY).then((value) => setSetting(value || {}));

  const setValue = (value:Setting) => {
    const newValue = { ...setting, ...value };
    setStorage({
      [SETTING_STORAGE_KEY]: newValue,
    });
  };

  return [setting, setValue];
};
