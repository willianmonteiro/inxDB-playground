export default function Hero() {
  return (
    <div className="px-4 py-16">
      <div className="relative w-full md:max-w-2xl md:mx-auto text-center">
        <h1 className="font-bold text-white text-xl sm:text-2xl md:text-5xl leading-tight mb-6">
          A simple tool for playing around with InxDB.
        </h1>

        <p className="text-gray-300 md:text-xl md:px-18">
          InxDB is an IndexedDB wrapper for handling offline database operations. It provides a simple and convenient API for working with IndexedDB, a powerful web-based database solution.
        </p>
      </div>
    </div>
  )
}