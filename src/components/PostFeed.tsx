"use client";


// components/PostFeed.tsx
import dynamic from "next/dynamic";
import { Post } from "../types/post"; // Adjust the path to where the Post type is defined


const PostCard = dynamic(() => import("./PostCard"), { ssr: false });

export default function PostFeed({ initialPosts, dbUserId }: { initialPosts: Post[]; dbUserId: string | null }) {
  return (
    <div className="space-y-4">
      {initialPosts.map((post) => (
        <PostCard
          key={post.id}
          post={{
            ...post,
            author: post.author || "",
            image: post.image || null,
            updatedAt: post.updatedAt || new Date(),
            authorId: post.author?.id || "",
          }}
          dbUserId={dbUserId}
        />
      ))}
    </div>
  );
}
