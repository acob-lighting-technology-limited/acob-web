'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface CategorySearchProps {
  initialSearch: string;
}

export function CategorySearch({ initialSearch }: CategorySearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('search', searchQuery);
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    router.push(pathname);
  };

  return (
    <div className="relative w-full sm:w-auto sm:min-w-[400px] flex gap-2">
      <div className="relative flex-1">
        <Input
          type="search"
          name="search"
          aria-label="Search projects"
          autoComplete="off"
          placeholder="Search projects…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="h-11 pl-10 pr-10 bg-background border-2 focus:border-primary transition duration-300"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
            type="button"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      <Button onClick={handleSearchSubmit} size="lg" className="h-11 px-6">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
