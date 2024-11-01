require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/d98a6a61469e4475a63a021993327473",
      accounts: ["a4f78f954851797945f50c7d934b1e27175405acba4c1394eb0d852bf67d92bd"],
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./src/artifacts",
  },
  etherscan: {
    apiKey: "5FJ86MHI6IX84TBISKSTE6M3JNRS2MDN41"
  }
};
