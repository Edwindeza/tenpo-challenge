import { memo, useMemo } from 'react';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { Photo } from '../types/photo.types';
import { PhotoCard } from './PhotoCard';

type VirtualRowProps = {
  photos: Photo[];
  startIndex: number;
  endIndex: number;
  virtualRow: VirtualItem;
  measureElement: (element: HTMLElement | null) => void;
  theme: 'dark' | 'light';
};

export const VirtualRow = memo(({ photos, startIndex, endIndex, virtualRow, measureElement, theme }: VirtualRowProps) => {
  
  const rowPhotos = useMemo(
    () => photos.slice(startIndex, endIndex),
    [photos, startIndex, endIndex]
  );

  return (
    <div
      key={virtualRow.key}
      data-index={virtualRow.index}
      ref={measureElement}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${virtualRow.size}px`,
        transform: `translateY(${virtualRow.start}px)`,
        willChange: 'transform',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-1 mb-2">
        {rowPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} theme={theme} />
        ))}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.virtualRow.index === nextProps.virtualRow.index &&
    prevProps.virtualRow.start === nextProps.virtualRow.start &&
    prevProps.virtualRow.size === nextProps.virtualRow.size &&
    prevProps.startIndex === nextProps.startIndex &&
    prevProps.endIndex === nextProps.endIndex &&
    prevProps.photos === nextProps.photos &&
    prevProps.theme === nextProps.theme
  );
});

VirtualRow.displayName = 'VirtualRow';

