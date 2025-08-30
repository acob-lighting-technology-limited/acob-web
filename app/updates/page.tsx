'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
// Remove direct Sanity import - use API route instead
import type { UpdatePost } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function UpdatesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [posts, setPosts] = useState<UpdatePost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<UpdatePost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Show 8 posts per page

  // Initialize from URL
  useEffect(() => {
    const q = params.get('q') ?? '';
    const pageStr = params.get('page');
    const page = pageStr ? Math.max(1, parseInt(pageStr, 10) || 1) : 1;
    setSearchQuery(q);
    setCurrentPage(page);

  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/updates');
        if (!response.ok) {
          throw new Error('Failed to fetch updates');
        }
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error('Error fetching posts:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by search
  useEffect(() => {
    const query = (searchQuery || '').trim().toLowerCase();
    if (!query) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post: UpdatePost) => {
      const title = post.title?.toLowerCase() || '';
      const excerpt = post.excerpt?.toLowerCase() || '';
      const author = post.author?.toLowerCase() || '';
      const category =
        (post.category as string | undefined)?.toLowerCase?.() || '';
      return (
        title.includes(query) ||
        excerpt.includes(query) ||
        author.includes(query) ||
        category.includes(query)
      );
    });

    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  // Keep URL in sync
  useEffect(() => {
    const sp = new (globalThis as any).URLSearchParams(params.toString());
    if (searchQuery) {sp.set('q', searchQuery);}
    else {sp.delete('q');}
    if (currentPage && currentPage !== 1) {sp.set('page', String(currentPage));}
    else {sp.delete('page');}
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }, [searchQuery, currentPage, pathname, router]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = useMemo(
    () => filteredPosts.slice(startIndex, endIndex),
    [filteredPosts, startIndex, endIndex],
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Updates' }];



  return (
    <>
      <PageHero
        title="Updates & News"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search Results Info */}
            {searchQuery && (
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} result
                  {filteredPosts.length !== 1 ? 's' : ''} found for "
                  {searchQuery}"
                </p>
              </div>
            )}

            {/* Posts Grid */}
            {currentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentPosts.map((post: UpdatePost) => (
                    <Card
                      key={post._id}
                      className="overflow-hidden p-0 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      <div className="aspect-[16/9] overflow-hidden flex-shrink-0">
                        <Image
                          src={post.featuredImage || '/placeholder.svg'}
                          alt={post.title}
                          width={1200}
                          height={675}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="!pt-0 p-6 flex flex-col flex-1">
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-muted-foreground mb-4">
                            <span>{post.author}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold mb-4 text-foreground line-clamp-2 h-[50px]">
                          {post.title}
                          </h2>
                          <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-[3]">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <Link href={`/updates/${post.slug?.current || '#'}`}>
                            <Button className="w-full">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <div className="text-sm text-muted-foreground text-center mb-4">
                      Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            size="default"
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => goToPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                  size="default"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            size="default"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse all updates.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Search Updates</h3>
                <div className="relative">
                  <Input
                    placeholder="Search updates..."
                    className="pr-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="!border-t-2 !border-t-primary border border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Browse Categories</h3>
                <div className="space-y-2">
                  <Link
                    href="/updates/case-studies"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/updates/press"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Press Releases
                  </Link>
                  <Link
                    href="/updates/latest"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Latest Updates
                  </Link>
                  <Link
                    href="/updates/gallery"
                    className="block p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 text-sm font-medium border border-border"
                  >
                    Gallery
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </Container>
    </>
  );
}
