import Collections from "./collections";

export default function DatabaseContent() { 

  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-purple-800 px-4 py-2 flex justify-between">
        <h2 className="text-lg font-bold text-white">Database</h2>
      </div>
      <div className="px-4 py-6 relative">  
        <Collections />
      </div>
    </div>
  )
}