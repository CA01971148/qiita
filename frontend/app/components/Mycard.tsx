
type Mycardtype = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  score: number;
  date: string;
  categoryId: number;
  user:string;
}

const Mycard = () => {
    const data:Mycardtype = {
        id: 2,
        title: "題名",
        description: "詳細",
        tags: ["HTML","CSS"],
        score: 3,
        date: "2024/11/26 10:41",
        categoryId: 2,
        user:"ユーザー"
    }
    return (
        <>
            <hr className="mt-8"/>
            <div className="ml-4 text-4xl">MyProject</div>
            <div className=" mt-8  ml-auto md:ml-12">
                <div className="overflow-x-auto flex space-x-4">
                    <div className="w-full sm:max-w-[300px] items-center bg-white shadow-md rounded-lg overflow-hidden border border-black/10 p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            {/* 丸いアイコン */}
                            <p className="text-gray-600 font-bold ml-2">@{data['user']}</p>
                            {/* ユーザーID */}
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm mb-4">
                            <p>{data['date']}</p> {/* 記事の日付 */}
                        </div>
                        <h2 className="text-xl font-semibold mb-2 hover:underline">
                            {data["title"]}
                        </h2>
                        <div className="flex flex-wrap space-x-2 mb-4">
                            {data["tags"].map((tag,index) =>(
                                <span key={index} className="bg-blue-200 text-blue-700 text-xs font-semibold px-2 py-1 mt-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                
        </>
    );
}

export default Mycard;