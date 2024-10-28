"use client";

import { useState } from "react";
import { handleClick } from "../utils/handleclick";

interface CardData {
  id: number;
  title: string;
  detail: string;
  tags: string[];
  hearts: number;
  date: string;
  order: number;
}

export default function Card(props: CardData) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(props.hearts);

  return (
    <div className="flex justify-center my-8 px-4">
      <div className="max-w-screen-lg w-full bg-teal-100 rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div
          className="h-2 lg:h-auto lg:w-48 flex-none bg-cover bg-center"
          title="Woman holding a mug"
        ></div>

        <div className="p-6 flex flex-col justify-between w-full ">
          <div className="mb-4">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="共食いタコ.png"
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">ユーザー名</p>
                <p className="text-gray-600">{props.date}</p>
              </div>
            </div>

            <div className="mt-4 text-gray-900 font-bold text-xl mb-2">
              {props.title}
            </div>

            <div className="mt-4">
              {props.tags && props.tags.length > 0 ? (
                props.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p>No tags available</p>
              )}
            </div>

            <button
              onClick={() => handleClick(liked, setLiked)}
              className="mt-4 text-black-500 flex items-center"
            >
              <span
                className={`i-heroicons-solid-heart w-10 h-10 ${
                  liked ? "text-red-500" : "text-gray-400"
                }`}
              ></span>
              {liked ? count + 1 : count}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
