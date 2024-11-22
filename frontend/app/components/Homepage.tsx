"use client";
import React, { useEffect, useState } from "react";
import { FaReact, FaJs, FaGlobe, FaUser } from "react-icons/fa"; // アイコンをインポート
import Link from "next/link"; // Linkコンポーネントをインポート
import Card from "./card";

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
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // http://localhost:3001/postsからデータを取得
    useEffect(() => {
      const requestURL = " http://localhost:3001/posts";

      const fetchData = async () => {
        try {
          const response = await fetch(requestURL);

          const data = await response.json();

          setCards(data);
        } catch {
          0;
          console.error("データ取得中にエラーが発生した", error);
        }
      };

      fetchData();
    }, []);
    return (
      <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-1 sm:order-none">
        <h2 className="font-bold text-lg">トレンドの記事</h2>
        {/* トレンドの記事 */}
        <div className="mt-2 overflow-x-auto">
          <div className="flex space-x-4">
            {cards.map((card) => (
              <div key={card.id} className="w-full  ">
                <div
                  className=" sm:w-96   md:w-96 my-2 md:mx-auto
      mx-2 rounded-md border shadow-md bg-white"
                >
                  <Card {...card} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* おすすめの記事一覧 */}
        <h2 className="font-bold text-lg mt-6">おすすめの記事</h2>
        <div className="mt-2">
          {/* 親コンテナにflex-colを追加 */}
          <div className="flex flex-col space-y-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="w-full rounded-md border shadow-md bg-white h-50"
              >
                <div className="flex items-center mb-4">
                  <Card {...card} />
                </div>
              </div>
            ))}
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
