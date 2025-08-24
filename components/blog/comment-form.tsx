'use client';

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          comment,
          postId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit comment');
      }

      setSuccess(
        'Comment submitted successfully! It will appear after moderation.'
      );
      setName('');
      setEmail('');
      setComment('');
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-12 ">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6">Leave A Reply</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="bg-transparent border border-zinc-300 dark:border-white/10 focus-visible:ring-1 focus-visible:ring-primary/50 focus:border-primary/50 focus-visible:outline-none rounded-lg placeholder:text-zinc-400 transition-colors"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-transparent border border-zinc-300 dark:border-white/10 focus-visible:ring-1 focus-visible:ring-primary/50 focus:border-primary/50 focus-visible:outline-none rounded-lg placeholder:text-zinc-400 transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={6}
              placeholder="Write your comment..."
              className="bg-transparent border border-zinc-300 dark:border-white/10 focus-visible:ring-1 focus-visible:ring-primary/50 focus:border-primary/50 focus-visible:outline-none rounded-lg placeholder:text-zinc-400 transition-colors"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Post Comment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
