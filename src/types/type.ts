export type User = {
  id: string;
  username: string;
  email: string;
  picture: string;
  about: string;
};

export type UserUpdateBody = {
  username: string;
  picture: string;
  about: string;
};

export type RootState = {
  user: {
    value: User;
  };
};

export type CreatePostBody = {
  content: string;
  image: string | null;
};

export type UpdatePostBody = {
  content: string;
  image: string | null;
};

export type UpdateCommentBody = {
  content: string;
};

export type Post = {
  id: string;
  content: string;
  image: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  username: string;
  userProfilePicture: string;
  userId: string;
};

export type CommentObj = {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  picture: string;
  username: string;
};
