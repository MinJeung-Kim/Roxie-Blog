import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import GithubFillIcon from "@/components/icons/GithubFillIcon";
import YoutubeFillIcon from "@/components/icons/YoutubeFillIcon";
import InstagramFillIcon from "@/components/icons/InstagramFillIcon";

export const metadata: Metadata = {
  title: "Contact Me",
  description: "Roxie에게 메일 보내기",
};

const LINKS = [
  { icon: <GithubFillIcon />, url: "https://github.com/MinJeung-Kim" },
  { icon: <InstagramFillIcon />, url: "" },
  { icon: <YoutubeFillIcon />, url: "" },
];

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center mt-[5rem]">
      <h2 className="my-2 text-3xl font-bold">Contact ME</h2>
      <ul className="flex gap-4 my-2">
        {LINKS.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-5xl hover:text-yellow-400"
          >
            {link.icon}
          </a>
        ))}
      </ul>
      <h2 className="my-8 text-3xl font-bold">Or Send mean email</h2>
      <ContactForm />
    </section>
  );
}
