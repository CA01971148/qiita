"use client";
import React, { useEffect, useState } from "react";
import Card from "./card";
import { LeftSidebar } from "@/app/components/LeftSidebar";
import { RightSidebar } from "@/app/components/RightSidebar";

interface CardData {
  id: number;
  title: string;
  detail: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user: string;
}

const HomePage = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // データ取得開始時にローディング状態をtrueに
      try {
        const response = await fetch("http://localhost:3001/posts");
        if (!response.ok) { // レスポンスがエラーの場合
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCards(data);
      } catch (error: unknown) {
        setErrorMessage('データベースからデータが取得できません');
        if (error instanceof Error) {
            console.error("データ取得中にエラーが発生した", error.message);
        } else {
            console.error("データ取得中に不明なエラーが発生しました", error);
        }
        return null;
      } finally {
        setIsLoading(false); // データ取得完了後（成功・失敗問わず）ローディング状態をfalseに
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // ローディング中はLoading...を表示
  }

  if (errorMessage) {
    return <div style={{ color: "red" }}>{errorMessage}</div>; // エラーメッセージを表示
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <LeftSidebar />
      <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-1 sm:order-none">
        <h2 className="font-bold text-lg">トレンドの記事</h2>
        <div className="mt-2 overflow-x-auto">
          <div className="flex space-x-4">
            {cards.map((card) => (
              <div key={card.id} className="w-full">
                <div className="min-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
                  <Card {...card} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-bold text-lg mt-6">おすすめの記事</h2>
        <div className="mt-2">
          <div className="flex flex-col space-y-4">
            {cards.map((card) => (
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