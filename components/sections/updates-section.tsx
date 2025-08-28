'use client';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getUpdatePosts } from '@/sanity/lib/client';
import Image from 'next/image';
import type { UpdatePost } from '@/lib/types';

export function UpdatesSection() {
  const [posts, setPosts] = useState<UpdatePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getUpdatePosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const latestPosts = posts.slice(0, 3); // Get only the latest 3 posts

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-700">
        <Container className="px-4">
          <div className="text-center">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto max-w-md mb-4" />
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto max-w-2xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-700">
      <Container className="px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 dark:bg-primary/20 dark:text-primary transition-colors duration-700">
            News & Announcements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold  text-zinc-900 dark:text-white transition-colors duration-700">
            Recent Updates
          </h2>{' '}
          {/* Renamed title */}
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post: UpdatePost, index: number) => (
            <Card
              key={post._id}
              className={`overflow-hidden hover:shadow-lg border-0 custom-shadow transition-shadow relative py-0 flex flex-col ${
                index === 2 ? 'border-b-4 border-b-primary' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      No image available
                    </span>
                  </div>
                )}
                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                  {post.category || 'News'}
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1 h-full">
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-bold dark:text-zinc-300 text-zinc-900 mb-3 leading-tight">
                    {post.title}
                  </h3>

                  {/* Date and Author */}
                  <div className="flex items-center text-sm dark:text-zinc-400 text-zinc-600 mb-4">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Button */}
                <div className="mt-auto pt-6">
                  <Link href={`/updates/${post.slug.current}`}>
                    {' '}
                    {/* Changed link to /updates */}
                    <Button className="bg-transparent dark:bg-primary  border-[0.5px] border-primary dark:text-zinc-300 text-zinc-700 hover:bg-primary hover:text-white transition-colors duration-500">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/updates">
            {' '}
            {/* Changed link to /updates */}
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
