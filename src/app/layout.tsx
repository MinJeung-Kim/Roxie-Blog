import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";
import Footer from "@/components/Footer";

const sans = Open_Sans({ subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: '록시의 블로그',
    template:'록시의 블로그 | %s'
  },
  description: "프론트엔드 개발자 록시의 블로그",
  icons:{
    icon:'/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full max-w-screen-2xl mx-auto">
        <Header />
        {/* grow : 부모컨테이너를 가득 채움. */}
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
