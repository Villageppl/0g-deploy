const ethers = require('ethers');
const fs = require('fs');

// ===== CONFIGURATION =====
const CONFIG = {
  RPC_URL: 'https://evmrpc-testnet.0g.ai',
  CHAIN_ID: 80087,
  
  // Phase 1
  CONTRACT_DEPLOYMENTS: 120,
  DELAY_MS: { MIN: 2000, MAX: 20000 },
  
  // Phase 2
  MAX_TOKENS: 10,
  RECIPIENTS: 20,
  TOKEN_SUPPLY: { MIN: 100000, MAX: 1000000 }
};

// ===== RANDOM NAME GENERATORS =====
const generateTokenName = () => {
  const prefixes = [
    'Galileo', 'Cosmic', 'Stellar', 'Nebula', 'Orbital', 'Quantum', 
    'ZeroG', 'Astro', 'Lunar', 'Solar', 'Photon', 'Pulsar', 
    'DarkMatter', 'Singularity', 'Hyper', 'Interstellar', 'Infinity',
    'Celestial', 'Void', 'Eclipse', 'Nova', 'Supernova', 'Andromeda'
  ];
  
  const suffixes = [
    'Token', 'Coin', 'Dollar', 'Credit', 'Fuel', 'Gem', 'Crystal',
    'Particle', 'Wave', 'Bit', 'Byte', 'Protocol', 'Network',
    'Credit', 'Share', 'Note', 'Bond', 'Trust', 'Vault'
  ];
  
  const special = [
    'Warp Drive', 'Black Hole', 'Event Horizon', 'Cosmic Dust',
    'Space Time', 'Dark Energy', 'The Final Frontier'
  ];
  
  // 20% chance for special name
  if (Math.random() < 0.2) {
    return special[Math.floor(Math.random() * special.length)];
  }
  
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
};

const generateTokenSymbol = (name) => {
  // For special names with multiple words
  if (name.includes(' ')) {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  }
  
  // Standard 3-4 letter symbols
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let symbol = '';
  const length = Math.random() > 0.7 ? 4 : 3; // 30% chance for 4-letter symbol
  
  for (let i = 0; i < length; i++) {
    symbol += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  return symbol;
};

// ===== UTILITIES =====
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const formatBalance = (balance) => parseFloat(ethers.utils.formatEther(balance)).toFixed(18);

async function getTxDetails(provider, txHash) {
  const tx = await provider.getTransaction(txHash);
  const receipt = await provider.getTransactionReceipt(txHash);
  const block = await provider.getBlock(receipt.blockNumber);
  return {
    address: receipt.contractAddress,
    hash: txHash,
    block: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
    timestamp: new Date(block.timestamp * 1000).toISOString()
  };
}

// ===== DEPLOYMENT =====
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(CONFIG.RPC_URL, {
    chainId: CONFIG.CHAIN_ID,
    name: '0g-galileo'
  });
  
  const privateKey = fs.readFileSync('privatekey.txt', 'utf-8').trim();
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get initial balance
  let balance = await wallet.getBalance();
  console.log(`\nStarting mass deployment (${CONFIG.CONTRACT_DEPLOYMENTS} contracts) on 0G Galileo\n`);
  console.log(`Initial balance: ${formatBalance(balance)} OG\n`);

  // ===== PHASE 1 =====
  for (let i = 1; i <= CONFIG.CONTRACT_DEPLOYMENTS; i++) {
    try {
      console.log(`[${i}/${CONFIG.CONTRACT_DEPLOYMENTS}] Preparing deployment...`);
      console.log(`Waiting for transaction confirmation...\n`);
      
      const factory = new ethers.ContractFactory([], '0x', wallet);
      const tx = await factory.deploy();
      const receipt = await tx.deployTransaction.wait();
      
      const details = await getTxDetails(provider, tx.deployTransaction.hash);
      balance = await wallet.getBalance();
      
      console.log(`Deployment successful!`);
      console.log(`  Contract address: ${details.address}`);
      console.log(`  TX hash: ${details.hash}`);
      console.log(`  Block: ${details.block}`);
      console.log(`  Gas used: ${details.gasUsed}`);
      console.log(`  Timestamp: ${details.timestamp}`);
      console.log(`Remaining balance: ${formatBalance(balance)} OG`);
      
      if (i < CONFIG.CONTRACT_DEPLOYMENTS) {
        const waitTime = randomInRange(CONFIG.DELAY_MS.MIN, CONFIG.DELAY_MS.MAX) / 1000;
        console.log(`\nWaiting ${waitTime} seconds before next deployment...\n`);
        await delay(waitTime * 1000);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      i--; // Retry
      await delay(5000);
    }
  }

  // ===== PHASE 2 =====
  console.log('\n=== PHASE 2: TOKEN DEPLOYMENT ===');
  const tokenCount = randomInRange(1, CONFIG.MAX_TOKENS);
  const recipients = Array(CONFIG.RECIPIENTS)
    .fill()
    .map(() => ethers.Wallet.createRandom().address);

  for (let i = 1; i <= tokenCount; i++) {
    try {
      const name = generateTokenName();
      const symbol = generateTokenSymbol(name);
      const supply = ethers.utils.parseUnits(
        randomInRange(CONFIG.TOKEN_SUPPLY.MIN, CONFIG.TOKEN_SUPPLY.MAX).toString(),
        18
      );
      
      console.log(`\n[${i}/${tokenCount}] Deploying ${name} (${symbol})`);
      
      const factory = new ethers.ContractFactory([], '0x', wallet);
      const token = await factory.deploy(name, symbol, supply);
      const receipt = await token.deployTransaction.wait();
      
      const details = await getTxDetails(provider, token.deployTransaction.hash);
      console.log(`Token deployed: ${details.address}`);
      
      const amount = supply.div(recipients.length);
      console.log(`Distributing ${ethers.utils.formatUnits(amount)} ${symbol} to ${CONFIG.RECIPIENTS} addresses`);
      
      for (const addr of recipients) {
        const tx = await token.transfer(addr, amount);
        await tx.wait();
        console.log(`  Sent to ${addr.slice(0, 8)}... (TX: ${tx.hash})`);
        await delay(1000);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      i--; // Retry
      await delay(5000);
    }
  }

  console.log('\n✅ All deployments completed!');
}

main().catch(console.error);
