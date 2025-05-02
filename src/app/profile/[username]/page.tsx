import { notFound } from "next/navigation";
import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import ProfilePageClient from "./ProfilePageClient";

// Página del perfil
async function ProfilePageServer({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);

  // Si el usuario no existe, muestra la página 404
  if (!user) notFound();

  // Obtener las publicaciones, publicaciones favoritas y si está siendo seguido
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  // Renderiza el componente de cliente con los datos obtenidos
  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}

export default ProfilePageServer;
