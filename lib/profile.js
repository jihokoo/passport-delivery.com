/**
 * Parse delivery.com object.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */

exports.parse = function(json){

  if('string' == typeof json) json = JSON.parse(json);

  var deliveryDotCom = {};

  deliveryDotCom.id = json.data.user.id;
  deliveryDotCom.username = json.data.user.username;
  deliveryDotCom.displayName = json.data.user.display_name;

  if(json.data.balance) deliveryDotCom.balance = json.data.balance;
  if(json.data.user.email) deliveryDotCom.email = json.data.user.email;
  if(json.data.user.phone) deliveryDotCom.phone = json.data.user.phone;

  return deliveryDotCom;
}