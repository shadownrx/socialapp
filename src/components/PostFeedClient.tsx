"use client";

import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/post.action";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

export default function PostFeedClient({
  posts,
  dbUserId,
}: {
  posts: Post[];
  dbUserId: string | null;
}) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}
