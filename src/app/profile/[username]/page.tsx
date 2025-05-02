import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

// Generación de metadatos para la página
export async function generateMetadata({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`, // Fallback entre nombre o username
    description: user.bio || `Check out ${user.username}'s profile.`, // Fallback en bio
  };
}

// Página del perfil que obtiene la información desde el servidor
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
