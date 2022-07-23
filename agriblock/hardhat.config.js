require("@nomiclabs/hardhat-waffle");
const INFURA_URL = 'infura_url';
const PRIVATE_KEY = 'private_key';
const POCKET_ENDPOINT = 'pocket_endpoint';
module.exports = {
    solidity: "0.8.4",
    networks: {
       rinkeby: {
           url: INFURA_URL,
           accounts: [`0x${PRIVATE_KEY}`]
       }
    },
    paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
    },
};
