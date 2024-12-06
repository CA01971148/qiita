"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import UseFetchName from '../../_components/hooks/UseFetchName'

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

type LikeGet = {
  success:boolean;
}

function Page() {
  const searchParams = useSearchParams(); // URLパラメータを取得
  const [cards, setCards] = useState<CardData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      userId: "@user1",
      text: "とても役に立ちました！",
      timestamp: "2024/10/28",
    },
    {
      id: 2,
      userId: "@user2",
      text: "もっと詳しく知りたいです。",
      timestamp: "2024/10/28",
    },
  ]);
  const [checkHeart, setCheckHeart] = useState<boolean>(false);
  const {id} = UseFetchName();
  const [newComment, setNewComment] = useState("");
  const [previewContent, setPreviewContent] = useState('');

  // クエリパラメータからidを取得
  const cardid = searchParams.get("id");

  useEffect(() => {
    if (!cardid) {
      setError("IDが指定されていません");
      setLoading(false);
      return;
    }
    
    const path: string = `http://localhost:5000/card/detail?id=${cardid}`;
    const fetchData = async () => {
      try {
        const res = await fetch(path, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error("ネットワークの応答が正常ではありません");
        }
        const data = await res.json();
        const formattedData: CardData = {
          id: data[0],
          title: data[1],
          description: data[2],
          tags: JSON.parse(data[3]),  // タグを文字列から配列に変換
          score: data[4],
          date: data[5],
          categoryId: data[6],
          user: data[7]
        };

        setCards(formattedData);

        
      } catch (err) {
        setError("エラー");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id && cardid) {
      const likeget = async () => {
        try {
          const res = await fetch(`http://localhost:5000/like?userid=${id}&cardid=${cardid}`, {
            method: "GET",
          });
          if (!res.ok) {
            throw new Error("ネットワークの応答が正常ではありません");
          }
          const data: LikeGet = await res.json();
          setCheckHeart(data.success);
        } catch (err) {
          console.error(err);
        }
      };
  
      likeget();
    }
  }, [id, cardid]); // 両方が変更されたら実行
  

  // markdown処理
  useEffect(() =>{
    if(cards?.description)
    {
      const htmlContent = marked(cards?.description);
      const sanitizedContent = DOMPurify.sanitize(htmlContent);
      setPreviewContent(sanitizedContent);
    }
  },[cards?.description])

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          userId: "@newUser",
          text: newComment.trim(),
          timestamp: new Date().toLocaleDateString(),
        },
      ]);
      setNewComment("");
    }
  };
  
  //ハートのクリックイベント
  const heartClick = async () => {
    try {
      // いいねの状態に応じてAPIリクエストを送信
      if (checkHeart) {
        await fetch(`http://localhost:5000/like`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: id, cardid: cardid }),
        });
        setCheckHeart(false);  // いいねを付けた状態に変更
      } else {
        await fetch(`http://localhost:5000/like?userid=${id}&cardid=${cardid}`, {
          method: "DELETE"
        });
        setCheckHeart(true);  // いいねを取り消した状態に変更
        
      }
  
      // いいねを変更した後、スコアを再取得
      const updatedCard = await fetch(`http://localhost:5000/card/detail?id=${cardid}`)
        .then(res => res.json());
      const updatedScore = updatedCard[4];  // 例えばスコアがデータの4番目の要素の場合
      setCards(prevCards => ({
        ...prevCards!,
        score: updatedScore,
      }));
    } catch (err) {
      console.error('いいねの更新に失敗しました', err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  if (error) return <div className="text-5xl text-center">このカードは削除されました</div>;
  
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-row">
        <div onClick={heartClick} className={`text-6xl md:text-6xl md:transform md:translate-x-24 md:translate-y-14 ${checkHeart ? 'text-red-500 hover:text-red-800' : 'text-gray-500 hover:text-gray-300'} h-14 w-14`}>❤</div>
        <div className="text-4xl mt-2 md:transform md:translate-x-24 md:translate-y-16 md:text-3xl">{cards?.score}</div>
      </div>
      <div className="flex flex-col items-center mt-[-30px] md:mt-[-70px]">
        {/* 記事カード */}
        <div className="max-w-4xl w-full items-center bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10 p-6">
          <div className="flex items-center mb-4">
            {/* 丸いアイコン */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            {/* ID */}
            <div></div>
            <p className="text-gray-600 font-bold ml-2">@{cards?.user}</p>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-semibold  mb-2">{cards?.title}</h2>

          {/* タグ */}
          <div className="flex flex-wrap space-x-2 mb-4">
            {cards?.tags.map((data,index)=>(
                <span key={index} className="bg-blue-200 text-blue-700 text-lg font-semibold px-2 py-1 rounded-full">
              {data}
            </span>
              ))}
          </div>

          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <p>投稿日: {cards?.date}</p>
          </div>
          
          <div
              className='prose'
              dangerouslySetInnerHTML={{
                __html: previewContent, // サニタイズ済みのHTMLを設定
              }}
            />
        </div>

        {/* コメントカード */}
        <div className="max-w-4xl w-full mt-8 p-6 items-center bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">コメント</h3>

          {/* コメント一覧 */}
          <div className="space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment,index) => (
                <div key={index} className="bg-gray-50 p-4 rounded shadow">
                  {/* アイコン、ID、投稿日時を横並びに配置 */}
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <p className="font-bold text-gray-700">{comment.id}</p>
                    <p className="text-xs text-gray-500">{comment.timestamp}</p>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">コメントがありません</p>
            )}
          </div>

          {/* 新しいコメント入力エリア */}
          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={handleNewCommentChange}
              placeholder="コメントを書く..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={handleNewCommentSubmit}
              className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              投稿
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Page;
