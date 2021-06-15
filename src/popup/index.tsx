import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import { light, dark } from '@/theme';
import {
  star,
  tutorials,
  github, github_dark,
  changelog, changelog_dark,
} from '@/icons';
import Menu, { Group, Item } from './components/menu';

const REPOSITORY_URL = 'https://github.com/Yesifan/notion-plus-icon';
const ISSUES_URL = 'https://github.com/Yesifan/notion-plus-icon/issues';
const TUTORIALS = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Tutorials-8e54d0957eb54938a0bed501a0374cd4';
const CHANGELOG = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Changelog-647c37f1a7e045b2839735bb02a7b28a';

const App = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const callback = (e:MediaQueryListEvent) => {
      const prefersDarkMode = e.matches;
      if (prefersDarkMode) setIsDark(true);
      else setIsDark(false);
    };
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  }, []);

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Menu>
        <Group title="Setting">
          <Item href={TUTORIALS} target="_blank">
            Notion Link Tab
          </Item>
          <Item href={TUTORIALS} target="_blank">
            Notion Image Tab
          </Item>
        </Group>
        <Group title="Info">
          <Item href={TUTORIALS} target="_blank" icon={tutorials}>
            Tutorials
          </Item>
          <Item href={CHANGELOG} target="_blank" icon={isDark ? changelog_dark : changelog}>
            Changelog
          </Item>
        </Group>
        <Group title="Repository">
          <Item href={REPOSITORY_URL} target="_blank" icon={star}>
            Give Me A Star
          </Item>
          <Item href={ISSUES_URL} target="_blank" icon={isDark ? github_dark : github}>
            Welcome to issues!
          </Item>
        </Group>
      </Menu>
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
