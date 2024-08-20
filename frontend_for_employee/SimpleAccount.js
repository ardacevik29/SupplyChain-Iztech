import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

// Ethereum ağının RPC URL'si
const rpcUrl = "wss://ethereum-sepolia-rpc.publicnode.com";

// RPC Provider'ı oluşturun
const provider = new JsonRpcProvider(rpcUrl);

// Yazar cüzdanları (Ethereum cüzdanları)
const ownerWallets = [
    new ethers.Wallet("275cc69a6d5665957cffe57fc0ff4cfc4f4694623d296be14e9cbad09b856b32", provider),
    new ethers.Wallet("PRIVATE_KEY_2", provider),
    // Daha fazla cüzdan ekleyebilirsiniz
];

// Bundler URL'si
const bundlerUrl = "https://bundler.biconomy.io/api/v2/{11155111(0xaa36a7)}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

// SimpleAccountAPI oluşturulması
const accountAPIs = ownerWallets.map(wallet => new SimpleAccountAPI({
    provider,              // RPC Provider
    entryPointAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // ERC-4337 EntryPoint kontratının adresi
    owner: wallet,         // Yazar cüzdanı
    bundlerUrl             // Bundler URL'si
}));

// Export yaparak kullanabilirsiniz
export { accountAPIs };