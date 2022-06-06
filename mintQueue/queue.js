const Queue = require("bee-queue");
var utils = require("../utils/writer.js");

const ethers = require("ethers");
const { getSignedContract } = require("../helpers/web3");
const apiResponse = require("../helpers/apiResponse");
const { addTransaction } = require("../mintQueue/job");
require("dotenv").config();
const options = {
  removeOnSuccess: true,
  activateDelayedJobs: true,
  /* redis: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
  }, */
};

const mintQueue = new Queue("mint", options);

mintQueue.process(async (job) => {
  console.log(
    ` Mint order number ${job.id} is being broadcasted to the network`
  );

  try {
    let signer = new ethers.Wallet(job.data.privateKey);

    if (signer.address !== process.env.ADMIN) {
      return new Promise(function (resolve) {
        resolve(apiResponse.wrongAdmin);
      });
    }

    let contract = getSignedContract(job.data.privateKey);
    const abiCoder = new ethers.utils.AbiCoder();
    let encodedUserData = abiCoder.encode(
      ["address", "string"],
      [
        job.data.wallet,
        ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(
            job.data.firstName + job.data.lastName + job.data.iD + job.data.pIN
          )
        ),
      ]
    );

    const tx = await contract.mint(encodedUserData);
    const receipt = await tx.wait();

    return new Promise(function (resolve) {
      resolve(receipt.status);
    });
  } catch (e) {
    console.log(e);
    return new Promise(function (reject) {
      reject(new Error(e));
    });
  }
});

module.exports.mintQueue = mintQueue;
