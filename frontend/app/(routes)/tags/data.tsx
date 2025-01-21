// タグ情報の型定義
export interface TagData {
  name: string;
  icon: string;
  color: string;
  description: string;
  content: JSX.Element;
}

// タグ情報の一元管理
export const tags: TagData[] = [
  {
    name: "javascript",
    icon: "FaJs",
    color: "text-yellow-500",
    description: "JavaScriptに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">JavaScriptの基本</h2>
        <p>
          JavaScriptはウェブページに動的な機能を追加するためのプログラミング言語です。
        </p>
        <p>JavaScriptは奥が深い言語ですね</p>
      </>
    ),
  },
  {
    name: "react",
    icon: "FaReact",
    color: "text-blue-500",
    description: "Reactに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Reactとは</h2>
        <p>
          Reactはユーザーインターフェースを構築するためのJavaScriptライブラリです。
        </p>
        <p>コンポーネントベースで開発できます</p>
      </>
    ),
  },
  {
    name: "webdev",
    icon: "FaGlobe",
    color: "text-green-500",
    description: "Web開発に関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Web開発全般</h2>
        <p>Web開発に関するさまざまな情報を提供します。</p>
        <p>フロントエンド、バックエンド、インフラなど</p>
      </>
    ),
  },
  {
    name: "typescript",
    icon: "FaJs",
    color: "text-blue-700",
    description: "TypeScriptに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">TypeScript</h2>
        <p>TypeScriptはJavaScriptに静的型付けを追加した言語です。</p>
        <p>大規模開発で役立ちますね</p>
      </>
    ),
  },
  {
    name: "nextjs",
    icon: "FaReact",
    color: "text-gray-900",
    description: "Next.jsに関する情報",
    content: (
      <>
        <h2 className="text-2xl font-bold mt-4 mb-2">Next.js</h2>
        <p>Next.jsはReactベースのフレームワークです。</p>
        <p>サーバーサイドレンダリングなどが容易です</p>
      </>
    ),
  },
];

export async function getTagsData(): Promise<TagData[]> {
  return tags;
}
