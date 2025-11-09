import { httpClient } from '@/shared/infrastructure/http/axios';
import type { PhotoApiResponse } from '../types/photoApi.types';

const LIMIT = 2000;

export const photoService = {
  getPhotos: async (): Promise<PhotoApiResponse[]> => {
    const url = import.meta.env.VITE_API_PHOTOS_URL;
    const response = await httpClient.get<PhotoApiResponse[]>(url, {
      params: {
        _limit: LIMIT,
      },
    });
    return response.data;
  },
};

