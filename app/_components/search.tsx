'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search as SearchIcon } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

interface SearchProps {
  className?: string;
  id: string;
}

export default function Search({ className, id }: SearchProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState(params.get('query') || '');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput !== params.get('query')) {
      if (searchInput) {
        params.set('query', searchInput);
      } else {
        params.delete('query');
      }
      replace(`?${params.toString()}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchInput]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Label htmlFor={`search-input-${id}`} className="sr-only">
        Search cuisine
      </Label>
      <Input
        type="search"
        id={`search-input-${id}`}
        ref={searchInputRef}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full h-10 pl-12 pr-4 text-base border-0 rounded-none shadow-none"
        placeholder="e.g. chinese, pizza"
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        size={16}
        onClick={handleSearch}
        className="absolute left-4 top-3 hover:cursor-pointer"
      />
    </div>
  );
}
