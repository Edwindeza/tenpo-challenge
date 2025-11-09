import { useState, useDeferredValue, useMemo } from 'react';
import type { Photo } from '../types/photo.types';

export const usePhotoSearch = (photos: Photo[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredPhotos = useMemo(() => {
    if (!deferredSearchTerm.trim()) {
      return photos;
    }

    const lowerSearchTerm = deferredSearchTerm.toLowerCase();
    return photos.filter((photo) => {
      const matchesTitle = photo.title.toLowerCase().includes(lowerSearchTerm);
      const matchesAlbum = photo.albumId.toString().includes(deferredSearchTerm.trim());
      return matchesTitle || matchesAlbum;
    });
  }, [photos, deferredSearchTerm]);

  return {
    filteredPhotos,
    searchTerm,
    setSearchTerm,
  };
};

