'use client';
import { useEffect, useState } from 'react';

/**
 * Returns true on phone-width viewports (<760px) OR when forced via prop.
 *
 * The forced mode is used to render the real site inside the iOS preview
 * frame on desktop — the iframe-style container is fixed at 402px but the
 * actual `window.innerWidth` is desktop, so media queries don't fire there.
 */
export function useCompact(force?: boolean): boolean {
  const [c, setC] = useState<boolean>(() => {
    if (force) return true;
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 760;
  });

  useEffect(() => {
    if (force) {
      setC(true);
      return;
    }
    const onResize = () => setC(window.innerWidth < 760);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [force]);

  return c;
}
