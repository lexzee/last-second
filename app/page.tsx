import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex col">
      <Navbar />
      <div className="grow flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-6xl font-black mb-6 tracking-tighter text-red-500 animate-pulse">
          23:59:59
        </h2>
        <p className="text-gray-400 max-w-md mb-8">
          The timer is running. If it hits zero, the last person to pay resets
          the win pot.
        </p>

        {/* Game Controls go here */}
        <div className="p-6 border border-gray-800 rounded-xl bg-gray-900">
          <p className="text-sm">Connect your wallet to play</p>
        </div>
      </div>
    </main>
  );
}
