"use strict";

var utils = require("../utils/writer.js");
var VerifyCustomer = require("../service/VerifyCustomerService");
const apiResponse = require("../helpers/apiResponse");

module.exports.verify = function verify(req, res, next) {
  var firstName = req.swagger.params["firstName"].value;
  var lastName = req.swagger.params["lastName"].value;
  var iD = req.swagger.params["ID"].value;
  var pIN = req.swagger.params["PIN"].value;
  var tokenId = req.swagger.params["tokenId"].value;

  VerifyCustomer.verify(firstName, lastName, iD, pIN, tokenId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function () {
      utils.writeJson(res, apiResponse.error);
    });
};
