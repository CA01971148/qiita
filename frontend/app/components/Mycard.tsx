import Link from "next/link";
import React from "react";

type Mycardtype = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    score: number;
    date: string;
    categoryId: number;
    user: string;
  };
  
  type Card = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    score: number;
    date: string;
    categoryId: number;
    user:string;
  }[];
  
  const Mycard = (props: { data: Card; name: string }) => {
    
    console.log(props.data)
    return (
      <>
        <hr className="mt-8" />
        <div className="ml-4 text-5xl mt-8">MyProject</div>
        <div className="mt-8 ml-auto md:ml-12">
          <div className="flex flex-wrap">
            
            {props.data.map((card, index) => {
              // CardのデータをMycardtypeにマッピング
              const data: Mycardtype = {
                id: card.id, 
                title: card.title,
                description: card.description, 
                tags:card.tags, 
                score: card.score, 
                date: card.date, 
                categoryId: card.categoryId, 
                user: card.user, 
              };
              if(props.name == data.user){
                return (
                  
                      <div key={index} className="w-full sm:max-w-[600px] sm:min-h-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 ml-5 mb-5">
                        <Link href={`/mypage/fix?categoryId=${data.id}`}>
                          <div className="mb-4">
                            <div className="w-16 h-16 bg-gray-300 rounded-full mt-3"></div>
                            {/* 丸いアイコン */}
                            <p className="text-gray-600 font-bold ml-2">@{data.user}</p>
                            {/* ユーザーID */}
                          </div>
                          <div className="flex justify-between text-gray-500 text-md mb-4">
                            <p>{data.date}</p> {/* 記事の日付 */}
                          </div>
                          <h2 className="text-4xl font-semibold mb-2 hover:underline">
                            {data.title}
                          </h2>
                          <div className="flex flex-wrap space-x-2 mb-4">
                            {data.tags.map((tag, index) => (
                              <span key={index} className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 mt-1 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </Link>
                      </div>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  };
  
  export default Mycard;
  