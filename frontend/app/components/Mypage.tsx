"use client";
import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
import React from "react";

function Mypage() {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10">
      <div className="p-4 text-center">
        {/* 丸いアイコン（ユーザーアイコン） */}
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

        {/* ID - 太字に変更 */}
        <p className="text-gray-600 font-bold">@123456</p>

        {/* 線を引く */}
        <hr className="my-4" />

        {/* 投稿数、フォロー数、フォロワー数 - フォローを中央に配置 */}
        <div className="flex justify-center text-center space-x-12">
          {/* フォローを中央に、等間隔に並べる */}
          <div>
            <p className="text-lg font-bold">50</p>
            <p className="text-gray-600 text-sm">投稿数</p>
          </div>
          <div>
            <p className="text-lg font-bold">100</p>
            <p className="text-gray-600 text-sm">フォロー</p>
          </div>
          <div>
            <p className="text-lg font-bold">200</p>
            <p className="text-gray-600 text-sm">フォロワー</p>
          </div>
        </div>

        {/* プロフィール編集ボタン */}
        <div className="mt-6">
          <Link href="../settings/profile">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              プロフィールを編集
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
