// import { GetServerSideProps } from "next";
// import { useRouter } from "next/router";

// type SearchProps = {
//   query: string;
//   results: Array<{ id: string; title: string; url: string }>;
// };

// const SearchPage = ({ query, results }: SearchProps) => {
//   // router はクライアントサイドでのみ使用可能
//   const router = typeof window !== "undefined" ? useRouter() : null;

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">検索結果: {query}</h1>
//       {results.length > 0 ? (
//         <ul className="space-y-4">
//           {results.map((result) => (
//             <li key={result.id}>
//               <a
//                 href={result.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {result.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>検索結果が見つかりませんでした。</p>
//       )}
//       {router && (
//         <button
//           onClick={() => router.push("/")}
//           className="mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
//         >
//           戻る
//         </button>
//       )}
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { query } = context.params as { query: string };

//   // サンプルAPIで検索結果を取得 (実際は自分のAPIに置き換えてください)
//   const apiUrl = `https://example.com/api/search?q=${encodeURIComponent(
//     query
//   )}`;
//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   return {
//     props: {
//       query,
//       results: data.results || [],
//     },
//   };
// };

// export default SearchPage;

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getTagsData, TagData } from "@/app/(routes)/tags/data";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<(TagData | string)[]>([]); // anyに変更
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async (searchQuery: string) => {
      setIsLoading(true);
      const allTags = await getTagsData();

      // タグの検索
      const tagResults = allTags.filter((tag) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // ダミーデータの検索（以前のコードから変更なし）
      const dummyData = [
        "記事1: Next.js 入門",
        "記事2: React パフォーマンス最適化",
        "記事3: TypeScript の基本",
        "記事4: JavaScript の最新機能",
      ];
      const dummyResults = dummyData.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults([...tagResults, ...dummyResults]); // タグとダミーデータを結合
      setIsLoading(false);
    };

    if (query) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="p-4 flex-grow">
          <h1 className="text-2xl font-bold mb-4">検索結果</h1>
          <p className="text-center">ロード中...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">検索結果</h1>

        {query && (
          <p className="mb-4">
            <span className="font-semibold">検索ワード:</span> {query}
          </p>
        )}

        {searchResults.length > 0 ? (
          <ul className="grid grid-cols-3 gap-4">
            {searchResults.map((result, index) => {
              if (typeof result === "string") {
                return (
                  <li key={index} className="border rounded p-4">
                    {result}
                  </li>
                );
              } else {
                return (
                  <li key={result.name} className="border rounded p-4">
                    <a
                      href={`/tags/${result.name}`}
                      className="text-blue-600 hover:underline"
                    >
                      <h2 className="text-xl font-semibold">{result.name}</h2>
                      <p className="text-gray-600 text-sm">
                        {result.description}
                      </p>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          <p>検索結果が見つかりませんでした。</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
