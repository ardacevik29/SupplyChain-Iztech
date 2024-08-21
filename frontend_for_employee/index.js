import { accountAPIs } from './SimpleAccount.js'; // accountAPIs dizisini import et
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";

// Ethereum ağının RPC URL'si
const rpcUrl = "wss://ethereum-sepolia-rpc.publicnode.com";

// RPC Provider'ı oluşturun
const provider = new JsonRpcProvider(rpcUrl);

// Owner cüzdan adresleri
const ownerAddresses = {
  "0x563c859347B135aB0879DAb63F698742dfE42ce5": 0, // İlk owner cüzdan adresi
  "0xYourOwnerAddress2": 1, // İkinci owner cüzdan adresi
  // Daha fazla owner adresi ekleyebilirsiniz
};

// EntryPoint ve kontrat adresleri
const entryPointAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

// Kontrat ABI'si
const contractABI = [ {
  "inputs": [
      {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
      },
      {
          "internalType": "bytes",
          "name": "ret",
          "type": "bytes"
      }
  ],
  "type": "error",
  "name": "DelegateAndRevert"
},
{
  "inputs": [
      {
          "internalType": "uint256",
          "name": "opIndex",
          "type": "uint256"
      },
      {
          "internalType": "string",
          "name": "reason",
          "type": "string"
      }
  ],
  "type": "error",
  "name": "FailedOp"
},
{
  "inputs": [
      {
          "internalType": "uint256",
          "name": "opIndex",
          "type": "uint256"
      },
      {
          "internalType": "string",
          "name": "reason",
          "type": "string"
      },
      {
          "internalType": "bytes",
          "name": "inner",
          "type": "bytes"
      }
  ],
  "type": "error",
  "name": "FailedOpWithRevert"
},
{
  "inputs": [
      {
          "internalType": "bytes",
          "name": "returnData",
          "type": "bytes"
      }
  ],
  "type": "error",
  "name": "PostOpReverted"
},
{
  "inputs": [],
  "type": "error",
  "name": "ReentrancyGuardReentrantCall"
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "sender",
          "type": "address"
      }
  ],
  "type": "error",
  "name": "SenderAddressResult"
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "aggregator",
          "type": "address"
      }
  ],
  "type": "error",
  "name": "SignatureValidationFailed"
},
{
  "inputs": [
      {
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "sender",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "factory",
          "type": "address",
          "indexed": false
      },
      {
          "internalType": "address",
          "name": "paymaster",
          "type": "address",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "AccountDeployed",
  "anonymous": false
},
{
  "inputs": [],
  "type": "event",
  "name": "BeforeExecution",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "totalDeposit",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "Deposited",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "sender",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256",
          "indexed": false
      },
      {
          "internalType": "bytes",
          "name": "revertReason",
          "type": "bytes",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "PostOpRevertReason",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "aggregator",
          "type": "address",
          "indexed": true
      }
  ],
  "type": "event",
  "name": "SignatureAggregatorChanged",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "totalStaked",
          "type": "uint256",
          "indexed": false
      },
      {
          "internalType": "uint256",
          "name": "unstakeDelaySec",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "StakeLocked",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "withdrawTime",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "StakeUnlocked",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false
      },
      {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "StakeWithdrawn",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "sender",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "paymaster",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256",
          "indexed": false
      },
      {
          "internalType": "bool",
          "name": "success",
          "type": "bool",
          "indexed": false
      },
      {
          "internalType": "uint256",
          "name": "actualGasCost",
          "type": "uint256",
          "indexed": false
      },
      {
          "internalType": "uint256",
          "name": "actualGasUsed",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "UserOperationEvent",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "sender",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "UserOperationPrefundTooLow",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "sender",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256",
          "indexed": false
      },
      {
          "internalType": "bytes",
          "name": "revertReason",
          "type": "bytes",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "UserOperationRevertReason",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address",
          "indexed": true
      },
      {
          "internalType": "address",
          "name": "withdrawAddress",
          "type": "address",
          "indexed": false
      },
      {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256",
          "indexed": false
      }
  ],
  "type": "event",
  "name": "Withdrawn",
  "anonymous": false
},
{
  "inputs": [
      {
          "internalType": "uint32",
          "name": "unstakeDelaySec",
          "type": "uint32"
      }
  ],
  "stateMutability": "payable",
  "type": "function",
  "name": "addStake"
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "balanceOf",
  "outputs": [
      {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "target",
          "type": "address"
      },
      {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "delegateAndRevert"
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address"
      }
  ],
  "stateMutability": "payable",
  "type": "function",
  "name": "depositTo"
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "",
          "type": "address"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "deposits",
  "outputs": [
      {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
      },
      {
          "internalType": "bool",
          "name": "staked",
          "type": "bool"
      },
      {
          "internalType": "uint112",
          "name": "stake",
          "type": "uint112"
      },
      {
          "internalType": "uint32",
          "name": "unstakeDelaySec",
          "type": "uint32"
      },
      {
          "internalType": "uint48",
          "name": "withdrawTime",
          "type": "uint48"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "account",
          "type": "address"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "getDepositInfo",
  "outputs": [
      {
          "internalType": "struct IStakeManager.DepositInfo",
          "name": "info",
          "type": "tuple",
          "components": [
              {
                  "internalType": "uint256",
                  "name": "deposit",
                  "type": "uint256"
              },
              {
                  "internalType": "bool",
                  "name": "staked",
                  "type": "bool"
              },
              {
                  "internalType": "uint112",
                  "name": "stake",
                  "type": "uint112"
              },
              {
                  "internalType": "uint32",
                  "name": "unstakeDelaySec",
                  "type": "uint32"
              },
              {
                  "internalType": "uint48",
                  "name": "withdrawTime",
                  "type": "uint48"
              }
          ]
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "sender",
          "type": "address"
      },
      {
          "internalType": "uint192",
          "name": "key",
          "type": "uint192"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "getNonce",
  "outputs": [
      {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "bytes",
          "name": "initCode",
          "type": "bytes"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "getSenderAddress"
},
{
  "inputs": [
      {
          "internalType": "struct PackedUserOperation",
          "name": "userOp",
          "type": "tuple",
          "components": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "initCode",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes32",
                  "name": "accountGasLimits",
                  "type": "bytes32"
              },
              {
                  "internalType": "uint256",
                  "name": "preVerificationGas",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes32",
                  "name": "gasFees",
                  "type": "bytes32"
              },
              {
                  "internalType": "bytes",
                  "name": "paymasterAndData",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes",
                  "name": "signature",
                  "type": "bytes"
              }
          ]
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "getUserOpHash",
  "outputs": [
      {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
          "name": "opsPerAggregator",
          "type": "tuple[]",
          "components": [
              {
                  "internalType": "struct PackedUserOperation[]",
                  "name": "userOps",
                  "type": "tuple[]",
                  "components": [
                      {
                          "internalType": "address",
                          "name": "sender",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "nonce",
                          "type": "uint256"
                      },
                      {
                          "internalType": "bytes",
                          "name": "initCode",
                          "type": "bytes"
                      },
                      {
                          "internalType": "bytes",
                          "name": "callData",
                          "type": "bytes"
                      },
                      {
                          "internalType": "bytes32",
                          "name": "accountGasLimits",
                          "type": "bytes32"
                      },
                      {
                          "internalType": "uint256",
                          "name": "preVerificationGas",
                          "type": "uint256"
                      },
                      {
                          "internalType": "bytes32",
                          "name": "gasFees",
                          "type": "bytes32"
                      },
                      {
                          "internalType": "bytes",
                          "name": "paymasterAndData",
                          "type": "bytes"
                      },
                      {
                          "internalType": "bytes",
                          "name": "signature",
                          "type": "bytes"
                      }
                  ]
              },
              {
                  "internalType": "contract IAggregator",
                  "name": "aggregator",
                  "type": "address"
              },
              {
                  "internalType": "bytes",
                  "name": "signature",
                  "type": "bytes"
              }
          ]
      },
      {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "handleAggregatedOps"
},
{
  "inputs": [
      {
          "internalType": "struct PackedUserOperation[]",
          "name": "ops",
          "type": "tuple[]",
          "components": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "initCode",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes32",
                  "name": "accountGasLimits",
                  "type": "bytes32"
              },
              {
                  "internalType": "uint256",
                  "name": "preVerificationGas",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes32",
                  "name": "gasFees",
                  "type": "bytes32"
              },
              {
                  "internalType": "bytes",
                  "name": "paymasterAndData",
                  "type": "bytes"
              },
              {
                  "internalType": "bytes",
                  "name": "signature",
                  "type": "bytes"
              }
          ]
      },
      {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "handleOps"
},
{
  "inputs": [
      {
          "internalType": "uint192",
          "name": "key",
          "type": "uint192"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "incrementNonce"
},
{
  "inputs": [
      {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
      },
      {
          "internalType": "struct EntryPoint.UserOpInfo",
          "name": "opInfo",
          "type": "tuple",
          "components": [
              {
                  "internalType": "struct EntryPoint.MemoryUserOp",
                  "name": "mUserOp",
                  "type": "tuple",
                  "components": [
                      {
                          "internalType": "address",
                          "name": "sender",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "nonce",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "verificationGasLimit",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "callGasLimit",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "paymasterVerificationGasLimit",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "paymasterPostOpGasLimit",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "preVerificationGas",
                          "type": "uint256"
                      },
                      {
                          "internalType": "address",
                          "name": "paymaster",
                          "type": "address"
                      },
                      {
                          "internalType": "uint256",
                          "name": "maxFeePerGas",
                          "type": "uint256"
                      },
                      {
                          "internalType": "uint256",
                          "name": "maxPriorityFeePerGas",
                          "type": "uint256"
                      }
                  ]
              },
              {
                  "internalType": "bytes32",
                  "name": "userOpHash",
                  "type": "bytes32"
              },
              {
                  "internalType": "uint256",
                  "name": "prefund",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "contextOffset",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "preOpGas",
                  "type": "uint256"
              }
          ]
      },
      {
          "internalType": "bytes",
          "name": "context",
          "type": "bytes"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "innerHandleOp",
  "outputs": [
      {
          "internalType": "uint256",
          "name": "actualGasCost",
          "type": "uint256"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "address",
          "name": "",
          "type": "address"
      },
      {
          "internalType": "uint192",
          "name": "",
          "type": "uint192"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "nonceSequenceNumber",
  "outputs": [
      {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
      }
  ]
},
{
  "inputs": [
      {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
      }
  ],
  "stateMutability": "view",
  "type": "function",
  "name": "supportsInterface",
  "outputs": [
      {
          "internalType": "bool",
          "name": "",
          "type": "bool"
      }
  ]
},
{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "unlockStake"
},
{
  "inputs": [
      {
          "internalType": "address payable",
          "name": "withdrawAddress",
          "type": "address"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "withdrawStake"
},
{
  "inputs": [
      {
          "internalType": "address payable",
          "name": "withdrawAddress",
          "type": "address"
      },
      {
          "internalType": "uint256",
          "name": "withdrawAmount",
          "type": "uint256"
      }
  ],
  "stateMutability": "nonpayable",
  "type": "function",
  "name": "withdrawTo"
},
{
  "inputs": [],
  "stateMutability": "payable",
  "type": "receive"
}];

// Kullanıcının cüzdan adresini al ve arayüzü belirle
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  // Cüzdan adresini al
  const [userAddress] = await ethereum.request({ method: 'eth_requestAccounts' });
  console.log("Kullanicinin cüzdan adresi:", userAddress);

  if (ownerAddresses[userAddress] !== undefined) {
      // Kullanıcı owner olarak tanımlandı
      const apiIndex = ownerAddresses[userAddress];
      await initializeOwnerInterface(apiIndex, userAddress);
  } else {
      // Kullanıcı viewer olarak tanımlandı
      initializeViewerInterface(userAddress);
  }
});

async function initializeOwnerInterface(apiIndex, userAddress) {
    try {
        const accountAPI = accountAPIs[apiIndex]; // API örneğini seçiyoruz
        const supplyChainContract = new ethers.Contract(contractAddress, contractABI, accountAPI.owner);

        // UserOperation için gerekli veriler
        const userOp = {
            sender: userAddress,
            nonce: await accountAPI.getNonce(),
            callData: supplyChainContract.interface.encodeFunctionData("createProduct", [1, "Factory A", 1622548800, 1654084800]),
            callGasLimit: ethers.utils.parseUnits("200000", "wei"),
            verificationGasLimit: ethers.utils.parseUnits("100000", "wei"),
            maxFeePerGas: ethers.utils.parseUnits("50", "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
            paymasterAndData: "0x",
            initCode: "0x"
        };

        // EntryPoint üzerinden UserOperation'ı gönder
        await sendUserOperation(userOp);

    } catch (error) {
        console.error('Failed to initialize owner interface:', error);
        alert('Failed to initialize owner interface. Please check the console for details.');
    }
}

async function sendUserOperation(userOp) {
    try {
        const entryPointContract = new ethers.Contract(entryPointAddress, entryPointABI, provider);
        const tx = await entryPointContract.handleOps([userOp], { gasLimit: 1000000 });
        console.log('EntryPoint Transaction Hash:', tx.hash);
        await tx.wait();
        console.log('Operation processed successfully');
    } catch (error) {
        console.error('Failed to send user operation:', error);
        alert('Failed to send user operation. Please check the console for details.');
    }
}

function initializeViewerInterface(userAddress) {
    console.log("Viewer olarak giriş yapildi:", userAddress);

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
    console.log('Product Details:', details);
    document.getElementById("productDetails").innerText = JSON.stringify(details);
}
