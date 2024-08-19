import { ethers } from 'ethers';
import { UserOperation, BundlerProvider } from '@account-abstraction/sdk';

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const entryPointAddress = '0xYourEntryPointContractAddress'; // ERC-4337 Entry Point kontrat adresi
            const entryPointAbi = [ /* ERC-4337 Entry Point ABI */ ];
            const entryPointContract = new ethers.Contract(entryPointAddress, entryPointAbi, signer);

            const bundlerProvider = new BundlerProvider('https://bundler.example.com', provider);

            // İşlem hazırlığı
            const userOp = new UserOperation({
                sender: '0xYourUserAccountAddress',
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
