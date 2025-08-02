'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { AdminPost } from '@/lib/types';
import { safeFetch } from '@/lib/utils/safe-fetch';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return; // Still loading session
    if (!session) {
      // If no session, redirect to login
      router.push('/admin/login');
      return;
    }
    // If session exists, fetch posts
    fetchPosts();
  }, [session, status, router]);

  const fetchPosts = async () => {
    setLoading(true);
    setFetchError(null); // Clear previous errors
    try {
      const result = await safeFetch<AdminPost[]>('/api/admin/posts', {
        fallbackData: [],
        retries: 2,
      });

      if (result.isOffline) {
        setFetchError(
          'You are offline. Please check your internet connection.'
        );
        setPosts([]);
      } else if (result.error) {
        setFetchError(result.error);
        setPosts([]);
      } else {
        setPosts(result.data || []);
      }
    } catch (error: unknown) {
      console.error('Error fetching posts:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Could not load posts.';
      setFetchError(errorMessage);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const result = await safeFetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
        retries: 2,
      });

      if (result.isOffline) {
        alert(
          'You are offline. Please check your internet connection and try again.'
        );
        return;
      }

      if (result.error) {
        alert(`Error deleting post: ${result.error}`);
        return;
      }

      // Re-fetch posts after successful deletion
      fetchPosts();
    } catch (error: unknown) {
      console.error('Error deleting post:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error deleting post: ${errorMessage}`);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <Container className="py-8">
        <div className="text-center text-gray-600">Loading posts...</div>
      </Container>
    );
  }

  if (!session) {
    // This case should be handled by the router.push above, but as a fallback
    return (
      <Container className="py-8">
        <div className="text-center text-red-500">
          Access Denied. Please log in.
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Updates Management</h1>{' '}
        {/* Renamed title */}
        <Link href="/admin/posts/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Update {/* Renamed button text */}
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Updates</CardTitle> {/* Renamed title */}
        </CardHeader>
        <CardContent>
          {fetchError && (
            <p className="text-red-500 text-center mb-4">{fetchError}</p>
          )}
          <div className="space-y-4">
            {Array.isArray(posts) && posts.length > 0
              ? posts.map((post: AdminPost) => (
                  <div
                    key={post._id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(post.publishedAt).toLocaleDateString()} •{' '}
                        {post.author}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/updates/${post.slug.current}`}>
                        {' '}
                        {/* Changed link to /updates */}
                        <Button size="sm" variant="outline" title="View Update">
                          {' '}
                          {/* Renamed title */}
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/posts/${post._id}`}>
                        <Button size="sm" variant="outline" title="Edit Update">
                          {' '}
                          {/* Renamed title */}
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post._id)}
                        title="Delete Update"
                      >
                        {' '}
                        {/* Renamed title */}
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              : !loading &&
                !fetchError && (
                  <p className="text-center text-gray-500">
                    No update posts found. Create a new one!
                  </p>
                )}{' '}
            {/* Renamed message */}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
