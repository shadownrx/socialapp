// Componente de perfil cliente
import { use } from "react";
import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import ProfilePageClient from "./ProfilePageClient";

// Página del perfil
const ProfilePageClientComponent = ({ username }: { username: string }) => {
  const user = use(getProfileByUsername(username));
  if (!user) {
    return <div>User not found</div>;
  }
  const posts = use(getUserPosts(user.id));
  const likedPosts = use(getUserLikedPosts(user.id));
  const isCurrentUserFollowing = use(isFollowing(user.id));

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
};

export default ProfilePageClientComponent;
