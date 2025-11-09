import { describe, it, expect } from 'vitest';
import { photoAdapter, photosAdapter } from '../photoAdapter';
import type { PhotoApiResponse } from '../../types/photoApi.types';
import type { Photo } from '../../types/photo.types';

describe('photoAdapter', () => {
  const mockApiPhoto: PhotoApiResponse = {
    id: 1,
    albumId: 1,
    title: 'Test Photo',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  };

  describe('photoAdapter', () => {
    it('debe transformar correctamente un PhotoApiResponse a Photo', () => {
      const result = photoAdapter(mockApiPhoto);

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('albumId', 1);
      expect(result).toHaveProperty('title', 'Test Photo');
      expect(result).toHaveProperty('url', 'https://via.placeholder.com/600/92c952');
      expect(result).toHaveProperty('thumbnailUrl', 'https://via.placeholder.com/150/92c952');
      expect(result).toHaveProperty('picsumUrl');
      expect(result.picsumUrl).toContain('picsum.photos');
    });

    it('debe generar una URL de Picsum basada en el ID', () => {
      const photo1 = photoAdapter({ ...mockApiPhoto, id: 1 });
      const photo2 = photoAdapter({ ...mockApiPhoto, id: 301 });
      const photo3 = photoAdapter({ ...mockApiPhoto, id: 600 });

      expect(photo1.picsumUrl).toContain('random=1');
      expect(photo2.picsumUrl).toContain('random=1'); // 301 % 300 = 1
      expect(photo3.picsumUrl).toContain('random=300'); // 600 % 300 = 0, usa 300
    });

    it('debe manejar IDs que son múltiplos de 300', () => {
      const photo = photoAdapter({ ...mockApiPhoto, id: 300 });
      expect(photo.picsumUrl).toContain('random=300');
    });

    it('debe manejar ID 0 usando 300 como fallback', () => {
      const photo = photoAdapter({ ...mockApiPhoto, id: 0 });
      expect(photo.picsumUrl).toContain('random=300');
    });
  });

  describe('photosAdapter', () => {
    it('debe transformar un array de PhotoApiResponse a Photo[]', () => {
      const apiPhotos: PhotoApiResponse[] = [
        { ...mockApiPhoto, id: 1 },
        { ...mockApiPhoto, id: 2 },
        { ...mockApiPhoto, id: 3 },
      ];

      const result = photosAdapter(apiPhotos);

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(result[2].id).toBe(3);
      result.forEach((photo) => {
        expect(photo).toHaveProperty('picsumUrl');
      });
    });

    it('debe retornar un array vacío cuando se pasa un array vacío', () => {
      const result = photosAdapter([]);
      expect(result).toHaveLength(0);
      expect(Array.isArray(result)).toBe(true);
    });

    it('debe preservar todas las propiedades transformadas', () => {
      const apiPhotos: PhotoApiResponse[] = [
        {
          id: 100,
          albumId: 10,
          title: 'Custom Title',
          url: 'https://custom.url',
          thumbnailUrl: 'https://custom.thumbnail',
        },
      ];

      const result = photosAdapter(apiPhotos);

      expect(result[0].id).toBe(100);
      expect(result[0].albumId).toBe(10);
      expect(result[0].title).toBe('Custom Title');
      expect(result[0].url).toBe('https://custom.url');
      expect(result[0].thumbnailUrl).toBe('https://custom.thumbnail');
    });
  });
});

