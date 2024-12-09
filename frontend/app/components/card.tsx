"use client";

import { useState } from "react";
import { handleClick } from "../utils/handleclick";
// import UseFetchName from "../_components/hooks/UseFetchName";
import Link from "next/link";
import Image from "next/image"

interface CardData {
  id: number;
  title: string;
  detail: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user: string;
};

export default function Card(props: CardData) {
  const [liked, setLiked] = useState(false);

  // const { name, id } = UseFetchName();

  return (
    <div>
      {/* 画像部分 */}
      <div className="inline-block align-top p-2 pb-0">
        <div className="flex flex-row">
          <Image
              src="/共食いタコ.png"
              width={40}
              height={40}
              alt="pc_img"
              className="icon object-cover rounded-full bg-gray-300/50"
            />
          <div>
            <div className="ml-4 text-gray-400 mt-2 ">{props.user}</div>
            
          </div>
        </div>
        <p className="ml-4 text-gray-600 text-xs ">{props.date}</p>
      </div>
      <Link key={props.id} href={`/card`}>
        <div className=" ml-16 text-4xl text-left text-gray-900 font-bold hover:text-sky-700 mt-3">
          {props.title}
        </div>
      </Link>

      <div className="ml-14">
        {props.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className=" inline-block bg-blue-200 text-blue-700 rounded-full px-1  text-base   mr-2 mt-2  border-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <button onClick={() => handleClick(liked, setLiked)} className="ml-14">
        <span
          className={` i-heroicons-solid-heart w-4 h-4  text-red-500 mt-2`}
        ></span>
        {props.score}
      </button>

      {/* <div className="max-w-sm w-full lg:max-w-full lg:flex my-8 "> */}
      {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={title}></div> */}
      {/* カードの大枠と背景の指定 */}
      {/* <div className="border border-gray-400 p-4 flex flex-col justify-between leading-normal bg-teal-100">
          <div className="mb-2">
            <div className="flex items-center">
              <Image className="w-10 h-10 rounded-full mr-4" src="共食いタコ.png" alt="Avatar"/>
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
