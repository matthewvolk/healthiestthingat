/**
 * Filter an array of objects by iterating over a single key in the object
 * @param {keyFunction} keyFn Returns the value of key for which to search for duplicates
 * @param {Object[]} array Array of objects (with the same schema) to be filtered
 * @returns {Object[]} Filtered array of objects
 */
function removeDupeObjectsByKey(keyFn, array) {
  var mySet = new Set();
  return array.filter(function(obj) {
    var key = keyFn(obj), isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
}

/**
 * Returns a value for a specified key in an object
 * @callback keyFunction
 * @param {Object} obj Object containing a key you want to find
 * @returns {*} Value of the key
 */

 module.exports = {
   removeDupeObjectsByKey
 }