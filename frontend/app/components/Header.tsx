"use client";

import { FaBell, FaPlus, FaUser } from "react-icons/fa";
import { MdOutlineSearch } from 'react-icons/md';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UseFetchName from '../_components/hooks/UseFetchName'
import Logout from '../_components/hooks/Logout'

const Header = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 検索バーの表示状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ユーザーメニューの表示状態を管理

  const { name, error ,id} = UseFetchName();
  // クリックで通知欄の表示/非表示を切り替える
  const toggleNotification = () => {
    setIsVisible(!isVisible);
  };

  // 検索バーの表示/非表示を切り替える
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // メニューの表示/非表示を切り替える
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            className="text-3xl cursor-pointer lg:hidden"
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

          {name && (  // name が存在する場合にアイコンを表示
            <>
              <FaBell
                className="text-xl cursor-pointer mx-2"
                onClick={toggleNotification}
                size={30} color={'yellow'}
              />
              <FaUser
                className="text-xl cursor-pointer"
                onClick={toggleMenu} // クリックでメニュー表示をトグル
                size={30}
              />
              {/* トグルメニュー */}
              {isMenuOpen && (
                <div className="absolute right-0 top-14 w-48 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="/mypage">マイページ</Link>
                    </li>
                    <li>
                      <button onClick={Logout} className="text-left w-full">ログアウト</button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {!name && (  // name が存在しない場合にログインボタンを表示
            <Link href="/login">
              <button
                className="bg-orange-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
              >
                <FaPlus />
                ログイン
              </button>
            </Link>
          )}
          
          {name && (  // name が存在する場合に投稿ボタンを表示
            <Link href="/post">
              <button className="bg-green-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex">
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
