"use client";

import { FaBell, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);

  // クリックで表示/非表示を切り替える
  const toggleNotification = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="border-b border-gray-300">
      {/* 上部ヘッダー */}
      <div className="flex justify-between items-center p-4 bg-blue-400">
        <Link href="/">
          <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center">
            ITM
          </div>
        </Link>

        <input
          type="text"
          placeholder="記事、質問を検索..."
          className="flex-1 mx-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-4 items-center">
          <FaBell
            className="text-xl cursor-pointer"
            onClick={toggleNotification} // クリックで通知欄をトグル
          />
          {/* 通知欄 */}
          {isVisible && (
            <div className="absolute right-0 top-14 w-64 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
              <h3 className="font-bold border-b border-black p-0 m-0">通知</h3>
              <ul>
                <li className="pb-2">新しいメッセージがあります。</li>
                <li className="pt-2">更新があります。</li>
                <li className="pt-2">新しいコメントが投稿されました。</li>
              </ul>
            </div>
          )}
          {/* 投稿するボタン */}
          <button
            className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
            onClick={handlePostClick}
          >
            <FaPlus />
            投稿する
          </Link>
        </div>
      </div>

      {/* 下部ナビゲーションバー */}
      <nav className="flex justify-around bg-gray-800 text-white py-2">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "border-b-2 border-white-500" : ""
          } `}
        >
          ホーム
        </Link>

        <Link
          href="/timeline"
          className={`${
            pathname === "/timeline" ? "border-b-2 border-white-500" : ""
          }`}
        >
          タイムライン
        </Link>

        <Link
          href="/trend"
          className={`${
            pathname === "/trend" ? "border-b-2 border-white-500" : ""
          }`}
        >
          トレンド
        </Link>
      </nav>
    </header>
  );
};

export default Header;
