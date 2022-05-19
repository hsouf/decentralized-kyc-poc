"use strict";

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
exports.verify = function (firstName, lastName, iD, pIN) {
  return new Promise(function (resolve) {
    resolve({ valid: "false" });
  });
};
