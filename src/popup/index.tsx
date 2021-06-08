import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import Menu, { Group, Item } from './components/menu';

import { light, dark } from '@/theme';
import { github, github_dark, star } from '@/icons';

const REPOSITORY_URL = 'https://github.com/Yesifan/notion-plus-icon'
const ISSUES_URL = 'https://github.com/Yesifan/notion-plus-icon/issues';

const App = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(()=>{
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const callback = (e:MediaQueryListEvent) => {
      let prefersDarkMode = e.matches;
      if (prefersDarkMode) setIsDark(true);
      else setIsDark(false);
    }
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  },[])
  
  return (
    <ThemeProvider theme={isDark?dark:light}>
      <Menu>
        <Group>
          <Item href={REPOSITORY_URL} target="_blank" icon={star}>
            Give Me A Star
          </Item>
          <Item href={ISSUES_URL} target="_blank" icon={isDark?github_dark:github}>
            Welcome to issues!
          </Item>
        </Group>
      </Menu>
    </ThemeProvider>
  )
}

render(<App/>, document.querySelector('#root'));