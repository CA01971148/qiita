"use client";

import { useState, useEffect} from "react";
import React from "react";
import UseFetchName from '../_components/hooks/UseFetchName'
import Mycard from './Mycard'
type Card = [
  number,  // ID
  string,  // タイトル
  string,  // 詳細
  string,  // タグ（JSON文字列）
  number,  // コメント数
  string,  // 投稿日時
  number,  // いいね数
  string   // ユーザーID
][];

function Mypage() {
  const data: Card = [
    [
      20,
      "テスト用のタイトルです",
      "# テスト構文です",
      "[\"テスト\", \"テスト\"]",
      0,
      "Mon, 25 Nov 2024 09:47:48 GMT",
      1,
      "user1"
    ],
    [
      19,
      "Markdownでのテスト投稿",
      "# Markdown Test Post\nこれは **Markdown** のテスト用投稿です。以下に、Markdownで使用可能なさまざまな記法を含めています。\n\n## リスト\n- これは通常のリストです。\n  - ネストされたリスト項目です。\n- [x] チェック済みのタスク\n- [ ] 未チェックのタスク\n\n## 表\n| 見出し1      | 見出し2       | 見出し3       |\n|--------------|---------------|---------------|\n| 内容1        | 内容2         | 内容3         |\n| セルを結合可能 | **太字**       | [リンク](https://example.com) |\n\n## コードブロック\n以下はコードブロックの例です。\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\nconsole.log(greet('world'));\n",
      "[\"Markdown\", \"テスト\", \"コード\", \"表\", \"リンク\"]",
      0,
      "Wed, 13 Nov 2024 11:23:59 GMT",
      1,
      "user1"
    ],
    [
      18,
      "これはフロントエンド側で入力された内容です",
      "# これはSQLで作成したコードです\n```\nCREATE TABLE account (\n    userid INT AUTO_INCREMENT PRIMARY KEY,\n    user VARCHAR(255) NOT NULL,\n    pas VARCHAR(255) NOT NULL\n);\n\n\nCREATE TABLE card (\n    cardid INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(255) NOT NULL,\n    detail TEXT,\n    tag JSON,  \n    heart INT DEFAULT 0,\n    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    userid INT,\n    FOREIGN KEY (userid) REFERENCES account(userid) \n);\n\n```",
      "[\"Typescript\", \"HTML\", \"CSS\", \"\"]",
      0,
      "Wed, 13 Nov 2024 11:13:06 GMT",
      1,
      "user1"
    ],
    [
      16,
      "Markdownテストデータ",
      "# Markdown表示テスト\n\n## 見出しレベル2\n### 見出しレベル3\n#### 見出しレベル4\n\n---\n\n### テキストのスタイル\n- **太字** は `**text**`\n- *斜体* は `*text*`\n- ~~取り消し線~~ は `~~text~~`\n\n---\n\n### リストの表現\n\n- 番号なしリスト\n  - ネストされた項目1\n  - ネストされた項目2\n\n1. 番号付きリスト\n2. 番号付きリスト\n\n---\n\n### 引用\n> これは引用です。 `>` を使います。\n\n---\n\n### コードブロック\n\n```python\n# Pythonのコード例\ndef greet(name):\n    return f\"Hello, {name}!\"\nprint(greet(\"World\"))\n```\n\n```javascript\n// JavaScriptのコード例\nfunction greet(name) {\n    return `Hello, ${name}!`;\n}\nconsole.log(greet(\"World\"));\n```\n\n---\n\n### 表の例\n\n| 見出し1 | 見出し2 | 見出し3 |\n| ------- | ------- | ------- |\n| データ1 | データ2 | データ3 |\n| データA | データB | データC |\n\n---\n\n### リンクと画像\n- リンク: [OpenAI](https://www.openai.com)\n- 画像: ![サンプル画像](https://via.placeholder.com/150)\n",
      "[\"Markdown\", \"テスト\", \"フォーマット\"]",
      0,
      "Wed, 13 Nov 2024 10:36:52 GMT",
      1,
      "test"
    ],
    [
      15,
      "ここからは自分次第",
      "# 自分を変えたければフォースに従え\n## フォースとは何か",
      "[\"tag1\", \"tag2\"]",
      0,
      "Wed, 13 Nov 2024 09:56:24 GMT",
      1,
      "user1"
    ],
    [
      13,
      "題名",
      "# これはテスト用のデータです",
      "[\"tag10\"]",
      0,
      "Wed, 13 Nov 2024 07:51:56 GMT",
      13,
      "user112"
    ],
    [
      12,
      "test",
      "test detail",
      "[\"tag2\", \"tag3\"]",
      5,
      "Tue, 22 Oct 2024 12:34:25 GMT",
      11,
      "test"
    ],
    [
      11,
      "Example Card",
      "This is a detailed description of the card.",
      "[\"tag1\", \"tag2\", \"tag3\"]",
      0,
      "Thu, 26 Sep 2024 14:42:53 GMT",
      1,
      "user1"
    ],
    [
      1,
      "Card 1",
      "Detail of card 1",
      "[\"tag1\", \"tag2\"]",
      1,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      1,
      "user1"
    ],
    [
      2,
      "Card 2",
      "Detail of card 2",
      "[\"tag1\", \"tag3\"]",
      2,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      2,
      "user2"
    ],
    [
      3,
      "Card 3",
      "Detail of card 3",
      "[\"tag2\", \"tag4\"]",
      10,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      3,
      "user3"
    ],
    [
      4,
      "Card 4",
      "Detail of card 4",
      "[\"tag5\"]",
      4,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      4,
      "user4"
    ],
    [
      5,
      "Card 5",
      "Detail of card 5",
      "[\"tag2\", \"tag6\"]",
      3,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      5,
      "user5"
    ],
    [
      6,
      "Card 6",
      "Detail of card 6",
      "[\"tag3\", \"tag7\"]",
      2,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      6,
      "user6"
    ],
    [
      7,
      "Card 7",
      "Detail of card 7",
      "[\"tag4\", \"tag8\"]",
      7,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      7,
      "user7"
    ],
    [
      8,
      "Card 8",
      "\n# テストタイトル\n## マークダウン記法\n* スパ茶\n    * スパ\n\n#### これはMarkdownのテストデータです。\n- 項目1\n- 項目2\n- 項目3\n",
      "[\"tag5\", \"tag9\"]",
      41,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      8,
      "test"
    ],
    [
      9,
      "Card 9",
      "Detail of card 9",
      "[\"tag1\", \"tag7\"]",
      0,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      9,
      "user9"
    ],
    [
      10,
      "Card 10",
      "Detail of card 10",
      "[\"tag2\", \"tag8\"]",
      1,
      "Sun, 22 Sep 2024 14:10:54 GMT",
      10,
      "user10"
    ]
  ]

  const { name, id } = UseFetchName();
  const [cnt, setCnt] = useState<number>(0);
  const [sm, setSm] = useState("");

  useEffect(() => {
    const fetchCnt = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mypage?id=${id}&name=${name}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.log('投稿件数がうまく読み取れません');
          return;
        }

        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          setCnt(data[0]);
          setSm(data[1]);
        }
      } catch (error) {
        console.log("エラーが発生");
      }
    };
    fetchCnt();
  }, [id, name]);

  return (
    <>
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8 border border-black/10">
        <div className="p-4 text-center">
          {/* 丸いアイコン（ユーザーアイコン） */}
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>

          {/* ID - 太字に変更 */}
          <p className="text-gray-600 font-bold">@{name}</p>

          {/* 線を引く */}
          <hr className="my-4" />

          {/* 投稿数、フォロー数、フォロワー数 - フォローを中央に配置 */}
          <div className="flex justify-center text-center space-x-12">
            {/* フォローを中央に、等間隔に並べる */}
            <div>
              <p className="text-lg font-bold">{cnt}</p>
              <p className="text-gray-600 text-sm">投稿数</p>
            </div>
            <div>
              <p className="text-lg font-bold">{sm}</p>
              <p className="text-gray-600 text-sm">合計いいね数</p>
            </div>
          </div>

          {/* プロフィール編集ボタン */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              プロフィールを編集
            </button>
          </div>
        </div>
      </div>
      <Mycard data={data} name={name} />
    </>
  );
}

export default Mypage;
