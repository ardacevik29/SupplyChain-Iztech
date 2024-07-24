document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.ethereum !== 'undefined') {
      try {
          await ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = '0x8a6573F660c5afdF29FC4087040b0C3DD0355cd2'; // Foundry ile deploy ettiğiniz kontrat adresi
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
              "name": "ProductDeleted",
              "inputs": [
                {
                  "name": "productId",
                  "type": "uint256",
                  "indexed": true,
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
          ];

          const contract = new ethers.Contract(contractAddress, abi, signer);

          // Create Product
          document.getElementById('createProductForm').addEventListener('submit', async (event) => {
              event.preventDefault();
              const locationInfo = document.getElementById('locationInfo').value;
              const productionDate = Math.floor(new Date(document.getElementById('productionDate').value).getTime() / 1000);
              const expirationDate = Math.floor(new Date(document.getElementById('expirationDate').value).getTime() / 1000);

              try {
                  console.log('Creating product with data:', { locationInfo, productionDate, expirationDate });
                  const tx = await contract.createProduct(locationInfo, productionDate, expirationDate);
                  await tx.wait();
                  alert('Product Created!');
              } catch (error) {
                  console.error('Error creating product:', error);
                  alert('Error creating product: ' + error.message);
              }
          });

          // Update Product
          document.getElementById('updateProductForm').addEventListener('submit', async (event) => {
              event.preventDefault();
              const productId = document.getElementById('productId').value;
              const newLocationInfo = document.getElementById('newLocationInfo').value;
              const newProductionDate = Math.floor(new Date(document.getElementById('newProductionDate').value).getTime() / 1000);
              const newExpirationDate = Math.floor(new Date(document.getElementById('newExpirationDate').value).getTime() / 1000);
              const newState = parseInt(document.getElementById('newState').value);

              try {
                  console.log('Updating product with data:', { productId, newLocationInfo, newProductionDate, newExpirationDate, newState });
                  const tx = await contract.updateProduct(productId, newLocationInfo, newProductionDate, newExpirationDate, newState);
                  await tx.wait();
                  alert('Product Updated!');
              } catch (error) {
                  console.error('Error updating product:', error);
                  alert('Error updating product: ' + error.message);
              }
          });

          // View Product
          document.getElementById('viewProductForm').addEventListener('submit', async (event) => {
              event.preventDefault();
              const productId = document.getElementById('viewProductId').value;

              try {
                  console.log('Viewing product with ID:', productId);
                  const product = await contract.viewProductInfo(productId);
                  document.getElementById('productInfo').innerHTML = `
                      <p>ID: ${product[0]}</p>
                      <p>Location Info: ${product[1]}</p>
                      <p>Production Date: ${new Date(product[2] * 1000).toLocaleDateString()}</p>
                      <p>Backup Production Date: ${new Date(product[3] * 1000).toLocaleDateString()}</p>
                      <p>Expiration Date: ${new Date(product[4] * 1000).toLocaleDateString()}</p>
                      <p>State: ${product[5]}</p>
                  `;
              } catch (error) {
                  console.error('Error viewing product:', error);
                  alert('Error viewing product: ' + error.message);
              }
          });

          // Delete Product
          document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
              event.preventDefault();
              const productId = document.getElementById('deleteProductId').value;

              try {
                  console.log('Deleting product with ID:', productId);
                  const tx = await contract.deleteProduct(productId);
                  await tx.wait();
                  alert('Product Deleted!');
              } catch (error) {
                  console.error('Error deleting product:', error);
                  alert('Error deleting product: ' + error.message);
              }
          });

      } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          alert('Error connecting to MetaMask: ' + error.message);
      }
  } else {
      alert('Please install MetaMask to use this DApp.');
  }
});
