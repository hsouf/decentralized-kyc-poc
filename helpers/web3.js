const ethers = require("ethers");
const contract = require("./ABI.js");
require("dotenv").config();

/**
 * @param admin wallet private key
 * */
module.exports = function getAdminWallet(privateKey) {
  let wallet = new ethers.Wallet(privateKey);
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
  return wallet.connect(provider);
};

/**
 * @param admin connected wallet
 * */
module.exports = function getNFTContract(admin) {
  return new ethers.Contract(process.env.NFT_CONTRACT, contract.ABI, admin);
};
