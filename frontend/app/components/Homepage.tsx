"use client";
import React from "react";

const HomePage = () => {
  // 左サイドバーのコンテンツ
  const LeftSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 border-b sm:border-r sm:border-b-0 border-gray-300">
        <h2 className="font-bold text-lg">フォロー中のタグ</h2>
        <ul className="mt-2">
          <li>#React</li>
          <li>#JavaScript</li>
          <li>#WebDevelopment</li>
        </ul>
        <h2 className="font-bold text-lg mt-6">ユーザーランキング</h2>
        <ul className="mt-2">
          <li>ユーザー1</li>
          <li>ユーザー2</li>
          <li>ユーザー3</li>
        </ul>
      </div>
    );
  };

  // 右サイドバーのコンテンツ
  const RightSidebar = () => {
    return (
      <div className="w-full sm:w-1/4 p-4 border-t sm:border-t-0 sm:border-l border-gray-300">
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

  return (
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar />
      <div className="w-full sm:w-1/2 p-4">
        <h1 className="text-2xl font-bold">メインコンテンツ</h1>
        <p>ここにメインのコンテンツを追加します。</p>
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
