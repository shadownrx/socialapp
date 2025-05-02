"use client";

import { useAuth } from "@clerk/nextjs";
import PostCard from "./PostCard";
import { getPosts } from "@/actions/post.action";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

export default function PostCardClient({ post }: { post: Post }) {
  const { userId } = useAuth();

  return <PostCard post={post} dbUserId={userId ?? null} />;
}
