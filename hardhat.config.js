require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  networks: {
    hardhat: {}, 
    klaytn: { 
      url: "https://api.baobab.klaytn.net:8651", 
      gasPrice: 250000000000,
      accounts: [process.env.NEXT_PUBLIC_APP_PRIVATE_KEY], 
    },
  }, 
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};