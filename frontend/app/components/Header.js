'use client';

import { FaBell, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  const handlePostClick = () => {
    router.push('/post'); // 投稿ページに遷移
  };

  return (
    <header className="border-b border-gray-300">
      {/* 上部ヘッダー */}
      <div className="flex justify-between items-center p-4 bg-blue-400">
        <div className="text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center">ITM</div>
        <input
          type="text"
          placeholder="記事、質問を検索..."
          className="flex-1 mx-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex gap-4 items-center">
          <FaBell className="text-xl cursor-pointer" />
          {/* 投稿するボタン */}
          <button className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-2" onClick={handlePostClick}> 
          {/* /ボタンを押したらhandlePostClick関数を実行 */}
            <FaPlus />
            投稿する
          </button>
        </div>
      </div>

      {/* 下部ナビゲーションバー */}
      <nav className="flex justify-around bg-gray-800 text-white py-2">
        <button
          className={`${
            activeTab === 'home' ? 'font-bold underline' : ''
          }`}
          onClick={() => setActiveTab('home')}
        >
          ホーム
        </button>
        <button
          className={`${
            activeTab === 'timeline' ? 'font-bold underline' : ''
          }`}
          onClick={() => setActiveTab('timeline')}
        >
          タイムライン
        </button>
        <button
          className={`${
            activeTab === 'trends' ? 'font-bold underline' : ''
          }`}
          onClick={() => setActiveTab('trends')}
        >
          トレンド
        </button>
      </nav>

      {/* コンテンツ切り替え */}
      <div className="p-4">
        {activeTab === 'home' && <div>ホームコンテンツ</div>}
        {activeTab === 'timeline' && <div>タイムラインコンテンツ</div>}
        {activeTab === 'trends' && <div>トレンドコンテンツ</div>}
      </div>
    </header>
  );
};

export default Header;
