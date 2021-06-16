import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import {
  star,
  tutorials,
  github, github_dark,
  changelog, changelog_dark,
} from '@/icons';
import { light, dark } from '@/theme';
import Menu, { Group, LinkItem, SwitchItem } from './components/menu';

const REPOSITORY_URL = 'https://github.com/Yesifan/notion-plus-icon';
const ISSUES_URL = 'https://github.com/Yesifan/notion-plus-icon/issues';
const TUTORIALS = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Tutorials-8e54d0957eb54938a0bed501a0374cd4';
const CHANGELOG = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Changelog-647c37f1a7e045b2839735bb02a7b28a';

const App = () => {
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

  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Menu>
        <Group title="Setting">
          <SwitchItem>
            Notion Link Tab
          </SwitchItem>
          <SwitchItem checkd>
            Notion Image Tab
          </SwitchItem>
        </Group>
        <Group title="Info">
          <LinkItem href={TUTORIALS} target="_blank" icon={tutorials}>
            Tutorials
          </LinkItem>
          <LinkItem href={CHANGELOG} target="_blank" icon={isDark ? changelog_dark : changelog}>
            Changelog
          </LinkItem>
        </Group>
        <Group title="Repository">
          <LinkItem href={REPOSITORY_URL} target="_blank" icon={star}>
            Give Me A Star
          </LinkItem>
          <LinkItem href={ISSUES_URL} target="_blank" icon={isDark ? github_dark : github}>
            Welcome to issues!
          </LinkItem>
        </Group>
      </Menu>
    </ThemeProvider>
  );
};

render(<App />, document.querySelector('#root'));
