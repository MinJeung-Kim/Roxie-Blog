import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
      <Link href="/">
        <h1 className="text-3xl font-bold">{"Roxie's Blog"}</h1>
      </Link>
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
