const ethers = require("ethers");
const contract = require("./ABI.js");
require("dotenv").config();

/**
 * @param privateKey of admin
 * */
module.exports.getSignedContract = function getSignedContract(privateKey) {
  let wallet = new ethers.Wallet(privateKey);
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_PROVIDER);
  return new ethers.Contract(
    process.env.NFT_CONTRACT,
    contract.ABI,
    wallet.connect(provider)
  );
};
