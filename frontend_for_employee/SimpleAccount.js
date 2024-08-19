import { SimpleAccountAPI } from "@account-abstraction/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

// Ethereum ağının RPC URL'si (örneğin, Infura, Alchemy veya kendi node'unuz)
const rpcUrl = " wss://ethereum-sepolia-rpc.publicnode.com"; 

// RPC Provider'ı oluşturun
const provider = new JsonRpcProvider(rpcUrl);

// Kullanıcı cüzdanı (Ethereum cüzdanı)
const userWallet = new ethers.Wallet("PRIVATE_KEY", provider);

// Bundler URL'si (ERC-4337 bundler hizmetini sağlamak için bir sağlayıcıdan almanız gerekir)
const bundlerUrl = "https://bundler.biconomy.io/api/v2/{chain-id-here}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; // Bundler sağlayıcınızın URL'si

// SimpleAccountAPI oluşturulması
const accountAPI = new SimpleAccountAPI({
    provider,             // RPC Provider
    entryPointAddress: "0xEntryPointAddress", // ERC-4337 EntryPoint kontratının adresi
    owner: userWallet,    // Kullanıcı cüzdanı
    bundlerUrl            // Bundler URL'si
});

// Bu API üzerinden işlemler yapılabilir.
