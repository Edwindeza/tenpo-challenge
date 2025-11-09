import type { Photo } from '../../types/photo.types';
import { VirtualRow } from '../VirtualRow';
import { useVirtualizedList } from './useVirtualizedList';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

type VirtualizedListProps = {
  photos: Photo[];
  searchTerm?: string;
};

export const VirtualizedList = ({ photos, searchTerm }: VirtualizedListProps) => {
  const { virtualizer, columns } = useVirtualizedList({ photos, searchTerm });
  const theme = useThemeStore((state) => state.theme);

  return (
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const startIndex = virtualRow.index * columns;
        const endIndex = Math.min(startIndex + columns, photos.length);

        return (
          <VirtualRow
            key={virtualRow.key}
            photos={photos}
            startIndex={startIndex}
            endIndex={endIndex}
            virtualRow={virtualRow}
            measureElement={virtualizer.measureElement}
            theme={theme}
          />
        );
      })}
    </div>
  );
};

