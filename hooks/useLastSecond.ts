import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import idl from "../public/idl.json";
import { LastSecond } from "@/types/last_second_type";
import { decodeProgramError } from "@/helpers/decodeError";

// IDL
const IDL: Idl = idl as Idl;

// PROGRAM ID:
const PROGRAM_ID = new PublicKey(IDL.address);

export const useLastSecond = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const [gameAccount, setGameAccount] = useState<PublicKey | null>(null);
  // const [gameAccount, setGameAccount] = useState<string | null>("");

  const [gameState, setGameState] = useState<{
    deadline: number;
    pot: number;
    lastBidder: string;
    isActive: boolean;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  //   Init Provider
  const provider = useMemo(() => {
    if (!wallet) return null;
    const provid = new AnchorProvider(connection, wallet, {
      preflightCommitment: "processed",
    });
    return provid;
  }, [connection, wallet]);

  //   Init Program
  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(IDL, provider);
  }, [provider]);
  // const program = new Program(IDL as LastSecond, { connection });

  //   Fetch Game Data
  const fetchGameData = async () => {
    if (!program) return;
    console.log("Fetching game state...");

    try {
      console.log("Fetching all accounts");

      // @ts-ignore
      const accounts = await program.account.gameState.all();

      if (accounts.length === 0) {
        return;
      }
      setGameAccount(accounts[0].publicKey);

      const account = accounts[0].account;

      setGameState({
        deadline: account.deadline.toNumber(),
        pot: account.potAmount.toNumber() / 1e9,
        lastBidder: account.lastBidder.toString(),
        isActive: account.gameActive,
      });
    } catch (err) {
      console.log(err);
      setGameAccount(null);
      setGameState(null);
    }
  };

  //   Auto-refresh
  useEffect(() => {
    fetchGameData();
    const interval = setInterval(fetchGameData, 1000 * 60);
    return () => clearInterval(interval);
  }, [program]);

  // Init Game
  const initializeGame = async () => {
    if (!program || !wallet) return;

    const gamePda = Keypair.generate();

    try {
      setLoading(true);
      await program.methods
        .initialize()
        .accounts({
          game: gamePda.publicKey,
          signer: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([gamePda])
        .rpc();

      await fetchGameData();
    } catch (err) {
      console.clear();
      console.error(err);
      console.log("gamePda:", gamePda.publicKey.toBase58());
      console.log("wallet:", wallet.publicKey.toBase58());
      alert("Failed to init game: " + decodeProgramError(err));
    } finally {
      setLoading(false);
    }
  };

  //   Play (Reset Timer)
  const playGame = async () => {
    if (!program || !wallet) return;

    try {
      if (!gameAccount) {
        console.log("Game account not found!");
        return;
      }
      setLoading(true);
      await program.methods
        .play()
        .accounts({
          game: gameAccount,
          isSigner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      await fetchGameData();
    } catch (err) {
      console.error(err);
      alert("Transaction failed! Did you reject it?");
    } finally {
      setLoading(false);
    }
  };

  // Claim Prize
  const claimPrize = async () => {
    if (!program || !wallet) return;

    try {
      if (!gameAccount) {
        console.log("Game account not found!");
        return;
      }
      setLoading(true);
      await program.methods
        .claim()
        .accounts({
          game: gameAccount,
          winner: wallet.publicKey,
        })
        .rpc();
      setGameAccount(null);
      setGameState(null);
      await fetchGameData();
    } catch (err) {
      console.error(err);
      alert("Transaction failed! Did you reject it?");
    } finally {
      setLoading(false);
    }
  };

  return {
    gameState,
    loading,
    initializeGame,
    playGame,
    wallet,
    claimPrize,
  };
};
