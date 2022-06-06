const { mintQueue } = require("./queue");
const retryCount = 5;

const addTransaction = async (payload) => {
  const job = await mintQueue
    .createJob(payload)
    .backoff("fixed", 1000)
    .retries(retryCount)
    .save();

  job.on("retrying", (err) => {
    console.log(
      `Retrying ${job.id} because of the following error ${err.message}`
    );
  });
  return new Promise((resolve, reject) => {
    job.on("succeeded", (result) => {
      console.log(`Job ${job.id} succeded`);
      resolve(result);
    });

    job.on("failed", (err) => {
      console.log(
        `Job ${job.id} failed with the following error ${err.message}`
      );
      reject(new Error(e));
    });
  });
};
module.exports.addTransaction = addTransaction;
