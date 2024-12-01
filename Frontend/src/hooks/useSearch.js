import { useState } from 'react';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    handleSearch,
  };
};