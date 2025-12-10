"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import {FC, ReactNode, useMemo} from "react"


export const WalletConnectProvider: FC<{children: ReactNode}> = ({children}) => {
    const network = 'devnet'

    // Can provide custom (QUICKNODE/HELIUS) RPC endpoint
    const endpoint = useMemo(()=> clusterApiUrl(network), [network])

    const wallets = useMemo(()=>[
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter()
    ], [network])

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}