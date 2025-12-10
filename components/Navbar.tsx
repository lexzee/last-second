"use client"

import dynamic from "next/dynamic"

const WalletMultiButton = dynamic(()=> import("@solana/wallet-adapter-react-ui").then((mod)=>mod.WalletMultiButton),{ssr:false})

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-900 text-white border-b border-gray-800">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
                    THE LAST SECOND
                </h1>
                <span className="text-xs text-gray-400">Devnet Mode</span>
            </div>

            {/* Solana provided button */}
            <div className="hover:scale-105 transition-transform">
                <WalletMultiButton style={{backgroundColor: '#4c1d95'}} />
            </div>
        </nav>
    )
}

export default Navbar