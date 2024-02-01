import path from "path";
import { cache } from "react";
import { readFile } from "fs/promises";
import { client } from "./sanity";

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  description: string;
  featured: boolean;
  path: string;
  title: string;
};

// Intersection Type
export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

// ✨비즈니스 로직을 따로 함수로 사용하면 좋은 점.!!
// getAllPosts() : 비동기 함수
//  - Post데이터의 배열을 반환하는 Promise를 리턴.
//  - 어플리케이션에 필요한 형태로 가공해서 반환.
//  - 어떤 데이터인지 타입을 명확하게 정의 가능.
//  - 사용하는 곳에서도 타입을 안전하게 사용가능.
//  - 타입의 안전성때문에 전반적으로 안전성이 높아짐.

export async function getFeaturedPosts(): Promise<Post[]> {
  // return getAllPosts() //
  //   .then((posts) => posts.filter((post) => post.featured));
  return client.fetch(`
  *[_type =="post" && (featured == true || defined(featured))] | order(_createdAt desc){ "id": _id, "createdAt": _createdAt,
    "updatedAt": _updatedAt, category, description, featured, path, title }`);
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return client.fetch(`
  *[_type =="post" && (featured == false || !defined(featured))] | order(_createdAt desc){ "id": _id, "createdAt": _createdAt,
    "updatedAt": _updatedAt, category, description, featured, path, title }`);
}

// cache : 호출하는 인자가 동일하다면 cache된 값을 반환하기 때문에 여러번 서버와 통신하지 않는다.
// 단, 한번의 렌더링에 한해서 제한된다.
//  => 한 페이지에서 여러개의 컴포넌트에서 동일한 인자로 호출할 때 적용됨.
export const getAllPosts = cache(async () => {
  return client.fetch(`
  *[_type =="post"] | order(_createdAt desc){ "id": _id, "createdAt": _createdAt,
    "updatedAt": _updatedAt, category, description, featured, path, title }`);
});

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post: Post) => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  // 현재 post의 위치
  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  // 이전 post가 있다면 ? 이전 post 노출, 없다면 null
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  const content = await readFile(filePath, "utf-8");

  return { ...post, content, next, prev };
}
