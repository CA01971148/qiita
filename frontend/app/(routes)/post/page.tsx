'use client'
import Post from "../../components/Post";
import UseAuth from "../../_components/hooks/UseAuth";
export default function Home() {
  UseAuth()
  return (
    <div>
      <Post />
      <main>
        <h1>投稿ページです！！</h1>
      </main>
    </div>
  );
}
