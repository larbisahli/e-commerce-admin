import { useMemo } from 'react';

export function usePlaceholder(length?: number) {
  const tablePlaceholderRow = useMemo(() => {
    return Array.from({ length: length ?? 8 })?.map(() => ({ loading: true }));
  }, [length]);

  return { tablePlaceholderRow };
}
