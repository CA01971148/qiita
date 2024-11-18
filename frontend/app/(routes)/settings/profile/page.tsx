"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import Link from "next/link";

const Page = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Header />
      {/* Hamburger Icon Button */}
      <button
        className="p-2 bg-white border border-white text-black rounded-md"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Background Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-20 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Items */}
        <nav className="mt-4 px-4">
          <div className="flex items-center justify-between">
            <p className="font-bold">設定</p>
            {/* Close Button */}
            <button
              className="p-2 text-black"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          <Link
            href="../settings/account"
            className="block text-gray-800 hover:bg-gray-100 p-2 rounded"
          >
            Account
          </Link>
          <Link
            href="../settings/profile"
            className={`block p-2 rounded ${
              isMenuOpen && "bg-gray-200 text-black font-bold"
            }`}
            aria-current="page"
          >
            Profile
          </Link>
          <Link
            href="../settings/password"
            className="block text-gray-800 hover:bg-gray-100 p-2 rounded"
          >
            Password
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray">
          <h2 className="text-xl font-bold mb-4">公開用プロフィール</h2>
          <p className="mb-2">この情報は公開プロフィールとして表示されます。</p>
          <p className="mb-4">
            他のユーザーがあなたのプロフィールを見る際に役立つ情報を設定してください。
          </p>
          <div className="mt-4 space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                名前
              </label>
              <input
                id="name"
                type="text"
                placeholder="例: 山田 太郎"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label
                htmlFor="bio"
                className="block text-gray-700 font-medium mb-1"
              >
                自己紹介
              </label>
              <textarea
                id="bio"
                rows={4}
                placeholder="例: ソフトウェアエンジニアで、ReactとNext.jsが得意です。"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Location Field */}
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 font-medium mb-1"
              >
                場所
              </label>
              <input
                id="location"
                type="text"
                placeholder="例: 東京, 日本"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Save Button */}
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
