# 0G Galileo Contract Deployer 🚀

![GitHub last commit](https://img.shields.io/github/last-commit/Villageppl/0g-deploy)
![GitHub repo size](https://img.shields.io/github/repo-size/Villageppl/0g-deploy)

Automated mass deployment script for the 0G Galileo testnet with randomized delays between transactions.

## Features ✨

- ⚡ **Mass Deployment**: Deploys up to 150 contracts in sequence
- ⏱️ **Randomized Delays**: 2-20 second intervals between deployments
- 📊 **Transaction Analytics**: Detailed gas usage and deployment stats
- 🔄 **Auto-Retry**: Automatic retry mechanism for failed deployments
- 🔒 **Secure**: Private key handling with gitignore protection

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
```

## Configuration ⚙️

1. Create `privatekey.txt` in the project root:
   ```bash
   echo "YOUR_PRIVATE_KEY_HERE" > privatekey.txt
   ```

2. Adjust deployment settings in `deploy.js`:
   ```javascript
   const config = {
     RPC_URL: 'https://evmrpc-testnet.0g.ai', // 0G Galileo RPC endpoint
     CHAIN_ID: 80087,                         // 0G Galileo chain ID
     MAX_DEPLOYMENTS: 150,                    // Number of contracts to deploy
     MIN_DELAY: 2000,                         // Minimum delay in ms (2 seconds)
     MAX_DELAY: 20000                         // Maximum delay in ms (20 seconds)
   };
   ```

## Usage 🚀

```bash
node deploy.js
```

### Sample Output
```
🚀 Starting mass deployment (150 contracts) on 0G Galileo

📜 [1/150] Deploying contract...
✅ Contract deployed at: 0x123...abc
⏱️ Waiting 7 seconds before next deployment...
```

## Security 🔐

- Private keys are excluded via `.gitignore`
- Never commit sensitive information
- For production use, consider:
  ```javascript
  // Alternative: Use environment variables
  const privateKey = process.env.PRIVATE_KEY;
  ```

## Troubleshooting 🛠️

| Error | Solution |
|-------|----------|
| `insufficient funds` | Get testnet OG tokens from faucet |
| `invalid private key` | Verify privatekey.txt formatting |
| `connection refused` | Check RPC_URL in config |

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

MIT License - See [LICENSE](LICENSE) for details

---

> **Note**: This project is for testing purposes only. Use at your own risk.
