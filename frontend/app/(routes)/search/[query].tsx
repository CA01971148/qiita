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
