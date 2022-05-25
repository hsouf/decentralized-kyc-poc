"use strict";

const ethers = require("ethers");
const contract = require("../helpers/ABI.js");
require("dotenv").config();

/**
 * Check if user was issued an NFT from KYC provider
 *
 *
 * first name String customer's first name
 * last name String customer's last name
 * iD String passport ID or national identity card
 * pIN String customer PIN code
 * returns Object
 **/
exports.verify = async function (firstName, lastName, iD, pIN, tokenId) {
  try {
    let provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_PROVIDER
    );
    const nft = new ethers.Contract(
      process.env.NFT_CONTRACT,
      contract.ABI,
      provider
    );
    const isValid = await nft.verifySignature(
      tokenId,
      ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(firstName + lastName + iD + pIN)
      )
    );
    return new Promise(function (resolve) {
      resolve({ valid: isValid });
    });
  } catch (e) {
    return new Promise(function (reject) {
      reject();
    });
  }
};
