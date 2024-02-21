"use client";
import EyeIcon from "@/components/icons/EyeIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import ShareSocialIcon from "@/components/icons/ShareSocialIcon";
import { getFindPostById } from "@/service/posts";

type Props = {
  id: string;
};

const ICON_CLASS =
  "hover:text-yellow-500 transition-colors duration-[0.3s] cursor-pointer";

export default function PostTocIcons({ id }: Props) {
  // async function handleUpdate() {
  //   const result = await getFindPostById(id);
  //   console.log("handleUpdate : ", result);
  // }

  return (
    <div className="flex items-center justify-between w-[60%] text-[1.5rem]">
      <LikeIcon className={ICON_CLASS} />
      <EyeIcon className={ICON_CLASS} />
      <ShareSocialIcon className={ICON_CLASS} />
      {/* <div onClick={handleUpdate}> */}
      <div>
        <PencilIcon className={ICON_CLASS} />
      </div>
    </div>
  );
}
