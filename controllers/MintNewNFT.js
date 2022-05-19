"use strict";

var utils = require("../utils/writer.js");
var MintNewNFT = require("../service/MintNewNFTService");

module.exports.mint = function mint(req, res, next) {
  var wallet = req.swagger.params["wallet"].value;
  var firstName = req.swagger.params["firstName"].value;
  var lastName = req.swagger.params["lastName"].value;
  var iD = req.swagger.params["ID"].value;
  var pIN = req.swagger.params["PIN"].value;
  var aDMIN_PRIVATE_KEY = req.swagger.params["ADMIN_PRIVATE_KEY"].value;
  MintNewNFT.mint(wallet, firstName, lastName, iD, pIN, aDMIN_PRIVATE_KEY)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
