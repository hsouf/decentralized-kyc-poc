/* "use strict";

const ethers = require("ethers");
const { getSignedContract } = require("../helpers/web3");
const apiResponse = require("../helpers/apiResponse");
const { addTransaction } = require("../mintQueue/job");
require("dotenv").config();
/**
 * Mint new NFT to user
 *
 *
 * wallet String customer wallet address
 * first name String customer's first name
 * last name String customer's last name
 * iD String passport ID or national identity card
 * pIN String customer PIN code
 * aDMIN_PRIVATE_KEY String KYC issuer private key
 * no response value expected for this operation
 **/
exports.mint = async function (
  wallet,
  firstName,
  lastName,
  iD,
  pIN,
  aDMIN_PRIVATE_KEY
) {
  /*  try {
       let signer = new ethers.Wallet(aDMIN_PRIVATE_KEY);

    if (signer.address !== process.env.ADMIN) {
      return new Promise(function (resolve) {
        resolve(apiResponse.wrongAdmin);
      });
    }

    let contract = getSignedContract(aDMIN_PRIVATE_KEY);
    const abiCoder = new ethers.utils.AbiCoder();
    let encodedUserData = abiCoder.encode(
      ["address", "string"],
      [
        wallet,
        ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(firstName + lastName + iD + pIN)
        ),
      ]
    );

    const tx = await contract.mint(encodedUserData);
    const receipt = await tx.wait(); 
    return new Promise(function (resolve) {
      resolve(receipt.statuc);
    });
  } catch (e) {
    return new Promise(function (reject) {
      reject(new Error(e));
    });
  } */
};
