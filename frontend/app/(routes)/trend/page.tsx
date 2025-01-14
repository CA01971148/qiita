"use client";
import Card from "@/app/components/card";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { LeftSidebar } from "@/app/components/LeftSidebar";
import { RightSidebar } from "@/app/components/RightSidebar";

import React, { useEffect, useState } from "react";
type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user:string;
};

export default function Trend() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
     const path: string = 'http://localhost:5000/order/trend';
     const fetchData = async () => {
       try {
         const res = await fetch(path, {
           method: 'GET',
         });
         if (!res.ok) {
           throw new Error('ネットワークの応答が正常ではありません');
         }
         const data = await res.json();
 
         // データを整形
         const formattedData:CardData[] = data.map((item:string[]) => ({
           id: item[0],
           title: item[1],
           description: item[2],
           tags: JSON.parse(item[3]), 
           score: item[4],
           date: item[5],
           categoryId: item[6],
           user:item[7]
         }));
 
         setCards(formattedData)
       } catch (err) {
         setError('err.message');
       } finally {
         setLoading(false);
       }
     };
 
     fetchData();
   }, []);
 
   if (loading) 
    return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
          </div>
  );
  if (error) return <div>エラー: {error}</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col sm:flex-row">
        <LeftSidebar />
        <div className="w-full sm:w-1/2 p-4 border-b sm:border-r sm:border-b-0 border-gray-300 order-1 sm:order-none">
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
      <Footer />
    </>
  );
}
