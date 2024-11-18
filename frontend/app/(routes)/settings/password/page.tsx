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
            className="block text-gray-800 hover:bg-gray-100 p-2 rounded"
          >
            Profile
          </Link>
          <Link
            href="../settings/password"
            className={`block p-2 rounded ${
              isMenuOpen && "bg-gray-200 text-black font-bold"
            }`}
            aria-current="page"
          >
            Password
          </Link>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray">
          <h2 className="text-xl font-bold mb-4">パスワード</h2>
          <p className="mb-2">
            パスワードは Qiita API を利用する際に必要となります。
          </p>
          <p className="mb-4">
            パスワードを変更すると、Qiita APIで利用するトークンも変更されます。
          </p>
          <Link
            href="https://help.qiita.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mb-4 inline-block"
          >
            パスワード変更に関するヘルプ
          </Link>
          <h3 className="text-lg font-semibold mt-4 mb-2">メールアドレス</h3>
          <p className="mb-4">
            パスワードの設定URLを登録されたメールアドレス（例:
            user@example.com）に送ります。
          </p>
          <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            パスワード設定メールを送信
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
