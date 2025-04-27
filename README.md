
```markdown
# 0G Galileo Mass Deployer 🚀

![GitHub](https://img.shields.io/badge/chain-0G_Galileo-blue)
![GitHub](https://img.shields.io/badge/testnet-80087-green)
![GitHub](https://img.shields.io/badge/ethers.js-v5-orange)
![GitHub](https://img.shields.io/badge/license-MIT-brightgreen)

Advanced deployment system for 0G Galileo testnet featuring two-phase deployment with intelligent token generation and distribution.

## 🌌 Features

### Phase 1: Bulk Contract Deployment
- **Precision Deployment Engine**
  - Deploys exactly 120 smart contracts
  - Configurable delay between deployments (2-20 seconds)
  - Automatic retry mechanism with exponential backoff

- **Real-time Deployment Telemetry**
  ```plaintext
  Contract address: 0x372E122434dC442F872cEec389694f7457F9B8E3
  TX hash: 0x35e7db59686285062bf93f915e10230ba011ce037ba92c48e97003da157dd254
  Block: 664226
  Gas used: 124849
  Timestamp: 2023-05-15T14:32:18.000Z
  Remaining balance: 0.066483034417934553 OG
  ```

### Phase 2: Token Factory System (NEW!)
- **Intelligent Token Generation**
  - Creates 1-10 unique ERC-20 tokens per run
  - 50+ scientifically-themed name components
  - Context-aware symbol generation (3-4 character codes)
  - Special multi-word names (20% occurrence rate)

- **Advanced Distribution Network**
  - Fair distribution to 20 recipient addresses
  - Dynamic supply allocation (100k-1M tokens)
  - Transaction throttling (1s between transfers)

## 🧑‍💻 Installation Guide

### Prerequisites
- Node.js v16+
- npm/yarn
- Testnet OG tokens for gas fees

### Setup
```bash
# Clone repository
git clone https://github.com/Villageppl/0g-deploy.git
cd 0g-deploy

# Install dependencies
npm install ethers

# Configure environment
echo "YOUR_PRIVATE_KEY" > privatekey.txt
```

## ⚙️ Configuration Matrix

| Parameter               | Default Value       | Description                          |
|-------------------------|---------------------|--------------------------------------|
| `CONTRACT_DEPLOYMENTS`  | 120                 | Number of contracts to deploy        |
| `DELAY_MS.MIN`          | 2000 (2s)           | Minimum delay between deployments    |
| `DELAY_MS.MAX`          | 20000 (20s)         | Maximum delay between deployments    |
| `MAX_TOKENS`            | 10                  | Maximum tokens to create (1-10)      |
| `RECIPIENTS`            | 20                  | Addresses per token distribution    
