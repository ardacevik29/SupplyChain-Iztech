import { ethers } from 'ethers';
import { UserOperation, BundlerProvider } from '@account-abstraction/sdk';
import { accountAPIs } from './simpleaccount'; // Import yaptığınız accountAPIs

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const entryPointAddress = '0x84C98E6a749727b61c3771392f569d5DDd8413BF'; // ERC-4337 Entry Point kontrat adresi
            const entryPointAbi = [ {
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
            } ];
            const entryPointContract = new ethers.Contract(entryPointAddress, entryPointAbi, signer);

            const bundlerProvider = new BundlerProvider('https://bundler.biconomy.io/api/v2/{11155111(0xaa36a7)}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44', provider);

            // Örnek UserOperation nesnesi
            const userOp = new UserOperation({
                sender: accountAPIs[0].owner.address, // İlk yazar cüzdanı
                nonce: 0, // Her işlem için doğru nonce kullanın
                callData: '0x', // İşlem verisi
                gasLimit: 21000, // Gaz limiti
                gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Gaz fiyatı
                entryPoint: entryPointContract.address
            });

            // İşlemi gönder
            const tx = await bundlerProvider.sendUserOperation(userOp);
            console.log('Transaction sent:', tx);

        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    } else {
        alert('Please install MetaMask to use this DApp.');
    }
});

