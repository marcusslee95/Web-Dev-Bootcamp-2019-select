// module.exports = "Hello World";
// module.exports = getDate;
// console.log(module);
// module.exports.getDate = function() {}
exports.getDate = function() {
  const today = new Date(); //gets current date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "short"
  }
  return today.toLocaleDateString("en-US", options);

}
/*
function getDate() {
  let today = new Date(); //gets current date
  let options = {
    weekday: "long",
    day: "numeric",
    month: "short"
  }
  return today.toLocaleDateString("en-US", options);

}
*/

// module.exports.getDay = function() {}
exports.getDay = function() {
  const today = new Date(); //gets current date
  const options = {
    weekday: "long"
  }
  return today.toLocaleDateString("en-US", options);
}
/*
function getDay() {
  let today = new Date(); //gets current date
  let options = {
    weekday: "long"
  }
  return today.toLocaleDateString("en-US", options);
}
*/

console.log(module);
