import type { Photo } from '../types/photo.types';
import { SearchBar } from './SearchBar';
import { VirtualizedList } from './VirtualizedList';
import { PhotoListSkeleton } from './PhotoListSkeleton';
import { ErrorMessage } from '@/shared/components/ErrorMessage/ErrorMessage';
import { usePhotoSearch } from '../hooks/usePhotoSearch';

type PhotoListProps = {
  photos: Photo[];
  isLoading: boolean;
  error: Error | null;
  textClass: string;
};

export const PhotoList = ({
  photos,
  isLoading,
  error,
  textClass,
}: PhotoListProps) => {
  
  // Custom hook que maneja la logica de la busqueda y filtrado de fotos
  const { filteredPhotos, searchTerm, setSearchTerm } = usePhotoSearch(photos);

  // Skeleton loading
  if (isLoading) {
    return (
      <div className='pt-4 lg:pt-8 px-4 lg:px-8 '>
        <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${textClass}`}>
          Cargando fotos...
        </h2>
        <PhotoListSkeleton />
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className={textClass}>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Fotos</h2>
        <ErrorMessage message="Error al cargar las fotos. Por favor, intenta nuevamente." />
      </div>
    );
  }

  // Renderizado de la lista de fotos
  return (
    <div className='pt-4 lg:pt-8 px-4 lg:px-8 ' >
      <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${textClass}`}>
        Fotos <span className="sr-only">({filteredPhotos.length} {filteredPhotos.length === 1 ? 'foto' : 'fotos'})</span>
        <span aria-hidden="true">({filteredPhotos.length})</span>
      </h2>
      
      <SearchBar onSearchChange={setSearchTerm} />
      
      {filteredPhotos.length > 0 ? (
        <VirtualizedList photos={filteredPhotos} searchTerm={searchTerm} />
      ) : (
        <div className={`text-center py-6 sm:py-8 ${textClass}`} role="status" aria-live="polite">
          <p className="text-sm sm:text-base">
            No se encontraron fotos con ese término de búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

