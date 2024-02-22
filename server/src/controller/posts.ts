import { Request, Response } from "express";
import * as postsRepository from "../data/posts";

export async function getPosts(req: Request, res: Response): Promise<void> {
  const posts = await postsRepository.getAll();
  res.status(200).json(posts);
}

export async function getPost(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const post = await postsRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post id(${id}) not found` });
  }
  res.status(200).json(post);
}
export async function createPost(req: Request, res: Response): Promise<void> {
  //   const { title, description, category, content, image } = req.body;
  const post = postsRepository.create(req.body);
  res.status(201).json(post);
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  const postId = req.params.id;
  const post = await postsRepository.update(postId, req.body);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post id(${postId}) not found` });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  const postId = req.params.id;
  await postsRepository.remove(postId);
  res.status(204);
}
