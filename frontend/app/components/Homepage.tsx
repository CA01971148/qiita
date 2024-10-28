"use client";
import React from "react";
import { FaReact, FaJs, FaGlobe, FaUser } from "react-icons/fa"; // アイコンをインポート
import Link from "next/link"; // Linkコンポーネントをインポート

const HomePage = () => {
  // 左サイドバーのコンテンツ
  const LeftSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-2 sm:order-none">
        <h2 className="font-bold text-lg">フォロー中のタグ</h2>
        <ul className="mt-2">
          {/* タグのリンク一覧 */}
          <Link href="/tags/react">
            <li className="flex items-center hover:underline">
              <FaReact className="mr-2 text-blue-500" /> React
            </li>
          </Link>
          <Link href="/tags/javascript">
            <li className="flex items-center hover:underline">
              <FaJs className="mr-2 text-yellow-500" /> JavaScript
            </li>
          </Link>
          <Link href="/tags/webdevelopment">
            <li className="flex items-center hover:underline">
              <FaGlobe className="mr-2 text-green-500" /> WebDev
            </li>
          </Link>
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

  // メインコンテンツのコンポーネント
  const MainContent = () => {
    return (
      <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-1 sm:order-none">
        <h2 className="font-bold text-lg">トレンドの記事</h2>
        {/* 横向きスクロールが可能な記事リスト */}
        <div className="mt-2 overflow-x-auto">
          <div className="flex space-x-4">
            {/* 記事カードの1つ目 */}
            <div className="min-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                {/* 丸いアイコン */}
                <p className="text-gray-600 font-bold ml-2">@123456</p>
                {/* ユーザーID */}
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p> {/* 記事の日付 */}
              </div>
              <Link href="/card">
                <h2 className="text-xl font-semibold mb-2 hover:underline">
                  記事のタイトル
                </h2>
              </Link>
              {/* 記事タイトル */}
              {/* タグ表示 */}
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>

            {/* 2つ目の記事カード */}
            <div className="min-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                {/* 丸いアイコン */}
                <p className="text-gray-600 font-bold ml-2">@123456</p>
                {/* ユーザーID */}
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p> {/* 記事の日付 */}
              </div>
              <h2 className="text-xl font-semibold mb-2">記事のタイトル</h2>
              {/* 記事タイトル */}
              {/* タグ表示 */}
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>

            {/* 3つ目の記事カード */}
            <div className="min-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                {/* 丸いアイコン */}
                <p className="text-gray-600 font-bold ml-2">@123456</p>
                {/* ユーザーID */}
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p> {/* 記事の日付 */}
              </div>
              <h2 className="text-xl font-semibold mb-2">記事のタイトル</h2>
              {/* 記事タイトル */}
              {/* タグ表示 */}
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* おすすめの記事一覧 */}
        <h2 className="font-bold text-lg mt-6">おすすめの記事</h2>
        <div className="mt-2">
          {/* 親コンテナにflex-colを追加 */}
          <div className="flex flex-col space-y-4">
            {/* 記事カードの1つ目 */}
            <div className="w-full items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="text-gray-600 font-bold ml-2">@123456</p>
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p>
              </div>
              <Link href="/card">
                <h2 className="text-xl font-semibold mb-2 hover:underline">
                  記事のタイトル
                </h2>
              </Link>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>

            {/* 記事カードの2つ目 */}
            <div className="w-full items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="text-gray-600 font-bold ml-2">@123456</p>
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p>
              </div>
              <Link href="/card">
                <h2 className="text-xl font-semibold mb-2 hover:underline">
                  記事のタイトル
                </h2>
              </Link>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>

            {/* 記事カードの3つ目 */}
            <div className="w-full items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="text-gray-600 font-bold ml-2">@123456</p>
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-4">
                <p>2023/01/01</p>
              </div>
              <Link href="/card">
                <h2 className="text-xl font-semibold mb-2 hover:underline">
                  記事のタイトル
                </h2>
              </Link>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ1
                </span>
                <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                  タグ2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 右サイドバーのコンテンツ
  const RightSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 order-3 sm:order-none">
        <h2 className="font-bold text-lg">その他</h2>
        <ul className="mt-2">
          <li>トレンド記事1</li>
          <li>トレンド記事2</li>
          <li>トレンド記事3</li>
        </ul>
        {/* コラムセクション */}
        <h2 className="font-bold text-lg mt-6">コラム</h2>
        <ul className="mt-2">
          <li>おすすめ記事1</li>
          <li>おすすめ記事2</li>
          <li>おすすめ記事3</li>
        </ul>
      </div>
    );
  };

  return (
    // レスポンシブデザインで左サイドバー、メインコンテンツ、右サイドバーを配置
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar /> {/* 左サイドバー */}
      <MainContent /> {/* メインコンテンツ */}
      <RightSidebar /> {/* 右サイドバー */}
    </div>
  );
};

export default HomePage;
