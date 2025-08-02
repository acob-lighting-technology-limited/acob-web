import { useCallback } from 'react';
import NProgress from '@/lib/nprogress';

export function useNProgress() {
  const start = useCallback(() => {
    NProgress.start();
  }, []);

  const done = useCallback(() => {
    NProgress.done();
  }, []);

  const set = useCallback((n: number) => {
    NProgress.set(n);
  }, []);

  const isStarted = useCallback(() => {
    return NProgress.isStarted();
  }, []);

  const remove = useCallback(() => {
    NProgress.remove();
  }, []);

  const configure = useCallback((options: any) => {
    NProgress.configure(options);
  }, []);

  return {
    start,
    done,
    set,
    isStarted,
    remove,
    configure,
  };
}
