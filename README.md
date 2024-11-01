# Sign-In-With-Ethereum-Smart-Contract-Implemetation

It's basically utilizing solidity to define the logic of creating, hashing and verifying the message to facilitate secure login. Implemented using hardhat, vite, solidity, tailwindcss and the rainbowkit library for the connect wallet button functionality.

## Clone & Run locally

- To clone the repo:

```
git clone https://github.com/peter-mwau/Sign-In-With-Ethereum-Smart-Contract-Implemetation.git
```

- Install dependancies

```
npm install
```

- If you wish to deploy the smart contract again to create your own instance:

```
npx hardhat run scripts/deploy.js --network <NETWOTK NAME>
```

- Replace `<NETWOTK NAME>` with the name of the network you wish to deploy to. This should be set in your hardhat config file.

- Run tests:

```
npx hardhat test
```

- Verify smart contract:

```
npx hardhat verify <CONTRACT ADDRESS> --network <NETWOTK NAME>
```

- Create a .env file at the root of your projects and add the contract address there:

```
VITE_APP_CONTRACT_ADDRESS=<CONTRACT ADDRESS>
```

- If you don't wish to deploy your own smart contract instance, you can just sjip the steps above. Just ensure you have Metamask extension installed in your browser(Firefox, Chrome, Safari, Brave, etc).

- Add sepolia testnet network. Its an Ethereum testnet.

If you don't have eth or gas fees for your account, copy account address from metamask, visit this site and faucet for test ether:

```
https://cloud.google.com/application/web3/faucet/ethereum/sepolia
```

- Also ensure to copy the private key of your metamask account and paste it in your .env file

```
VITE_APP_PRIVATE_KEY=<PRIVATE KEY>
```

## Run the project

- Run the following command to start the project:

```
npm run dev
```

- You can access the site on your browser though:

```
http://127.0.0.1:5173
```

- You can do your tests, add more functionalities and so on.

### **`Happy Building Buddy!`**
