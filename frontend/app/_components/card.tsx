"use client";

import { useState } from "react";
import { toggleLiked } from "../_utils/toggleLiked";

export default function Card() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      ></div>

      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="共食いタコ.png"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">ユーザー名</p>
              <p className="text-gray-600">Aug 18</p>
            </div>
          </div>
          <div className="px-6 pt-4 pb-2 text-gray-900 font-bold text-xl mb-2">
            Can coffee make you a better developer?
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
            <p>
              <button onClick={() => setLiked(toggleLiked(liked))}>
                <span
                  className={`i-heroicons-solid-heart w-10 h-10 ${
                    liked ? "" : "text-red-500"
                  }`}
                ></span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
