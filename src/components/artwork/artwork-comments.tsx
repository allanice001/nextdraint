"use client";

import type React from "react";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { addComment, getComments } from "@/app/actions/comments";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

export function ArtworkComments({ artworkId }: { artworkId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments
  useState(() => {
    const fetchComments = async () => {
      try {
        const result = await getComments(artworkId);
        if (result.success) {
          setComments(result.comments);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  });

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push(`/login?callbackUrl=/artwork/${artworkId}`);
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await addComment(artworkId, newComment);
      if (result.success && result.comment) {
        setComments((prev) => [result.comment, ...prev]);
        setNewComment("");
        toast.success("Comment added");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      {session && (
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.user.image || undefined} />
                <AvatarFallback>{comment.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.user.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
            {!session && (
              <Button
                variant="link"
                onClick={() =>
                  router.push(`/login?callbackUrl=/artwork/${artworkId}`)
                }
                className="mt-2"
              >
                Log in to comment
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
