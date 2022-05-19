"use strict";

var utils = require("../utils/writer.js");
var VerifyCustomer = require("../service/VerifyCustomerService");

module.exports.verify = function verify(req, res, next) {
  var firstName = req.swagger.params["firstName"].value;
  var lastName = req.swagger.params["lastName"].value;
  var iD = req.swagger.params["ID"].value;
  var pIN = req.swagger.params["PIN"].value;
  VerifyCustomer.verify(firstName, lastName, iD, pIN)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
