import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { Loading } from '@/icons';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from '../observer';

const Container = styled.div`
  position: absolute;
  padding: 4px;
  border-radius: 4px;
  background: rgba(0,0,0,.6);
`;

const App = () => {
  const dispatch = useDispatch();
  const [uploading, container] = useSelector((state) => [state.uploading, state.icon]);
  const img = useMemo(() => container?.querySelector('img'), [container]);
  const observer = useMemo(() => new MutationObserver(() => {
    dispatch('UPLOAD_CHANGE', false);
  }), []);

  useEffect(() => {
    if (img) {
      const config = { attributeFilter: ['src'] };
      observer.observe(img, config);
    }
    return () => observer.disconnect();
  }, [img]);
  if (!container || !uploading) return null;
  return createPortal(
    <Container>
      <Loading className="loading-spinner" />
    </Container>,
    container,
  );
};

export default App;
