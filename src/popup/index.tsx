import { render } from 'react-dom';
import { ThemeProvider } from '@emotion/react';

import {
  star,
  tutorials,
  github, github_dark,
  changelog, changelog_dark,
} from '@/icons';
import { light, dark } from '@/theme';
import { useDark, useSetting } from '@/lib/hooks';
import Menu, { Group, LinkItem, SwitchItem } from './components/menu';

const REPOSITORY_URL = 'https://github.com/Yesifan/notion-plus-icon';
const ISSUES_URL = 'https://github.com/Yesifan/notion-plus-icon/issues';
const TUTORIALS = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Tutorials-8e54d0957eb54938a0bed501a0374cd4';
const CHANGELOG = 'https://www.notion.so/yeseth/NOTION-PLUS-ICON-Changelog-647c37f1a7e045b2839735bb02a7b28a';

const App = () => {
  const isDark = useDark();
  const [setting, setSetting] = useSetting();
  const { link, image } = setting?.notion || {};
  const updateSetting = (key:'link' | 'image') => {
    setSetting({
      notion: {
        link: key === 'link' ? !link : !!link,
        image: key === 'image' ? !image : !!image,
      },
    });
  };
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <Menu>
        <Group title="Setting">
          <SwitchItem checkd={link} onClick={() => updateSetting('link')}>
            Notion Link Tab
          </SwitchItem>
          <SwitchItem checkd={image} onClick={() => updateSetting('image')}>
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
