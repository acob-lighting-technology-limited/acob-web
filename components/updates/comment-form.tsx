'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { QUERY_KEYS } from '@/lib/query-keys';

interface CommentFormProps {
  postId: string;
  /** When true, renders without the outer Card wrapper (for embedding inside another card) */
  inline?: boolean;
}

interface CommentPayload {
  name: string;
  email: string;
  comment: string;
  postId: string;
}

async function submitComment(payload: CommentPayload) {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit comment');
  }

  return response.json();
}

function FormContent({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: submitComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.comments(postId) });
      toast.success('Comment submitted! It will appear after moderation.');
      setName('');
      setEmail('');
      setComment('');
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, comment, postId });
  };

  const fieldClass =
    'bg-transparent border border-zinc-300 dark:border-white/10 focus-visible:ring-1 focus-visible:ring-primary/50 focus:border-primary/50 focus-visible:outline-none placeholder:text-zinc-400 transition-colors rounded-lg';

  return (
    <>
      <div className="mb-6 border-t border-border pt-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          Leave a Reply
        </h3>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-primary/30 bg-primary/5 py-10 text-center rounded-xl">
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <p className="font-semibold text-foreground">Comment received!</p>
          <p className="text-sm text-muted-foreground">
            Your comment will appear here once it has been reviewed.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="update-comment-name">Name</Label>
              <Input
                id="update-comment-name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className={fieldClass}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="update-comment-email">Email</Label>
              <Input
                id="update-comment-email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="update-comment-text">Comment</Label>
            <Textarea
              id="update-comment-text"
              name="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              rows={5}
              placeholder="Share your thoughts..."
              className={fieldClass}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground sm:w-auto"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              Your email won&apos;t be published. Comments are reviewed before
              appearing.
            </p>
          </div>
        </form>
      )}
    </>
  );
}

export function CommentForm({ postId, inline = false }: CommentFormProps) {
  if (inline) {
    return <FormContent postId={postId} />;
  }

  return (
    <div className="mt-8 rounded-xl border border-border p-4 sm:mt-12 sm:p-6 xl:p-8">
      <FormContent postId={postId} />
    </div>
  );
}
