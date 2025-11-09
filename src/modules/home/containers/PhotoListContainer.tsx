import { usePhotos } from '../queries/usePhotos';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';
import { PhotoList } from '../components/PhotoList';

export const PhotoListContainer = () => {
  const { data: photos = [], isLoading, error } = usePhotos();
  const theme = useThemeStore((state) => state.theme);

  const textClass = theme === 'dark' ? 'text-white' : 'text-dark';

  // Patron container, para traer los datos y pasarlo al componente
  // y el componente se encarga de la logica y el renderizado
  
  return (
    <PhotoList
      photos={photos}
      isLoading={isLoading}
      error={error}
      textClass={textClass}
    />
  );
};

