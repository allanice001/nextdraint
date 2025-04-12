"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { likeArtwork, unlikeArtwork } from "@/app/actions/artwork";

interface ArtworkActionsProps {
  artwork: {
    id: string;
    title: string;
    isLiked?: boolean;
    likesCount: number;
  };
}

export function ArtworkActions({ artwork }: ArtworkActionsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(artwork.isLiked || false);
  const [likesCount, setLikesCount] = useState(artwork.likesCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    if (!session) {
      router.push(`/login?callbackUrl=/artwork/${artwork.id}`);
      return;
    }

    setIsLoading(true);
    try {
      if (isLiked) {
        await unlikeArtwork(artwork.id);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await likeArtwork(artwork.id);
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
        toast.success(`You liked "${artwork.title}"`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLikeToggle}
      disabled={isLoading}
      className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
    >
      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-white" : ""}`} />
      {likesCount > 0 ? likesCount : ""} {isLiked ? "Liked" : "Like"}
    </Button>
  );
}
