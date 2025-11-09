import type { PhotoApiResponse } from '../types/photoApi.types';
import type { Photo } from '../types/photo.types';

const PICSUM_LIMIT = 300;

const generatePicsumUrl = (photoId: number): string => {
  const picsumId = (photoId % PICSUM_LIMIT) || PICSUM_LIMIT;
  return `https://picsum.photos/400/400?random=${picsumId}`;
};

export const photoAdapter = (apiPhoto: PhotoApiResponse): Photo => {
  return {
    id: apiPhoto.id,
    albumId: apiPhoto.albumId,
    title: apiPhoto.title,
    url: apiPhoto.url,
    thumbnailUrl: apiPhoto.thumbnailUrl,
    picsumUrl: generatePicsumUrl(apiPhoto.id),
  };
};

export const photosAdapter = (apiPhotos: PhotoApiResponse[]): Photo[] => {
  return apiPhotos.map(photoAdapter);
};

