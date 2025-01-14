import React from "react";

export const RightSidebar: React.FC = () => {
  const path = location.pathname;

  let pageType: "home" | "timeline" | "trend" = "home"; // デフォルトはhome

  if (path === "/") {
    // ホームページのパスに合わせて変更
    pageType = "home";
  } else if (path === "/timeline") {
    // タイムラインページのパスに合わせて変更
    pageType = "timeline";
  } else if (path === "/trend") {
    // トレンドページのパスに合わせて変更
    pageType = "trend";
  }

  return (
    <div className="w-full sm:w-1/4 p-4 order-3 sm:order-none">
      {pageType === "home" && (
        <>
          <h2 className="font-bold text-lg">トレンド</h2>
          <ul className="mt-2">
            <li>トレンド記事1</li>
            <li>トレンド記事2</li>
            <li>トレンド記事3</li>
          </ul>
          <h2 className="font-bold text-lg mt-6">おすすめ</h2>
          <ul className="mt-2">
            <li>おすすめ記事1</li>
            <li>おすすめ記事2</li>
            <li>おすすめ記事3</li>
          </ul>
        </>
      )}
      {pageType === "timeline" && (
        <>
          <h2 className="font-bold text-lg">トレンド</h2>
          <ul className="mt-2">
            <li>トレンド記事1</li>
            <li>トレンド記事2</li>
            <li>トレンド記事3</li>
          </ul>
          <h2 className="font-bold text-lg mt-6">ユーザー</h2>
          <ul className="mt-2">
            <li>フォロー中のユーザー</li>
            <li>最近の活動</li>
            <li>おすすめのユーザー</li>
          </ul>
        </>
      )}
      {pageType === "trend" && (
        <>
          <h2 className="font-bold text-lg">トレンド</h2>
          <ul className="mt-2">
            <li>トレンド記事1</li>
            <li>トレンド記事2</li>
            <li>トレンド記事3</li>
          </ul>
          <h2 className="font-bold text-lg mt-6">人気のタグ</h2>
          <ul className="mt-2">
            <li>タグ1</li>
            <li>タグ2</li>
            <li>タグ3</li>
          </ul>
        </>
      )}
    </div>
  );
};
