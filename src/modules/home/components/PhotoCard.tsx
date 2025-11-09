import { memo } from 'react';
import type { Photo } from '../types/photo.types';

type PhotoCardProps = {
  photo: Photo;
  theme: 'dark' | 'light';
};

export const PhotoCard = memo(({ photo, theme }: PhotoCardProps) => {
  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-dark';
  const borderClass = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return (
    <article className={`rounded-lg overflow-hidden shadow-md border mb-2 relative ${borderClass} ${bgClass}`} aria-label={`Foto: ${photo.title}`}>
      <div className="h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden bg-gray-100 p-2 relative">
        <img
          src={photo.picsumUrl}
          alt={`${photo.title} - Album ${photo.albumId}`}
          className="w-full h-full object-contain transition-transform hover:scale-105"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className={`p-2 sm:p-3 h-[60px] sm:h-[80px] ${textClass}`}>
        <h3 className="text-xs sm:text-sm line-clamp-2 font-medium">{photo.title}</h3>
        <p className="text-xs mt-1 opacity-70" aria-label={`Número de álbum: ${photo.albumId}`}>
          Album {photo.albumId}
        </p>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  return prevProps.photo.id === nextProps.photo.id &&
         prevProps.photo.title === nextProps.photo.title &&
         prevProps.photo.albumId === nextProps.photo.albumId &&
         prevProps.theme === nextProps.theme;
});

PhotoCard.displayName = 'PhotoCard';

