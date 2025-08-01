'use client';

import type React from 'react';
import { useState, useCallback } from 'react';
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

const EXCERPT_MAX_LENGTH = 200;

export default function NewUpdatePostPage() {
  // Renamed component
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [statusValue, setStatusValue] = useState('draft');
  const [loading, setLoading] = useState(false);
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

    let featuredImageRef = null;
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
          throw new Error(errorData.error || 'Failed to upload image');
        }
        const uploadResult = await uploadResponse.json();
        featuredImageRef = {
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
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content: [
            { _type: 'block', children: [{ _type: 'span', text: content }] },
          ], // Simple block content
          tags: tags.split(',').map(tag => tag.trim()),
          status: statusValue,
          author: session.user?.name || 'Admin', // Use session user name
          featuredImage: featuredImageRef,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }

      setSuccess('Update post created successfully!'); // Renamed success message
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setTags('');
      setFeaturedImageFile(null);
      setStatusValue('draft');
      router.push('/admin'); // Redirect to admin dashboard after creation
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-8 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Update Post</h1>{' '}
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
              <Input
                id="featuredImage"
                type="file"
                onChange={e =>
                  setFeaturedImageFile(e.target.files?.[0] || null)
                }
              />
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
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
