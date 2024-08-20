// Importing ethers library
const { ethers } = require('ethers');

// Provider - Connecting to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider('https://127.0.0.1:8545');

// Signer - Represents the Ethereum account that will perform transactions
const signer = provider.getSigner();

// Contract ABI and address
const contractABI = [ 
  {
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

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

// Creating an instance of the contract
const supplyChainContract = new ethers.Contract(contractAddress, contractABI, signer);

// Example function to create a product
async function createProduct(productId, locationInfo, productionDate, expirationDate) {
    try {
        const tx = await supplyChainContract.createProduct(productId, locationInfo, productionDate, expirationDate);
        console.log('Transaction Hash:', tx.hash);
        await tx.wait();
        console.log('Product created successfully');
    } catch (error) {
        console.error('Failed to create product:', error);
    }
}

// Example function to get product details
async function getProduct(productId) {
    try {
        const productDetails = await supplyChainContract.getProduct(productId);
        console.log('Product Details:', productDetails);
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
}

// Function calls
createProduct(1, "Location X", 1622548800, 1654084800);
getProduct(1);

// You can add more functions for updateProduct, inWarehouse, delivered, and deleteProduct
// Additional functions for interacting with the SupplyChain contract

// Function to update a product's details
async function updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState) {
  try {
      const tx = await supplyChainContract.updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState);
      console.log('Transaction Hash:', tx.hash);
      await tx.wait();
      console.log('Product updated successfully');
  } catch (error) {
      console.error('Failed to update product:', error);
  }
}

// Function to mark a product as in warehouse
async function inWarehouse(productId, newLocation) {
  try {
      const tx = await supplyChainContract.inWarehouse(productId, newLocation);
      console.log('Transaction Hash:', tx.hash);
      await tx.wait();
      console.log('Product marked as in warehouse');
  } catch (error) {
      console.error('Failed to update warehouse status:', error);
  }
}

// Function to mark a product as delivered
async function delivered(productId) {
  try {
      const tx = await supplyChainContract.delivered(productId);
      console.log('Transaction Hash:', tx.hash);
      await tx.wait();
      console.log('Product marked as delivered');
  } catch (error) {
      console.error('Failed to mark product as delivered:', error);
  }
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
      const tx = await supplyChainContract.deleteProduct(productId);
      console.log('Transaction Hash:', tx.hash);
      await tx.wait();
      console.log('Product deleted successfully');
  } catch (error) {
      console.error('Failed to delete product:', error);
  }
}

// Example Usage of Functions
createProduct(1, "Factory A", 1622548800, 1654084800);
getProduct(1);
updateProduct(1, "Factory B", 1622548800, 1654084800, 1); // Assuming '1' represents a new state, such as InWarehouse
inWarehouse(1, "Warehouse C");
delivered(1);
deleteProduct(1);

