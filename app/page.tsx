import { Game } from "@/components/Game";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* BG GRID PATTERN*/}
      <div className="absolute inset-0 bg-[linear-gradient(to_right, #80808012_1px, transparent_1px), linear-gradient(to_bottom, #80808012_1px, transparent_1px)] bg-size-[24px_24px] -z-20"></div>
      <Navbar />
      <div className="grow flex flex-col items-center justify-center p-4 md:p-10">
        <Game />
      </div>
    </main>
  );
}
