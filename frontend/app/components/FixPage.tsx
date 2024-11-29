'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Item = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number | string;
};

const FixPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("categoryId");
  
  const [data, setData] = useState<Item | null>(null); // 初期値は null
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  // Markdownを処理する
  useEffect(() => {
    if (content) {
      const htmlContent = marked(content);
      const sanitizedContent = DOMPurify.sanitize(htmlContent);
      setPreviewContent(sanitizedContent);
    }
  }, [content]);

  // データの取得とフォームの初期化
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Getcard?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (response.ok) {
          // データを取得したらフォームを初期化
          setData({
            id: result[0],
            title: result[1],
            description: result[2],
            tags: Array.isArray(result[3]) ? result[3] : JSON.parse(result[3]),
            score: result[4],
            date: result[5],
            categoryId: result[6],
          });
        } else {
          console.log("カードの取得に失敗しました");
        }
      } catch (error) {
        console.error("エラー:", error);
        alert("エラーが発生しました。");
      }
    };
    fetchData(); // 非同期関数を呼び出す
  }, [id]);

  // `data` が読み込まれたらフォームにその値をセット
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setTags(data.tags.join(" ")); // 配列をスペース区切りで表示
      setContent(data.description);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ここで送信のロジックを実装
    console.log("保存されました", { title, tags, content });
  };

  return (
    <div>
      <header className='border-b border-gray-300'>
        <div className='flex justify-between items-center p-4 bg-blue-400'>
          <Link href="/">
            <div className='text-2xl bg-white w-20 h-10 rounded-full font-bold flex items-center justify-center'>
              ITM
            </div>
          </Link>

          <div className='flex items-center gap-2'>
            <Link href="/mypage">
              <button className='bg-red-300 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center mr-8'>
                戻る
              </button>
            </Link>
            <button className='bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center mr-8' onClick={handleSubmit}>
              修正 !!
            </button>
          </div>
        </div>
      </header>

      <main className='p-8'>
        <div className='container mx-auto space-y-6'>
          <form onSubmit={handleSubmit}>
            {/* タイトル入力欄 */}
            <div>
              <label className='block text-lg font-semibold mb-2'>タイトル</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full p-2 border rounded-md'
                placeholder={data ? data.title : "タイトルを入力"}
              />
            </div>

            {/* タグ入力欄 */}
            <div>
              <label className='block text-lg font-semibold mb-2'>タグ</label>
              <input
                type='text'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className='w-full p-2 border rounded-md'
                placeholder={data ? data["tags"].join(" ") : "タグを入力してください (スペース区切り)"}
              />
            </div>

            {/* 内容とプレビューを横並びに */}
            <div className='flex space-x-4'>
              {/* 内容入力欄 */}
              <div className='w-1/2'>
                <label className='block text-lg font-semibold mb-2'>内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className='w-full h-64 p-2 border rounded-md'
                  placeholder={data ? data.description : "Markdown記法で内容を入力してください"}
                ></textarea>
              </div>

              {/* プレビューエリア */}
              <div className='w-1/2'>
                <h2 className='text-lg font-bold mb-2'>プレビュー</h2>
                <div className='bg-white p-4 border rounded-md h-64 overflow-auto'>
                  <div
                    className='prose'
                    dangerouslySetInnerHTML={{
                      __html: previewContent,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 送信ボタン */}
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              保存
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default FixPage;
