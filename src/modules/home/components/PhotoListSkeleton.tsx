import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

export const PhotoListSkeleton = () => {
  const theme = useThemeStore((state) => state.theme);
  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-md">
          <div className={`aspect-square ${bgClass} animate-pulse`}></div>
          <div className="p-2 sm:p-3">
            <div className={`h-3 sm:h-4 ${bgClass} rounded mb-2 animate-pulse`}></div>
            <div className={`h-2 sm:h-3 w-16 sm:w-20 ${bgClass} rounded animate-pulse`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

