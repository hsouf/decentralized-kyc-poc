"use strict";

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
exports.mint = function (
  wallet,
  firstName,
  lastName,
  iD,
  pIN,
  aDMIN_PRIVATE_KEY
) {
  console.log(wallet);
  return new Promise(function (resolve, reject) {
    resolve();
  });
};
