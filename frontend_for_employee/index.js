// index.js
document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Foundry ile deploy ettiğiniz kontratın adresini buraya ekleyin.
        const abi = [
          {
            "type": "function",
            "name": "createProduct",
            "inputs": [
              {
                "name": "_locationInfo",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "_productionDate",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "_expirationDate",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "deleteProduct",
            "inputs": [
              {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "delivered",
            "inputs": [
              {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "inWarehouse",
            "inputs": [
              {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "_newLocation",
                "type": "string",
                "internalType": "string"
              }
            ],
            "outputs": [],
            "stateMutability": "nonpayable"
          },
          {
            "type": "function",
            "name": "products",
            "inputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "locationInfo",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "productionDate",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "backupProductionDate",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "expirationDate",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "state",
                "type": "uint8",
                "internalType": "enum SupplyChain.State"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "function",
            "name": "updateProduct",
            "inputs": [
              {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "_newLocationInfo",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "_newProductionDate",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "_newExpirationDate",
                "type": "uint256",
                "internalType": "uint256"
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
            "type": "function",
            "name": "viewProductInfo",
            "inputs": [
              {
                "name": "_productId",
                "type": "uint256",
                "internalType": "uint256"
              }
            ],
            "outputs": [
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "",
                "type": "uint8",
                "internalType": "enum SupplyChain.State"
              }
            ],
            "stateMutability": "view"
          },
          {
            "type": "event",
            "name": "ProductCreated",
            "inputs": [
              {
                "name": "productId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
              },
              {
                "name": "locationInfo",
                "type": "string",
                "indexed": false,
                "internalType": "string"
              },
              {
                "name": "productionDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "backupProductionDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "expirationDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
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
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
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
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
              },
              {
                "name": "locationInfo",
                "type": "string",
                "indexed": false,
                "internalType": "string"
              },
              {
                "name": "productionDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "backupProductionDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "expirationDate",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
              },
              {
                "name": "state",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum SupplyChain.State"
              }
            ],
            "anonymous": false
          }
        ]
        ; // Kontratın ABI'sini buraya ekleyin.
        const contract = new ethers.Contract(contractAddress, abi, signer);
                
        document.getElementById('createProductForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const locationInfo = document.getElementById('locationInfo').value;
            const productionDate = new Date(document.getElementById('productionDate').value).getTime() / 1000;
            const expirationDate = new Date(document.getElementById('expirationDate').value).getTime() / 1000;

            await contract.createProduct(locationInfo, productionDate, expirationDate);
            alert('Product Created!');
        });

        document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const productId = document.getElementById('productId').value;
            const newLocationInfo = document.getElementById('newLocationInfo').value;
            const newProductionDate = new Date(document.getElementById('newProductionDate').value).getTime() / 1000;
            const newExpirationDate = new Date(document.getElementById('newExpirationDate').value).getTime() / 1000;
            const newState = document.getElementById('newState').value;

            await contract.updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState);
            alert('Product Updated!');
        });

        document.getElementById('viewProductForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const productId = document.getElementById('viewProductId').value;

            const product = await contract.viewProductInfo(productId);
            document.getElementById('productInfo').innerHTML = `
                <p>ID: ${product[0]}</p>
                <p>Location Info: ${product[1]}</p>
                <p>Production Date: ${new Date(product[2] * 1000).toLocaleDateString()}</p>
                <p>Backup Production Date: ${new Date(product[3] * 1000).toLocaleDateString()}</p>
                <p>Expiration Date: ${new Date(product[4] * 1000).toLocaleDateString()}</p>
                <p>State: ${product[5]}</p>
            `;
        });
    } else {
        alert('Please install MetaMask to use this DApp.');
    }
});
