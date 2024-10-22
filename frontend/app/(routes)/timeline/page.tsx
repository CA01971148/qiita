"use client";
import Card from "@/app/components/card";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";

interface CardData {
  id: number;
  title: string;
  detail: string;
  tags: string[];
  hearts: number;
  date: string;
  order: number;
}

export default function Timeline() {
  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => setCardData(data));
  }, []);

  return (
    <>
      <Header />
      {cardData
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((card) => (
          <Card
            id={card.id}
            title={card.title}
            detail={card.detail}
            tags={card.tags}
            hearts={card.hearts}
            date={card.date}
            order={card.order}
          />
        ))}
      <Footer />
    </>
  );
}
