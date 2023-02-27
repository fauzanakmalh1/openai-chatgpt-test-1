'use client';

import { useCallback } from 'react';
import NProgress from 'nprogress';

import RouterEventProvider from './StartRouterChangeContext.client';

NProgress.configure({ showSpinner: false });

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const onStartProgress = useCallback(() => NProgress.start(), []);
  const onCompleteProgress = useCallback(() => NProgress.done(), []);

  const onStart = useCallback(() => {
    onStartProgress();
  }, []);

  const onComplete = useCallback(() => {
    onCompleteProgress();
  }, []);

  return (
    <RouterEventProvider onStart={onStart} onComplete={onComplete}>
      {children}
    </RouterEventProvider>
  );
};

export default Providers;
