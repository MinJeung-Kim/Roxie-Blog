import { cache } from "react";
import { assetsURL, client, urlFor } from "./sanity";
import { Post, PostData } from "@/model/post";

const simplePostProjection = `
...,
"id": _id, 
"image": photo,
"createdAt": _createdAt, 
"updatedAt": _updatedAt 
`;

export const getAllPosts = cache(async () => {
  return client
    .fetch(
      `
  *[_type =="post"] | order(_createdAt desc){category, ${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: Post) => ({ ...post, image: urlFor(post.image) }))
    );
});

export async function getPostData(postId: string): Promise<PostData> {
  const posts = await getAllPosts();
  const post = posts.find((post: Post) => post.id === postId);

  if (!post) throw new Error(`${postId}에 해당하는 포스트를 찾을 수 없음`);

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length - 1 ? posts[index + 1] : null;

  return { ...post, next, prev };
}

export async function getFindPostById(postId: string): Promise<PostData> {
  return client
    .fetch(
      `*[_type =="post" && _id == "${postId}"][0]{${simplePostProjection}}`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function createPost(
  title: string,
  description: string,
  content: string,
  category: string,
  file: Blob
) {
  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-type": file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create({
        _type: "post",
        title,
        description,
        content,
        category,
        photo: { asset: { _ref: result.document._id } },
        // autoGenerateArrayKeys: true,
      });
    });
}
