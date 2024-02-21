import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import SWRConfigContext from "@/context/SWRConfigContext";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "록시의 블로그",
    template: "록시의 블로그 | %s",
  },
  description: "프론트엔드 개발자 록시의 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // className={sans.className}
    >
      <body className="flex flex-col justify-between w-full h-screen">
        <Header />
        {/* grow : 부모컨테이너를 가득 채움. */}
        <main className="w-full mx-auto grow max-w-screen-2xl">
          <SWRConfigContext>{children}</SWRConfigContext>
        </main>
        <Footer />
      </body>
    </html>
  );
}
