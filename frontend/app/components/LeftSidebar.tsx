import Link from "next/link";
import { FaGlobe, FaJs, FaReact, FaUser } from "react-icons/fa";

// タグ情報の型定義
interface TagData {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

// フォロー中のタグ (表示したいタグだけを指定)
const followedTags: TagData[] = [
  {
    name: "javascript",
    href: "/tags/javascript",
    icon: FaJs,
    color: "text-yellow-500",
  },
  {
    name: "react",
    href: "/tags/react",
    icon: FaReact,
    color: "text-blue-500",
  },
  {
    name: "webdev",
    href: "/tags/webdevelopment",
    icon: FaGlobe,
    color: "text-green-500",
  },
];

// 左サイドバーのコンテンツ
export const LeftSidebar = () => {
  return (
    <div className="w-full sm:w-1/4 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-2 sm:order-none">
      <h2 className="font-bold text-lg">フォロー中のタグ</h2>
      <ul className="mt-2">
        {/* フォロー中のタグのみをmapで処理 */}
        {followedTags.map((tag) => (
          <Link key={tag.href} href={`/tags/${tag.name}`}>
            <li className="flex items-center hover:underline cursor-pointer">
              <tag.icon className={`mr-2 ${tag.color}`} />
              {tag.name}
            </li>
          </Link>
        ))}
      </ul>

      {/* ユーザーランキングセクション */}
      <h2 className="font-bold text-lg mt-6">ユーザーランキング</h2>
      <ul className="mt-2">
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー1
        </li>
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー2
        </li>
        <li className="flex items-center hover:underline">
          <FaUser className="mr-2 text-gray-500" /> ユーザー3
        </li>
      </ul>
    </div>
  );
};
