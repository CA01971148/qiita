"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

function Page() {
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
  const [newComment, setNewComment] = useState("");

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

  return (
    <div className="min-h-screen">
      <Header />

      <div className="flex  flex-col items-center">
        {/* 記事カード */}
        <div className="max-w-md w-full items-center bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10 p-6">
          <div className="flex items-center mb-4">
            {/* 丸いアイコン */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            {/* ID */}
            <p className="text-gray-600 font-bold ml-2">@123456</p>
          </div>

          <h2 className="text-xl font-semibold mb-2">記事のタイトル</h2>

          {/* タグ */}
          <div className="flex flex-wrap space-x-2 mb-4">
            <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
              タグ1
            </span>
            <span className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
              タグ2
            </span>
          </div>

          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <p>投稿日: 2023/01/01</p>
            <p>最終更新: 2023/02/01</p>
          </div>

          <p className="text-gray-700 text-base">
            これは記事の内容のプレビューです。全文はここでは表示されませんが、主要な情報が含まれています。
          </p>
        </div>

        {/* ユーザーカード */}
        <div className="max-w-md w-full mt-8 bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            {/* アイコンを大きく */}
            <div className="ml-4">
              {/* 名前と自己紹介をまとめる */}
              <p className="text-gray-700 font-bold text-lg">
                ユーザーID
              </p>
              {/* 名前を大きく */}
              <p className="text-gray-500 text-sm">簡単な自己紹介文。</p>{" "}
              {/* 自己紹介文を追加 */}
            </div>
          </div>
        </div>

        {/* トレンド記事カード */}
        <div className="max-w-md w-full mt-8 bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
          <h3 className="text-lg font-semibold mb-2">トレンド記事</h3>
          <ul className="list-disc pl-6">
            {/* リストスタイルを追加 */}
            <li className="mb-2">トレンド記事 1のタイトル</li>
            <li className="mb-2">トレンド記事 2のタイトル</li>
            <li className="mb-2">トレンド記事 3のタイトル</li>
          </ul>
        </div>

        {/* コメントカード */}
        <div className="max-w-md w-full mt-8 p-6 items-center bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">コメント</h3>

          {/* コメント一覧 */}
          <div className="space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded shadow">
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
