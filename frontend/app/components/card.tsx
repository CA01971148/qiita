"use client";

import { useEffect, useState } from "react";
import { handleClick } from "../utils/handleclick";
import UseFetchName from "../_components/hooks/UseFetchName";
export default function Card(props: any) {
  const { card_id, title, description, tags, score, date, user } = props; // プロパティを受け取る
  const [liked, setLiked] = useState(false);

  const { name, id } = UseFetchName();

  return (
    <div>
      {/* 画像部分 */}
      <div className="inline-block align-top p-2 pb-0  flex ">
        <img
          className="w-8 h-8 bg-gray-300/50 rounded-full"
          src="共食いタコ.png"
          alt="Avatar"
        />
        <div>
          <div className="ml-4 text-gray-400">@1234</div>
          <p className="ml-4 text-gray-600 text-xs ">{date}</p>
        </div>
      </div>

      <div className=" ml-16 text-lg text-left text-gray-900 font-bold">
        {title}
      </div>

      <div className="ml-14">
        {tags.map((tag: any, index: any) => (
          <span
            key={index}
            className=" inline-block bg-blue-200 text-blue-700 rounded-full px-1  text-xs   mr-2   border-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <button onClick={() => handleClick(liked, setLiked)} className="ml-14">
        <span
          className={` i-heroicons-solid-heart w-4 h-4  text-red-500 `}
        ></span>
        {score}
      </button>

      {/* <div className="max-w-sm w-full lg:max-w-full lg:flex my-8 "> */}
      {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={title}></div> */}
      {/* カードの大枠と背景の指定 */}
      {/* <div className="border border-gray-400 p-4 flex flex-col justify-between leading-normal bg-teal-100">
          <div className="mb-2">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-4" src="共食いタコ.png" alt="Avatar"/>
              <div className="text-sm">
                <p className="text-gray-900 leading-none">ユーザー名</p> 
                <p className="text-gray-600">{date}</p>
              </div>
            </div>
            <div className="px-6 pt-4 pb-2 text-gray-900 font-bold text-xl mb-2">
              {title}
            </div>
            <div className="px-6 pt-4 ">
              {tags.map((tag:any, index:any) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
              ))}
              <p className="">
                <button onClick={() => handleClick(liked, setLiked)}>
                  <span className={`i-heroicons-solid-heart w-10 h-10 ${liked ? "" : "text-red-500"}`}></span>
                  {liked ? `${score}` : `${score + 1}`}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
