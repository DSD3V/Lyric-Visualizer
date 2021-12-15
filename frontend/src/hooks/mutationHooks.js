import { useEffect, useState } from 'react';

// Hook taken from https://blog.logrocket.com/guide-to-custom-react-hooks-with-mutationobserver/
const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};

export const useMutationObservable = (
  targetEl,
  cb,
  options = DEFAULT_OPTIONS
) => {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    // A)
    if (!cb || typeof cb !== 'function') {
      console.warn(
        `You must provide a valid callback function, instead you've provided ${cb}`
      );
      return;
    }
    const obs = new MutationObserver(cb);
    setObserver(obs);
  }, [cb, options, setObserver]);
  useEffect(() => {
    if (!observer) return;
    if (!targetEl) {
      // B)
      console.warn(
        `You must provide a valid DOM element to observe, instead you've provided ${targetEl}`
      );
    }
    const { config } = options;
    try {
      observer.observe(targetEl, config);
    } catch (e) {
      // C)
      console.error(e);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options]);
};
