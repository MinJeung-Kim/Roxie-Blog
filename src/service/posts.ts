import { readFile } from "fs/promises";
import path from "path";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
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
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getAllPosts(): Promise<Post[]> {
  // 1. file 경로 설정
  const filePath = path.join(process.cwd(), "data", "posts.json");
  // 2. promises를 반환하는 readFile 사용.
  //   -  readFile(파일경로, 인코딩)
  return (
    readFile(filePath, "utf-8")
      // 3. 데이터 파싱
      //   - 전달받는 것과 호출할때 인자가 같은 것은 생략 가능.
      //   => .then(data => JSON.parse(data))
      // 4. .then<Post[]>
      //    - JSON에서 parse되는 타입이 배열타입임을 명시.
      .then<Post[]>(JSON.parse)
      // 5. 최신 데이터로 정렬
      .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)))
  );
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

  // 현재 post의 위치
  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  // 이전 post가 있다면 ? 이전 post 노출, 없다면 null
  const prev = index < posts.length -1 ? posts[index + 1] : null; 
  const content = await readFile(filePath, "utf-8");

  return { ...post, content, next, prev };
}
