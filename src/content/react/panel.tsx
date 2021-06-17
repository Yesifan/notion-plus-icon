import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, useDispatch } from '@/content/observer';

import { Panel, Ellipsis, Flex } from '@/content/react/styled';
import { setPageIcon, Icon as IconProps } from '@/content/lib/notion';
import { useStorageIcons } from '@/lib/hooks';
import Icon from './components/icon';
import UploadLink from './components/link';
import Button from './components/button';
import UploadFile from './components/upload';

const ROW_SIZE = 12;
const NOTION_STATIC_URL = 's3-us-west-2.amazonaws.com/secure.notion-static.com';

const icon:React.CSSProperties = {
  width: '32px',
  height: '32px',
  fontSize: '24px',
  borderRadius: '3px',
  justifyContent: 'center',
};

const SubTitle:React.FC = ({ children }) => (
  <Panel.Title>
    <Ellipsis>{children}</Ellipsis>
  </Panel.Title>
);

const App:React.FC = () => {
  const dispatch = useDispatch();
  const [icons, cacheIconUrl] = useStorageIcons();
  const [tab, pageId, container] = useSelector((state) => [
    state.current, state.pageId, state.panelContainer,
  ]);
  const setIcon = useCallback(async (url:string, signedGetUrl:string, isUpload = false) => {
    dispatch('HIDE_NOTION_ICON_PANEL');
    if (pageId) {
      dispatch('UPLOAD_CHANGE', true);
      await setPageIcon(pageId, url, isUpload);
      const cacheId = url.includes(NOTION_STATIC_URL) ? pageId : 'default';
      cacheIconUrl(signedGetUrl, url, cacheId);
    }
  }, [pageId]);

  const rows = useMemo(() => {
    const linkIcons = icons.default;
    const pageIcons = icons[pageId!] || [];
    return [...linkIcons, ...pageIcons]
      .sort((a, b) => b.timestamp - a.timestamp)
      .reduce<IconProps[][]>((acc, url) => {
      const current = acc[acc.length - 1];
      if (current.length >= ROW_SIZE) acc.push([url]);
      else current.push(url);
      return acc;
    }, [[]]);
  }, [icons, pageId]);

  if (!container || tab !== 'plus') return null;
  return createPortal(
    <Flex column>
      <Flex style={{ margin: '12px 0 6px 0', padding: '0 12px' }}>
        <UploadFile style={{ width: '70px' }} onUpload={(url, src) => setIcon(url, src, true)} />
        <UploadLink onClick={(url) => setIcon(url, url)} />
      </Flex>
      <div style={{ flexGrow: 1 }}>
        <div style={{ padding: '6px 0' }}>
          <SubTitle>Recent</SubTitle>
          <Flex column style={{ padding: '0 12px', marginBottom: '1px' }}>
            {rows.map((row, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Flex key={index}>
                {row.map(({ src, url }) => (
                  <Button key={url} style={icon} onClick={() => setIcon(url, src)}>
                    <Icon size={24} alt="img-url" aria-label="img-url" src={src} />
                  </Button>
                ))}
              </Flex>
            ))}
          </Flex>
        </div>
        <div />
      </div>
    </Flex>,
    container,
  );
};

export default App;
