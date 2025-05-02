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
  // Verificamos si el usuario existe mediante el username
  const user = await getProfileByUsername(params.username);
  if (!user) return;  // Si no existe, no generamos metadatos

  // Devolvemos los metadatos con el nombre y la bio del usuario
  return {
    title: `${user.name ?? user.username}`, // Usamos el nombre o el username
    description: user.bio || `Check out ${user.username}'s profile.`, // Usamos la bio o un fallback
  };
}

// Página del perfil que obtiene la información desde el servidor
async function ProfilePageServer({ params }: { params: { username: string } }) {
  // Verificamos si el usuario existe usando el username de los parámetros
  const user = await getProfileByUsername(params.username);

  if (!user) {
    notFound();  // Si no existe, mostramos la página 404
  }

  // Obtenemos las publicaciones, las publicaciones que le gustan al usuario y si está siendo seguido
  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  // Renderizamos el componente de cliente con los datos obtenidos
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
