import ContactForm from "@/components/ContactForm";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";

export default function ContactPage() {
  const LINKS = [
    { icon: <AiFillGithub />, url: "https://github.com/MinJeung-Kim" },
    { icon: <AiFillLinkedin />, url: "" },
    { icon: <AiFillYoutube />, url: "" },
  ];
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-2">Contact ME</h2>
      <p>focso5@gmail.com</p>
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
      <h2 className="text-3xl font-bold my-8">Or Send mean email</h2>
      <ContactForm />
    </section>
  );
}
