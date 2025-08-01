'use client';

import type React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client'; // Import urlFor to display images

interface EditUpdatePostClientProps {
  id: string;
}

const EXCERPT_MAX_LENGTH = 200;

export function EditUpdatePostClient({ id }: EditUpdatePostClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [currentFeaturedImageUrl, setCurrentFeaturedImageUrl] = useState<
    string | null
  >(null);
  const [statusValue, setStatusValue] = useState('draft');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Function to auto-generate slug
  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
      .replace(/[\s_-]+/g, '-') // Replace spaces/underscores/multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/posts?id=${id}`); // Fetch by ID
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const post = await response.json();
        setTitle(post.title);
        setSlug(post.slug.current);
        setExcerpt(post.excerpt);
        // PortableText content needs to be converted back to plain string for textarea
        setContent(
          post.content
            .map((block: any) =>
              block.children.map((span: any) => span.text).join('')
            )
            .join('\n\n')
        );
        setTags(post.tags ? post.tags.join(', ') : '');
        setStatusValue(post.status);
        if (post.featuredImage) {
          setCurrentFeaturedImageUrl(urlFor(post.featuredImage).url());
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load post data.');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchPost();
    }
  }, [id, session]);

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <Container className="py-8">
        <div>Loading authentication...</div>
      </Container>
    );
  }
  if (!session) {
    router.push('/admin/login');
    return null;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExcerpt = e.target.value;
    if (newExcerpt.length <= EXCERPT_MAX_LENGTH) {
      setExcerpt(newExcerpt);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (excerpt.length > EXCERPT_MAX_LENGTH) {
      setError(
        `Excerpt exceeds maximum length of ${EXCERPT_MAX_LENGTH} characters.`
      );
      setLoading(false);
      return;
    }

    let featuredImageUpdate = undefined; // Default to no change

    if (featuredImageFile) {
      try {
        const formData = new FormData();
        formData.append('file', featuredImageFile);

        const uploadResponse = await fetch('/api/admin/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Failed to upload new image');
        }
        const uploadResult = await uploadResponse.json();
        featuredImageUpdate = {
          _type: 'image',
          asset: {
            _ref: uploadResult.assetId,
            _type: 'reference',
          },
        };
      } catch (uploadError: any) {
        setError(
          uploadError.message || 'An error occurred during image upload.'
        );
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug, // Slug is not typically updated via patch, but included for completeness
          excerpt,
          content: [
            { _type: 'block', children: [{ _type: 'span', text: content }] },
          ],
          tags: tags.split(',').map(tag => tag.trim()),
          status: statusValue,
          featuredImage: featuredImageUpdate, // Only send if a new image was uploaded
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      setSuccess('Update post updated successfully!'); // Renamed success message
      router.push('/admin'); // Redirect to admin dashboard after update
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div>Loading post...</div>
      </Container>
    );
  }

  return (
    <Container className="py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Edit Update Post</h1>{' '}
        {/* Renamed title */}
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} readOnly required />
            </div>
            <div>
              <Label htmlFor="excerpt">
                Excerpt ({excerpt.length}/{EXCERPT_MAX_LENGTH} characters)
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={handleExcerptChange}
                rows={3}
                maxLength={EXCERPT_MAX_LENGTH}
                required
                className={
                  excerpt.length > EXCERPT_MAX_LENGTH ? 'border-red-500' : ''
                }
              />
              {excerpt.length > EXCERPT_MAX_LENGTH && (
                <p className="text-red-500 text-sm mt-1">
                  Excerpt exceeds maximum length.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={10}
                required
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="e.g., solar, energy, news"
              />
            </div>
            <div>
              <Label htmlFor="featuredImage">Featured Image</Label>
              {currentFeaturedImageUrl && (
                <div className="mb-4 relative w-48 h-32 rounded-md overflow-hidden">
                  <Image
                    src={currentFeaturedImageUrl || '/placeholder.svg'}
                    alt="Current Featured Image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Input
                id="featuredImage"
                type="file"
                onChange={e =>
                  setFeaturedImageFile(e.target.files?.[0] || null)
                }
              />
              {currentFeaturedImageUrl && (
                <p className="text-sm text-gray-500 mt-1">
                  Leave blank to keep current image.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusValue}
                onChange={e => setStatusValue(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
