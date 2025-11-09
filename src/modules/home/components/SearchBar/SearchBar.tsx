import { Input } from '@/shared/components/Input/Input';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner/LoadingSpinner';
import { useSearchBar } from './useSearchBar';

type SearchBarProps = {
  onSearchChange: (value: string) => void;
};

export const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const { searchTerm, isPending, handleChange } = useSearchBar({ onSearchChange });

  return (
    <div className="relative mb-4 sm:mb-6" role="search">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar fotos..."
        className={isPending ? 'opacity-70' : 'opacity-100'}
        aria-label="Buscar fotos por título o número de álbum"
        aria-describedby={isPending ? 'search-loading' : undefined}
      />
      {isPending && (
        <div 
          id="search-loading"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          aria-hidden="true"
        >
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
};

