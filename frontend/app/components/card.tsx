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
    <div className="max-w-sm w-full lg:max-w-full lg:flex my-8 ">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      ></div>

      <div className="border border-gray-400 p-4 flex flex-col justify-between leading-normal bg-teal-100">
        <div className="mb-2">
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
          <div className="px-6 pt-4 pb-2 text-gray-900 font-bold text-xl mb-2">
            {props.title}
          </div>
          <div className="px-6 pt-4 ">
            {props.tags && props.tags.length > 0 ? (
              props.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {tag}
                  </span>
                );
              })
            ) : (
              <p>No tags available</p>
            )}

            <p className="">
              <button onClick={() => handleClick(liked, setLiked)}>
                <span
                  className={`i-heroicons-solid-heart w-10 h-10 ${
                    liked ? "" : "text-red-500"
                  }`}
                ></span>
                {liked ? `${count}` : `${count + 1} `}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
