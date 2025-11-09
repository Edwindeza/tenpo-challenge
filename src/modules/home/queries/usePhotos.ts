import { useQuery } from '@tanstack/react-query';
import { photoService } from '../services/photoService';
import { photosAdapter } from '../services/photoAdapter';
import type { Photo } from '../types/photo.types';

export const usePhotos = () => {
  return useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      const apiPhotos = await photoService.getPhotos();
      return photosAdapter(apiPhotos);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

