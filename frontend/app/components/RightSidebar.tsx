import React from "react";
import Image from "next/image"; // Imageコンポーネントをインポート

// イベントデータの型を定義
interface EventData {
  title: string;
  imageUrl: string;
  link: string;
}

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

  // 開催中のイベントデータ（例）
  const events: EventData[] = [
    {
      title: "React勉強会",
      imageUrl: "https://placehold.jp/200x100.png", // 仮の画像URL
      link: "https://example.com/react-study",
    },
    {
      title: "TypeScriptハンズオン",
      imageUrl: "https://placehold.jp/200x100.png", // 仮の画像URL
      link: "https://example.com/typescript-handson",
    },
    {
      title: "フロントエンドMeetup",
      imageUrl: "https://placehold.jp/200x100.png", // 仮の画像URL
      link: "https://example.com/frontend-meetup",
    },
  ];

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

          <h2 className="font-bold text-lg mt-6">開催中のイベント</h2>
          <ul className="mt-2">
            {events.map((event, index) => (
              <li key={index} className="mb-2">
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  {/* 新しいタブで開く */}
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    width={200} // 画像の幅を指定
                    height={100} // 画像の高さを指定
                    className="w-full rounded"
                  />
                  {/* 画像にroundedクラスを追加 */}
                  <p className="mt-1">{event.title}</p>
                </a>
              </li>
            ))}
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
          <h2 className="font-bold text-lg mt-6">おすすめユーザー</h2>
          <ul className="mt-2">
            <li>ユーザー1</li>
            <li>ユーザー2</li>
            <li>ユーザー3</li>
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
