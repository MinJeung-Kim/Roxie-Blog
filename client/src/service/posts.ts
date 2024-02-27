import HttpClient from "@/network/http";

export default class PostService {
  constructor(public http: HttpClient) {
    this.http = http;
  }

  async getPosts() {
    return this.http.fetch(`/posts`, {
      method: "GET",
    });
  }

  async postPost(update: {
    title: string;
    description: string;
    category: string;
    content: string;
    image: string;
  }) {
    return this.http.fetch(`/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...update,
      }),
    });
  }

  async deletePosts(postId: string) {
    return this.http.fetch(`/posts/${postId}`, {
      method: "DELETE",
    });
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
    return this.http.fetch(`/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...update,
      }),
    });
  }
}
