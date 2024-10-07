"use client";

import { FaBell, FaPlus } from "react-icons/fa";
import { MdOutlineSearch } from 'react-icons/md';
// import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 検索バーの表示状態を管理

  // ログイン状態をシミュレートするためにuseEffectでチェック
  useEffect(() => {
    const userLoggedIn = true; // ダミーデータ: 実際には認証サービスからのデータを使用
    setIsLoggedIn(userLoggedIn);
  }, []);

  // クリックで表示/非表示を切り替える
  const toggleNotification = () => {
    setIsVisible(!isVisible);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="border-b border-gray-300">
      {/* 上部ヘッダー */}
      <div className="flex justify-between items-center p-4 bg-blue-400 relative">
        <Link href="/">
          <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center">
            ITM
          </div>
        </Link>

        <div className="flex justify-end items-center">
          {/* モバイル向け検索アイコン */}
          <MdOutlineSearch
            className="text-3xl cursor-pointer lg:hidden" // モバイルではアイコンのみ表示
            onClick={toggleSearch}
          />
          
          {/* デスクトップ向け検索バー */}
          <div className="relative w-80 hidden lg:block">
            <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="記事、質問を検索..."
              className="w-full pl-10 p-2 border border-gray-300 rounded outline-none"
            />
          </div>

          {isLoggedIn && (
            <FaBell
              className="text-xl cursor-pointer mx-2"
              onClick={toggleNotification}
              size={30} color={'yellow'}
            />
          )}

          {isVisible && isLoggedIn && (
            <div className="absolute right-0 top-14 w-64 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
              <h3 className="font-bold border-b border-black p-0 m-0">通知</h3>
              <ul>
                <li className="pb-2">新しいメッセージがあります。</li>
                <li className="pt-2">更新があります。</li>
                <li className="pt-2">新しいコメントが投稿されました。</li>
              </ul>
            </div>
          )}

          {!isLoggedIn && (
            <button
              onClick={handleLogin}
              className="bg-orange-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
            >
              <FaPlus />
              ログイン
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
            >
              ログアウト
            </button>
          )}

          {isLoggedIn && (
            <Link href="/post">
              <button className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-2 hidden lg:flex">
                <FaPlus />
                投稿する
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 検索バー: モバイル向け、アイコンをクリックで表示 */}
      {isSearchOpen && (
        <div className="w-full px-4 py-2 bg-gray-100 border-b border-gray-300 lg:hidden">
          <input
            type="text"
            placeholder="記事、質問を検索..."
            className="w-full p-2 border border-gray-300 rounded outline-none"
          />
        </div>
      )}

      {/* 下部ナビゲーションバー */}
      <nav className="flex justify-around bg-gray-800 text-white py-2">
        <Link
          href="/"
          className={`${pathname === "/" ? "border-b-2 border-white" : ""}`}
        >
          ホーム
        </Link>

        <Link
          href="/timeline"
          className={`${pathname === "/timeline" ? "border-b-2 border-white" : ""}`}
        >
          タイムライン
        </Link>

        <Link
          href="/trend"
          className={`${pathname === "/trend" ? "border-b-2 border-white" : ""}`}
        >
          トレンド
        </Link>
      </nav>
    </header>
  );
};

export default Header;
