"use client";

import { FaBell, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ログイン状態をシミュレートするためにuseEffectでチェック
  useEffect(() => {
    // ここで実際のログイン状態を取得する処理を追加する
    const userLoggedIn = true; // ダミーデータ: 実際には認証サービスからのデータを使用
    setIsLoggedIn(userLoggedIn);
  }, []);

  // クリックで表示/非表示を切り替える
  const toggleNotification = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = () => {
    // ログイン処理を追加する
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // ログアウト処理を追加する
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

        <input
          type="text"
          placeholder="記事、質問を検索..."
          className="flex-1 mx-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-4 items-center">
          {/* ベルのアイコン: ログインしているときのみ表示 */}
          {isLoggedIn && (
            <FaBell
              className="text-xl cursor-pointer"
              onClick={toggleNotification} // クリックで通知欄をトグル
            />
          )}
          {/* 通知欄 */}
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

          {/* ログインしていないときはログインボタンを表示 */}
          {!isLoggedIn && (
            <button
              onClick={handleLogin}
              className="bg-orange-500 text-white px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
             >
              <FaPlus />
              ログイン
            </button>
          )}

          {/* ログインしている場合はログアウトボタンを表示 */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
            >
              ログアウト
            </button>
          )}

          {/* 投稿するボタンはログインしているときのみ表示 */}
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
          className={`${
            pathname === "/timeline" ? "border-b-2 border-white" : ""
          }`}
        >
          タイムライン
        </Link>

        <Link
          href="/trend"
          className={`${
            pathname === "/trend" ? "border-b-2 border-white" : ""
          }`}
        >
          トレンド
        </Link>
      </nav>
    </header>
  );
};

export default Header;
