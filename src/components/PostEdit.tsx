"use client";
import useSWR from "swr";
import Image from "next/image";
import { ChangeEvent, DragEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "./ui/Input";
import Select from "./ui/Select";
import MarkdownEditor from "./ui/MarkdownEditor";
import FilesIcon from "./icons/FilesIcon";
import { Post } from "@/model/post";

export default function PostEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Category");
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { data: posts, isLoading: loading } = useSWR("/api/posts");
  const categories = [
    ...new Set(posts?.map((post: Post) => post.category) as string[]),
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    if (!file || title == null || category == null) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content ?? "");
    formData.append("description", description ?? "");
    formData.append("category", category);
    formData.append("file", file);

    fetch("/api/posts", { method: "POST", body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setDisabled(false));
  };

  const handleSelected = (e: FormEvent<HTMLLIElement>, value: string) => {
    e.stopPropagation();
    setCategory(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <div className="flex gap-4">
        <Select
          value={category}
          options={categories}
          onChange={handleSelected}
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <input
        className="hidden"
        name="input"
        id="input-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        className={`w-full h-32 flex flex-col items-center justify-center ${
          !file && "border-2 border-sky-500 border-dashed"
        }`}
        htmlFor="input-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragging && (
          <div className="absolute inset-0 z-10 pointer-events-none bg-sky-500/20" />
        )}
        {!file && (
          <div className="flex flex-col items-center gap-4 pointer-events-none">
            <FilesIcon />
            <span className="text-sm">
              Drag and Drop your image here or click
            </span>
          </div>
        )}
        {file && (
          <div className="relative w-full aspect-square">
            <Image
              className="object-cover"
              src={URL.createObjectURL(file)}
              alt="local file"
              fill
              sizes="650px"
            />
          </div>
        )}
      </label>

      <MarkdownEditor
        height={450}
        value={content}
        onChange={(newValue = "") => setContent(newValue)}
      />
      <div className="flex justify-end w-full">
        <button
          type="submit"
          className="py-[0.35rem] px-4 text-sm rounded-md text-white bg-[#1f883d] hover:cursor-pointer"
          disabled={disabled}
        >
          Save page
        </button>
      </div>
    </form>
  );
}
