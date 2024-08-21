import { accountAPIs } from './SimpleAccount.js'; // accountAPIs dizisini import et
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

// Ethereum ağının RPC URL'si
const rpcUrl = "wss://ethereum-sepolia-rpc.publicnode.com";

// RPC Provider'ı oluşturun
const provider = new JsonRpcProvider(rpcUrl);

// ID numarası ile eşleştirilmiş owner cüzdanlarının indeksleri
const ownerAddresses = {
  "123456": 0, 
  "654321": 1,
  // Diğer ID'ler ve indeksler
};


// EntryPoint ve kontrat adresleri
const entryPointAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

// Kontrat ABI'si
const contractABI = [{
  "type": "function",
  "name": "createProduct",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" },
    { "name": "_locationInfo", "type": "string", "internalType": "string" },
    {
      "name": "_productionDate",
      "type": "uint32",
      "internalType": "uint32"
    },
    {
      "name": "_expirationDate",
      "type": "uint32",
      "internalType": "uint32"
    }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
},
{
  "type": "function",
  "name": "deleteProduct",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
},
{
  "type": "function",
  "name": "delivered",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
},
{
  "type": "function",
  "name": "getProduct",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" }
  ],
  "outputs": [
    { "name": "", "type": "uint32", "internalType": "uint32" },
    { "name": "", "type": "string", "internalType": "string" },
    { "name": "", "type": "uint32", "internalType": "uint32" },
    { "name": "", "type": "uint32", "internalType": "uint32" },
    {
      "name": "",
      "type": "uint8",
      "internalType": "enum SupplyChain.State"
    }
  ],
  "stateMutability": "view"
},
{
  "type": "function",
  "name": "inWarehouse",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" },
    { "name": "_newLocation", "type": "string", "internalType": "string" }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
},
{
  "type": "function",
  "name": "updateProduct",
  "inputs": [
    { "name": "_productId", "type": "uint32", "internalType": "uint32" },
    {
      "name": "_newLocationInfo",
      "type": "string",
      "internalType": "string"
    },
    {
      "name": "_newProductionDate",
      "type": "uint32",
      "internalType": "uint32"
    },
    {
      "name": "_newExpirationDate",
      "type": "uint32",
      "internalType": "uint32"
    },
    {
      "name": "_newState",
      "type": "uint8",
      "internalType": "enum SupplyChain.State"
    }
  ],
  "outputs": [],
  "stateMutability": "nonpayable"
},
{
  "type": "event",
  "name": "ProductCreated",
  "inputs": [
    {
      "name": "productId",
      "type": "uint32",
      "indexed": true,
      "internalType": "uint32"
    },
    {
      "name": "locationInfo",
      "type": "string",
      "indexed": false,
      "internalType": "string"
    },
    {
      "name": "productionDate",
      "type": "uint32",
      "indexed": false,
      "internalType": "uint32"
    },
    {
      "name": "expirationDate",
      "type": "uint32",
      "indexed": false,
      "internalType": "uint32"
    }
  ],
  "anonymous": false
},
{
  "type": "event",
  "name": "ProductDeleted",
  "inputs": [
    {
      "name": "productId",
      "type": "uint32",
      "indexed": true,
      "internalType": "uint32"
    }
  ],
  "anonymous": false
},
{
  "type": "event",
  "name": "ProductStateChanged",
  "inputs": [
    {
      "name": "productId",
      "type": "uint32",
      "indexed": true,
      "internalType": "uint32"
    },
    {
      "name": "newState",
      "type": "uint8",
      "indexed": false,
      "internalType": "enum SupplyChain.State"
    },
    {
      "name": "newLocation",
      "type": "string",
      "indexed": false,
      "internalType": "string"
    }
  ],
  "anonymous": false
},
{
  "type": "event",
  "name": "ProductUpdated",
  "inputs": [
    {
      "name": "productId",
      "type": "uint32",
      "indexed": true,
      "internalType": "uint32"
    },
    {
      "name": "locationInfo",
      "type": "string",
      "indexed": false,
      "internalType": "string"
    },
    {
      "name": "productionDate",
      "type": "uint32",
      "indexed": false,
      "internalType": "uint32"
    },
    {
      "name": "expirationDate",
      "type": "uint32",
      "indexed": false,
      "internalType": "uint32"
    },
    {
      "name": "state",
      "type": "uint8",
      "indexed": false,
      "internalType": "enum SupplyChain.State"
    }
  ],
  "anonymous": false
},
{
  "type": "error",
  "name": "ProductAlreadyExists",
  "inputs": [
    { "name": "productId", "type": "uint32", "internalType": "uint32" }
  ]
},
{
  "type": "error",
  "name": "ProductNotFound",
  "inputs": [
    { "name": "productId", "type": "uint32", "internalType": "uint32" }
  ]
}
]; 

document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const idNumber = document.getElementById("idNumber").value;
  console.log("Girilmiş ID numarası:", idNumber);  // Burada ID numarasını konsola yazdırıyoruz

  if (ownerAddresses[idNumber] !== undefined) {
      // Kullanıcı owner olarak tanımlandı
      const apiIndex = ownerAddresses[idNumber];
      await initializeOwnerInterface(apiIndex);
  } else {
      // Kullanıcı viewer olarak tanımlandı
      initializeViewerInterface();
  }
});


async function initializeOwnerInterface(apiIndex) {
    try {
        const accountAPI = accountAPIs[apiIndex]; // API örneğini seçiyoruz
        const supplyChainContract = new ethers.Contract(contractAddress, contractABI, accountAPI.owner);

        // Örnek: Ürün oluşturma fonksiyonunu çağırma
        const tx = await supplyChainContract.createProduct(1, "Factory A", 1622548800, 1654084800);
        console.log('Transaction Hash:', tx.hash);
        await tx.wait();
        console.log('Product created successfully');
    } catch (error) {
        console.error('Failed to initialize owner interface:', error);
        alert('Failed to initialize owner interface. Please check the console for details.');
    }
}

function initializeViewerInterface() {
    console.log("Viewer olarak giriş yapildi");

    document.getElementById("viewProductForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        const productId = document.getElementById("productId").value;

        try {
            const productDetails = await getProduct(productId);
            displayProductDetails(productDetails);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            alert('Failed to fetch product. Please check the console for details.');
        }
    });
}

async function getProduct(productId) {
    try {
        const supplyChainContract = new ethers.Contract(contractAddress, contractABI, provider);
        const productDetails = await supplyChainContract.getProduct(productId);
        return productDetails;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw error;
    }
}

function displayProductDetails(details) {
    // Burada ürün detaylarını ekranda gösterebilirsiniz
    console.log('Product Details:', details);
    // Örneğin, DOM'a detayları ekleyebilirsiniz
    document.getElementById("productDetails").innerText = JSON.stringify(details);
}