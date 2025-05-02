export interface Post {
    id: string;
    content: string;
    createdAt: Date;
    author: {
      id: string;
      image: string | null;
      username: string;
      name: string | null;
    };
    comments: {
      id: string;
      authorId: string;
      content: string;
      createdAt: Date;
      postId: string;
      author: {
        id: string;
        image: string | null;
        username: string;
        name: string | null;
      };
    }[];
    likes: {
      id: string;
      userId: string;
      postId: string;
    }[];
    _count: {
      comments: number;
      likes: number;
    };
  }

  export interface PostUpdate {
    id: string;
    author: {
      id: string;
      image: string | null;
      username: string;
      name: string | null;
    };
    authorId: string;
    updatedAt?: Date;
    image?: string | null; // Added the 'image' property
    // other properties...
  }