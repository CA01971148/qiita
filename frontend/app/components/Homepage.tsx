"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { LeftSidebar } from "@/app/components/LeftSidebar";
import { RightSidebar } from "@/app/components/RightSidebar";

type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user: string;
};

const HomePage = () => {
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
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar />
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
      <RightSidebar />
    </div>
  );
};

export default HomePage;
