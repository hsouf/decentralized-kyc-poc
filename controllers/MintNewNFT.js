"use strict";

var utils = require("../utils/writer.js");
var MintNewNFT = require("../service/MintNewNFTService");
const apiResponse = require("../helpers/apiResponse");
const { addTransaction } = require("../mintQueue/job.js");

module.exports.mint = function mint(req, res, next) {
  var wallet = req.swagger.params["wallet"].value;
  var firstName = req.swagger.params["firstName"].value;
  var lastName = req.swagger.params["lastName"].value;
  var iD = req.swagger.params["ID"].value;
  var pIN = req.swagger.params["PIN"].value;
  var aDMIN_PRIVATE_KEY = req.swagger.params["ADMIN_PRIVATE_KEY"].value;
  addTransaction({
    wallet: wallet,
    firstName: firstName,
    lastName: lastName,
    iD: iD,
    pIN: pIN,
    privateKey: aDMIN_PRIVATE_KEY,
  })
    .then(function (response) {
      console.log(response);
      if (response == 1) {
        utils.writeJson(res, apiResponse.mintSuccess, 200);
      } else {
        utils.writeJson(res, response, 400);
      }
    })
    .catch(function (error) {
      utils.writeJson(res, { status: "failed", message: error.message }, 500);
    });
};
