import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useState, useMemo } from 'react';
import type { Photo } from '../../types/photo.types';

const getColumns = (): number => {
  if (typeof window === 'undefined') return 4;

  const width = window.innerWidth;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
};

type UseVirtualizedListProps = {
  photos: Photo[];
  searchTerm?: string;
};

export const useVirtualizedList = ({ photos, searchTerm }: UseVirtualizedListProps) => {
  const [columns, setColumns] = useState(getColumns());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setColumns(getColumns());
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const rowCount = useMemo(() => Math.ceil(photos.length / columns), [photos.length, columns]);

  const estimateRowHeight = useMemo(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const imageHeight = width >= 768 ? 250 : width >= 640 ? 220 : 200;
    const textHeight = width >= 640 ? 65 : 60;
    const cardPadding = 8;
    const border = 1;
    const mb = 8;
    return imageHeight + textHeight + (cardPadding * 2) + (border * 2) + mb;
  }, [columns]);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => (typeof window !== 'undefined' ? document.documentElement : null),
    estimateSize: () => estimateRowHeight,
    overscan: 5,
    scrollMargin: 0,
    observeElementRect: (_instance, cb) => {
      if (typeof window === 'undefined') return;

      const element = document.documentElement;
      const handler = () => {
        cb({
          width: element.clientWidth,
          height: element.clientHeight,
        });
      };

      handler();
      window.addEventListener('resize', handler, { passive: true });
      return () => window.removeEventListener('resize', handler);
    },
    observeElementOffset: (_instance, cb) => {
      if (typeof window === 'undefined') return;

      const handler = () => {
        cb(window.scrollY, false);
      };

      handler();
      window.addEventListener('scroll', handler, { passive: true });
      return () => window.removeEventListener('scroll', handler);
    },
  });

  useEffect(() => {
    if (searchTerm !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchTerm]);

  return {
    virtualizer,
    columns,
  };
};

