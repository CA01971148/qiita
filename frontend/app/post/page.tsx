'use client'
export default function Home() {
  return (
    <div>
      <header className="border-b border-gray-300">
        {/* 上部ヘッダー */}
        <div className="flex justify-between items-center p-4 bg-blue-400">
          <div className="text-2xl bg-white font-bold">ITM</div>
          <button className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-2"> 
            投稿!!
          </button>
        </div>
      </header>
      <main>
        <h1>投稿用ページです</h1>
      </main>
    </div>
  );
}
