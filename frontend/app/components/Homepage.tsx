"use client";
import React from "react";
import { FaReact, FaJs, FaGlobe, FaUser } from "react-icons/fa"; // FaUserアイコンをインポート
import Link from "next/link";

const HomePage = () => {
  // 左サイドバーのコンテンツ
  const LeftSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-2 sm:order-none">
        <h2 className="font-bold text-lg">フォロー中のタグ</h2>
        <ul className="mt-2">
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
              <FaGlobe className="mr-2 text-green-500" /> WebDevelopment
            </li>
          </Link>
        </ul>
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
        <ul className="mt-2">
          <li>トレンド記事1</li>
          <li>トレンド記事2</li>
          <li>トレンド記事3</li>
        </ul>
        <h2 className="font-bold text-lg mt-6">おすすめの記事</h2>
        <ul className="mt-2">
          <li>おすすめ記事1</li>
          <li>おすすめ記事2</li>
          <li>おすすめ記事3</li>
        </ul>
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
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default HomePage;
