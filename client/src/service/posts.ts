export default class PostService {
  constructor(private baseURL: string) {
    this.baseURL = baseURL;
  }

  async getPosts() {
    const response = await fetch(`${this.baseURL}/posts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }

  async postPost(update: {
    title: string;
    description: string;
    category: string;
    content: string;
    image: string;
  }) {
    const response = await fetch(`${this.baseURL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...update,
      }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.message);
    }

    return data;
  }

  async deletePosts(postId: string) {
    const response = await fetch(`${this.baseURL}/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 204) {
      throw new Error(`Post postId(${postId}) not found`);
    }
  }

  async updatePost(
    postId: string,
    update: {
      title: string;
      description: string;
      category: string;
      content: string;
      image: string;
    }
  ) {
    const response = await fetch(`${this.baseURL}/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...update,
      }),
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.message);
    }

    return data;
  }
}
