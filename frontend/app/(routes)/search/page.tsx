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

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // クエリパラメータ "query" を取得
  const [searchResults, setSearchResults] = useState<string[]>([]); // ダミーの検索結果を保存

  useEffect(() => {
    if (query) {
      // 実際の検索処理（APIリクエストなど）をここに実装
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = (searchQuery: string) => {
    // ここでは仮のデータを使った検索処理を実装
    const dummyData = [
      "記事1: Next.js 入門",
      "記事2: React パフォーマンス最適化",
      "記事3: TypeScript の基本",
      "記事4: JavaScript の最新機能",
    ];

    // ダミー検索処理: クエリに一致するデータをフィルタリング
    const results = dummyData.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">検索結果</h1>

        {/* 検索クエリを表示 */}
        {query && (
          <p className="mb-4">
            <span className="font-semibold">検索ワード:</span> {query}
          </p>
        )}

        {/* 検索結果を表示 */}
        {searchResults.length > 0 ? (
          <ul className="list-disc ml-5">
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
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
