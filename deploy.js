const ethers = require('ethers');
const fs = require('fs');

// Terminal colors
const colors = {
    green: text => `\x1b[32m${text}\x1b[0m`,
    yellow: text => `\x1b[33m${text}\x1b[0m`,
    red: text => `\x1b[31m${text}\x1b[0m`,
    cyan: text => `\x1b[36m${text}\x1b[0m`,
    magenta: text => `\x1b[35m${text}\x1b[0m`,
    blue: text => `\x1b[34m${text}\x1b[0m`
};

// Config
const config = {
    RPC_URL: 'https://evmrpc-testnet.0g.ai',
    CHAIN_ID: 80087,
    MAX_DEPLOYMENTS: 150,
    MIN_DELAY: 2000, // 2 seconds in ms
    MAX_DELAY: 20000 // 20 seconds in ms
};

// Get private key
const privateKey = fs.readFileSync('privatekey.txt', 'utf-8').trim();

// Contract details
const contract = {
    abi: ["function get() view returns (uint256)"],
    bytecode: '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806360fe47b11461003b5780636d4ce63c14610057575b600080fd5b610055600480360381019061005091906100c3565b610075565b005b61005f61007f565b60405161006c91906100ff565b60405180910390f35b8060008190555050565b60008054905090565b600080fd5b6000819050919050565b61009f8161008c565b81146100aa57600080fd5b50565b6000813590506100bc81610096565b92915050565b6000602082840312156100d8576100d7610087565b5b60006100e6848285016100ad565b91505092915050565b6100f88161008c565b82525050565b600060208201905061011360008301846100ef565b9291505056fe'
};

async function main() {
    console.log(colors.magenta(`Starting mass deployment (${config.MAX_DEPLOYMENTS} contracts) on 0G Galileo\n`));

    // Provider setup compatible with older Ethers versions
    const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL, {
        chainId: config.CHAIN_ID,
        name: '0g-galileo'
    });
    const wallet = new ethers.Wallet(privateKey, provider);

    // Get initial balance
    const initialBalance = await wallet.getBalance();
    console.log(colors.blue(`Initial balance: ${ethers.utils.formatEther(initialBalance)} OG`));

    for (let i = 1; i <= config.MAX_DEPLOYMENTS; i++) {
        try {
            console.log(colors.cyan(`\n[${i}/${config.MAX_DEPLOYMENTS}] Preparing deployment...`));

            const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, wallet);
            const contractInstance = await factory.deploy();
            
            console.log(colors.yellow(`Waiting for transaction confirmation...`));
            const receipt = await contractInstance.deployTransaction.wait();
            
            // Transaction details
            console.log(colors.green(`\nDeployment successful!`));
            console.log(colors.blue(`  Contract address: ${contractInstance.address}`));
            console.log(colors.blue(`  TX hash: ${receipt.transactionHash}`));
            console.log(colors.blue(`  Block: ${receipt.blockNumber}`));
            console.log(colors.blue(`  Gas used: ${receipt.gasUsed.toString()}`));

            // Current balance
            const currentBalance = await wallet.getBalance();
            console.log(colors.blue(`Remaining balance: ${ethers.utils.formatEther(currentBalance)} OG`));

            if (i < config.MAX_DEPLOYMENTS) {
                const delay = Math.floor(Math.random() * (config.MAX_DELAY - config.MIN_DELAY + 1)) + config.MIN_DELAY;
                console.log(colors.yellow(`\nWaiting ${delay/1000} seconds before next deployment...`));
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        } catch (error) {
            console.log(colors.red(`\nError: ${error.message}`));
            console.log(colors.yellow(`Retrying deployment ${i}...`));
            i--; // Retry this deployment
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    // Final report
    const finalBalance = await wallet.getBalance();
    const gasUsed = initialBalance.sub(finalBalance);
    
    console.log(colors.magenta(`\nAll deployments complete!`));
    console.log(colors.blue(`Initial balance: ${ethers.utils.formatEther(initialBalance)} OG`));
    console.log(colors.blue(`Final balance: ${ethers.utils.formatEther(finalBalance)} OG`));
    console.log(colors.blue(`Total gas used: ${ethers.utils.formatEther(gasUsed)} OG`));
}

main().catch(error => {
    console.log(colors.red(`Fatal error: ${error.message}`));
    process.exit(1);
});
