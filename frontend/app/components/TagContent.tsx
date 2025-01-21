"use client";

import { useState } from "react";
import { TagData } from "../(routes)/tags/data";
import { FaGlobe, FaJs, FaReact } from "react-icons/fa";

interface TagContentProps {
  tag: TagData;
}

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  FaGlobe: FaGlobe,
  FaJs: FaJs,
  FaReact: FaReact,
};

const TagContent: React.FC<TagContentProps> = ({ tag }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const IconComponent = iconMap[tag.icon]; // アイコンコンポーネントを取得

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  if (!IconComponent) {
    return <div>Icon Not Found</div>; // アイコンが見つからない場合の処理
  }

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3 border rounded p-4 flex flex-col items-center">
        <IconComponent className={`text-6xl ${tag.color} mb-2`} /> {/* JSXとしてレンダリング */}
        <h1 className="text-2xl font-bold mb-1 text-center">{tag.name}</h1>
        <p className="text-center">{tag.description}</p>
        <button
          onClick={handleFollowClick}
          className={`mt-4 px-4 py-2 rounded font-semibold transition duration-300 ${
            isFollowing
              ? "bg-gray-500 hover:bg-red-500 text-white hover:text-white"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {isFollowing ? "フォロー中" : "フォローする"}
        </button>
      </div>
      <div className="col-span-7 border rounded p-4">{tag.content}</div>
    </div>
  );
};

export default TagContent;