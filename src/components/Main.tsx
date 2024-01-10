import Image from "next/image";
import mainImage from "../../public/images/mainBg.png";

export default function Main() {
  return (
    <div>
      <Image
        className="w-full opacity-[50%]"
        src={mainImage}
        alt="Picture of the author"
        //   width={30}
        //   height={30}
        priority
      />
    </div>
  );
}
