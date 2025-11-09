import { useState, useTransition } from 'react';

type UseSearchBarProps = {
  onSearchChange: (value: string) => void;
};

export const useSearchBar = ({ onSearchChange }: UseSearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    startTransition(() => {
      onSearchChange(value);
    });
  };

  return {
    searchTerm,
    isPending,
    handleChange,
  };
};

