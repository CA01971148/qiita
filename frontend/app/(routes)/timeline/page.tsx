"use client";
import Card from "@/app/components/card";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
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

export default function Timeline() {
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

  // http://localhost:5000/order/timeからデータを取得
  // useEffect(() => {
  //   const path: string = 'http://localhost:5000/order/time';
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(path, {
  //         method: 'GET',
  //       });
  //       if (!res.ok) {
  //         throw new Error('ネットワークの応答が正常ではありません');
  //       }
  //       const data = await res.json();

  //       // データを整形
  //       const formattedData = data.map((item: any) => ({
  //         id: item[0],
  //         title: item[1],
  //         description: item[2],
  //         tags: JSON.parse(item[3]),
  //         score: item[4],
  //         date: item[5],
  //         categoryId: item[6],
  //         user:item[7]
  //       }));

  //       setCards(formattedData);
  //     } catch (err) {
  //       setError('err.message');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading)
  //   return (
  //         <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //           <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
  //         </div>
  // );
  // if (error) return <div>エラー: {error}</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-wrap md:flex-row">
        {cards.map((card, index) => (
          <div key={card.id} className="w-full md:w-1/2">
            <div
              className=" sm:w-96   md:w-96 my-2 md:mx-auto
mx-2 rounded-md border border-gray-400 bg-white"
            >
              <Card {...card} />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
