"use client";

import { FaBell, FaPlus, FaUser } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  // 現在のページのパス名を取得し、ナビゲーションバーの現在位置を強調表示するために使用
  const pathname = usePathname();

  // 状態管理：パネルやメニューの表示・非表示を管理
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ユーザーがログインしているかどうかを管理
  const [isNotification, setIsNotificationOpen] = useState(false); // 通知パネルの表示状態を管理
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 検索バーの表示状態を管理
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ユーザーメニューの表示状態を管理

  // DOM参照：通知パネルとメニューパネルのDOM要素にアクセス
  const notificationRef = useRef(null); // 通知パネルの参照
  const menuRef = useRef(null); // メニューパネルの参照

  // ログイン状態をシミュレートするために useEffect でチェック
  useEffect(() => {
    // ダミーデータ: 実際には認証サービスからのデータを使用することが一般的
    const userLoggedIn = true;
    setIsLoggedIn(userLoggedIn); // ログイン状態をセット
  }, []);

  // 通知パネルの表示/非表示を切り替える関数
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotification); // 現在の状態の反転
  };

  // 検索バーの表示/非表示を切り替える関数（モバイル向け）
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // 現在の状態の反転
  };

  // メニューの表示/非表示を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 現在の状態の反転
  };

  // メニュー外クリックでメニューを閉じる処理
  useEffect(() => {
    const handleClickOutside = (e) => {
      // メニューが開いている時にだけ、処理を行う
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false); // メニュー外をクリックされたら閉じる
      }
    };

    // ドキュメント全体にクリックイベントリスナーを追加
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // コンポーネントのクリーンアップ時にイベントリスナーを削除
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // isMenuOpenが変わるたびに処理を更新

  // 通知パネル外クリックで通知を閉じる処理
  useEffect(() => {
    const handleClickOutsideNotification = (e) => {
      // 通知パネルが開いている時にだけ処理を行う
      if (
        isNotification &&
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setIsNotificationOpen(false); // 通知パネル外をクリックされたら閉じる
      }
    };

    // ドキュメント全体にクリックイベントリスナーを追加
    document.addEventListener("mousedown", handleClickOutsideNotification);

    return () => {
      // コンポーネントのクリーンアップ時にイベントリスナーを削除
      document.removeEventListener("mousedown", handleClickOutsideNotification);
    };
  }, [isNotification]); // isNotificationが変わるたびに処理を更新

  // ログイン処理（サンプルとしてダミーの処理）
  const handleLogin = () => {
    setIsLoggedIn(true); // ログイン状態にする
  };

  // ログアウト処理（サンプルとしてダミーの処理）
  const handleLogout = () => {
    setIsLoggedIn(false); // ログアウト状態にする
  };

  return (
    <header className="border-b border-gray-300">
      {/* 上部ヘッダー：ロゴ、検索、通知、ログイン/ユーザーメニュー */}
      <div className="flex justify-between items-center p-4 bg-blue-400 relative">
        {/* ロゴ部分 */}
        <Link href="/">
          <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center">
            ITM
          </div>
        </Link>

        <div className="flex justify-end items-center">
          {/* モバイル向け検索アイコン */}
          <MdOutlineSearch
            className="text-3xl cursor-pointer lg:hidden"
            onClick={toggleSearch} // クリックで検索バーをトグル
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

          {/* 通知アイコン（ログイン中のみ表示） */}
          {isLoggedIn && (
            <div className="relactive" ref={notificationRef}>
              <FaBell
                className="text-xl cursor-pointer mx-2"
                onClick={toggleNotification} // 通知パネルのトグル処理
                size={30}
                color={"yellow"}
              />

              {/* 通知パネル（開かれている場合のみ表示） */}
              {isNotification && (
                <div className="absolute right-0 top-14 w-64 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
                  <h3 className="font-bold border-b border-black p-0 m-0">
                    通知
                  </h3>
                  <ul>
                    <li className="pb-2">新しいメッセージがあります。</li>
                    <li className="pt-2">更新があります。</li>
                    <li className="pt-2">新しいコメントが投稿されました。</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ログインしていない場合に表示されるログインボタン */}
          {!isLoggedIn && (
            <button
              onClick={handleLogin} // ログイン処理を実行
              className="bg-orange-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex"
            >
              <FaPlus />
              ログイン
            </button>
          )}

          {/* ログインしている場合に表示されるユーザーアイコンとメニュー */}
          {isLoggedIn && (
            <div className="relative" ref={menuRef}>
              <FaUser
                className="text-xl cursor-pointer"
                onClick={toggleMenu} // メニュー表示をトグル
                size={30}
              />

              {/* ユーザーメニュー（開かれている場合のみ表示） */}
              {isMenuOpen && (
                <div className="absolute right-0 top-14 w-48 bg-gray-200 border border-black shadow-lg rounded-md p-4 opacity-95">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="/mypage">マイページ</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout} // ログアウト処理を実行
                        className="text-left w-full"
                      >
                        ログアウト
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 投稿ボタン（ログイン中のみ表示） */}
          {isLoggedIn && (
            <Link href="/post">
              <button className="bg-green-500 text-white mx-2 px-3 py-2 rounded flex items-center gap-2 hidden lg:flex">
                <FaPlus />
                投稿する
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* 検索バー（モバイル向け、アイコンをクリックで表示） */}
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
        {/* 現在のパス名に基づいて現在位置を強調表示 */}
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
