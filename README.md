# 0G Galileo Contract Deployer 🚀

![GitHub last commit](https://img.shields.io/github/last-commit/Villageppl/0g-deploy)
![GitHub repo size](https://img.shields.io/github/repo-size/Villageppl/0g-deploy)

Automated mass deployment script for the 0G Galileo testnet with randomized delays between transactions and advanced features like token generation and distribution.

## Features ✨

- ⚡ **Mass Deployment**: Deploys up to 150 contracts in sequence
- ⏱️ **Randomized Delays**: 2-20 second intervals between deployments
- 📊 **Transaction Analytics**: Detailed gas usage and deployment stats
- 🔄 **Auto-Retry**: Automatic retry mechanism for failed deployments
- 🔒 **Secure**: Private key handling with gitignore protection
- 💎 **Token Generation**: Create 1-10 unique ERC-20 tokens with randomized names and symbols
- 🌍 **Token Distribution**: Distribute tokens to 20 random addresses on the testnet
- 💫 **Cosmic-Themed Names**: Tokens feature 50+ cosmic-themed names and 3-4 character symbols
- 🌟 **Multi-Word Token Names**: 20% chance for tokens to have multi-word names (e.g., "Black Hole", "Warp Drive")

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Testnet OG tokens (for gas fees)

## Installation 📦

```bash
# Clone the repository
git clone https://github.com/Villageppl/0g-deploy.git
cd 0g-deploy

# Install dependencies
npm install ethers

Configuration ⚙️

1. Create privatekey.txt in the project root:

echo "YOUR_PRIVATE_KEY_HERE" > privatekey.txt


2. Adjust deployment settings in deploy.js:

const config = {
  RPC_URL: 'https://evmrpc-testnet.0g.ai', // 0G Galileo RPC endpoint
  CHAIN_ID: 80087,                         // 0G Galileo chain ID
  MAX_DEPLOYMENTS: 150,                    // Number of contracts to deploy
  MIN_DELAY: 2000,                         // Minimum delay in ms (2 seconds)
  MAX_DELAY: 20000,                        // Maximum delay in ms (20 seconds)
  MAX_TOKENS: 10,                          // Max number of ERC-20 tokens to create
  RECIPIENTS: 20,                          // Number of random addresses for token distribution
  TOKEN_SUPPLY: { MIN: 100000, MAX: 1000000 } // Random supply for token deployments
};



Usage 🚀

node deploy.js

Sample Output

🚀 Starting mass deployment (150 contracts) on 0G Galileo

📜 [1/150] Deploying contract...
✅ Contract deployed at: 0x123...abc
⏱️ Waiting 7 seconds before next deployment...

=== PHASE 2 ===
🚀 Deploying "Singularity Trust (SGT)"
Distributing 500.0 SGT to 20 addresses
  Sent to 0x5f3a1c... (TX: 0x9a2b...)

Token Generation Specs 🌌

Security 🔐

Private keys are excluded via .gitignore

Never committed to version control

For production use, consider:

// Alternative: Use environment variables
const privateKey = process.env.PRIVATE_KEY;


Troubleshooting 🛠️

Contributing 🤝

1. Fork the repository


2. Create your feature branch (git checkout -b feature/amazing-feature)


3. Commit your changes (git commit -m 'Add some amazing feature')


4. Push to the branch (git push origin feature/amazing-feature)


5. Open a Pull Request



License 📄

MIT License - See LICENSE for details


---

> Note: This project is for testing purposes only. Use at your own risk.




