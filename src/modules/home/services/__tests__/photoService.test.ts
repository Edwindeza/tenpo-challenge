import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { photoService } from '../photoService';
import { httpClient } from '@/shared/infrastructure/http/axios';
import type { PhotoApiResponse } from '../../types/photoApi.types';

// Mock del httpClient
vi.mock('@/shared/infrastructure/http/axios', () => ({
  httpClient: {
    get: vi.fn(),
  },
}));

// Mock de import.meta.env
vi.mock('import.meta', () => ({
  env: {
    VITE_API_PHOTOS_URL: 'https://jsonplaceholder.typicode.com/photos',
  },
}));

describe('photoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPhotos', () => {
    it('debe obtener las fotos de la API con el límite correcto', async () => {
      const mockPhotos: PhotoApiResponse[] = [
        {
          id: 1,
          albumId: 1,
          title: 'Test Photo 1',
          url: 'https://via.placeholder.com/600/92c952',
          thumbnailUrl: 'https://via.placeholder.com/150/92c952',
        },
        {
          id: 2,
          albumId: 1,
          title: 'Test Photo 2',
          url: 'https://via.placeholder.com/600/771796',
          thumbnailUrl: 'https://via.placeholder.com/150/771796',
        },
      ];

      vi.mocked(httpClient.get).mockResolvedValue({
        data: mockPhotos,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await photoService.getPhotos();

      expect(httpClient.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/photos',
        {
          params: {
            _limit: 2000,
          },
        }
      );
      expect(result).toEqual(mockPhotos);
      expect(result).toHaveLength(2);
    });

    it('debe retornar un array vacío cuando la API retorna un array vacío', async () => {
      vi.mocked(httpClient.get).mockResolvedValue({
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await photoService.getPhotos();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('debe manejar errores de la API', async () => {
      const errorMessage = 'Network Error';
      vi.mocked(httpClient.get).mockRejectedValue(new Error(errorMessage));

      await expect(photoService.getPhotos()).rejects.toThrow(errorMessage);
    });

    it('debe usar el límite de 2000 elementos', async () => {
      const mockPhotos = Array.from({ length: 2000 }, (_, i) => ({
        id: i + 1,
        albumId: 1,
        title: `Photo ${i + 1}`,
        url: `https://example.com/${i + 1}`,
        thumbnailUrl: `https://example.com/thumb/${i + 1}`,
      }));

      vi.mocked(httpClient.get).mockResolvedValue({
        data: mockPhotos,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await photoService.getPhotos();

      expect(httpClient.get).toHaveBeenCalledWith(
        expect.any(String),
        {
          params: {
            _limit: 2000,
          },
        }
      );
      expect(result).toHaveLength(2000);
    });
  });
});

