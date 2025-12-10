"use client";

import { useLastSecond } from "@/hooks/useLastSecond";
import { FC, useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { motion } from "framer-motion";

export const Game: FC = () => {
  const { gameState, loading, playGame, initializeGame, wallet, claimPrize } =
    useLastSecond();

  const currentAccount = wallet?.publicKey.toBase58();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading State
  if (!isClient || loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="text-xl font-mono text-primary">
          CONNECTING TO SOLANA...
        </div>
        <div className="w-64 h-2 bg-surface rounded overflow-hidden">
          <div
            className="h-full bg-primary animate-[pulse-fast_1s_infinite]"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>
    );
  }

  //   Not Init State (Admin View)
  if (!gameState && wallet) {
    return (
      <div className="glass-panel p-8 rounded-xl text-center max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-danger">
          GAME NOT STARTED
        </h2>
        <p className="text-muted mb-6">
          The contract is deployed but the first round hasn't begun.
        </p>
        <button
          className="w-full py-4 bg-primary hover:bg-violet-700 text-white font-bold rounded-lg transition-all"
          onClick={initializeGame}
        >
          INITIALIZE GAME (ADMIN)
        </button>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="text-center mt-20 text-muted">
        Please connect your wallet to load game data.
      </div>
    );
  }

  // The Countdown
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <WinnerView
          pot={gameState?.pot}
          lastBidder={gameState?.lastBidder}
          currentAccount={wallet?.publicKey.toString()}
          claimPrize={claimPrize}
        />
      );
    }

    // Panic Mode
    const isPanic = days === 0 && hours === 0;

    return (
      <div
        className={`flex flex-col items-center select-none ${
          isPanic ? "text-danger animate-pulse" : "text-white"
        }`}
      >
        <div className="leading-none text-[120px] font-black tracking-tighter tabular-nums drop-shadow-2xl">
          {hours} : {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="flex space-x-12 text-sm font-mono text-muted uppercase tracking-widest -mt-2.5">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 w-full mb-12">
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center border-l-4 border-accent">
          <span className="text-muted text-xs uppercase tracking-widest">
            Current Pot
          </span>
          <span className="text-5xl font-bold text-accent drop-shadow-lg">
            {gameState?.pot.toFixed(2)} <span className="text-lg">SOL</span>
          </span>
        </div>
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center border-r-4 border-secondary">
          <span className="text-muted text-xs uppercase tracking-widest">
            Last Bidder (King)
          </span>
          <span className="text-xl font-mono text-secondary truncate w-32 md:w-auto">
            {gameState?.lastBidder.slice(0, 4)}...
            {gameState?.lastBidder.slice(-4)}
          </span>
        </div>
      </div>

      {/* Main Timer */}
      <div className="mb-16 relative">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10"></div>

        <Countdown
          date={gameState ? gameState?.deadline * 1000 : 0}
          renderer={renderer}
          key={gameState?.deadline}
        />
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={playGame}
        className="group relative px-12 py-6 bg-white text-black font-black text-2xl uppercase tracking-wider hover:bg-accent transition-colors"
        style={{
          clipPath: "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)",
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          RESET TIMER{" "}
          <span className="bg-black text-white text-xs py-1 px-2 rounded">
            0.1 SOL
          </span>
        </span>

        {/* Button Glow */}
        <div className="absolute inset-0 bg-accent blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
      </motion.button>

      <div className="mt-8 text-muted text-sm max-w-md text-center">
        * Enter reset adds 0.1 SOL to the pot and sets the clock back to 24h.
        The last person to click takes all when it its zero.
      </div>
    </div>
  );
};

const WinnerView = ({
  pot,
  lastBidder,
  claimPrize,
  currentAccount,
}: {
  pot: number | undefined;
  lastBidder: string | undefined;
  claimPrize: () => Promise<void>;
  currentAccount: string | undefined;
}) => {
  const renderClaimButton = () => {
    if (currentAccount === lastBidder) {
      return (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={claimPrize}
          className="group relative px-12 py-6 bg-yellow-400 text-black font-black text-2xl uppercase tracking-wider hover:bg-yellow-500 transition-colors"
          style={{
            clipPath:
              "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            CLAIM PRIZE
          </span>
          {/* Button Glow */}
          <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
        </motion.button>
      );
    }
  };
  return (
    <div className="flex flex-col items-center animate-pulse">
      <h1 className="text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
        TIME EXPIRED
      </h1>
      <div className="glass-panel p-8 rounded-xl text-center border border-yellow-500/50">
        <p className="text-xl mb-2">The Winner is:</p>
        <p className="text-2xl font-mono text-yellow-400 mb-6">{lastBidder}</p>
        <p className="text-4xl font-bold">WON {pot} SOL</p>
      </div>
      {renderClaimButton()}
    </div>
  );
};
