var mongoose = require('mongoose')
var errmessage = 'remove function disabled for this schema'

module.exports = function (schema) {
  // disable Model.remove and document.remove
  schema.methods.remove = schema.statics.remove = function () {
    var error = new Error(errmessage)

    var args = Array.prototype.slice.call(arguments)
    var callback = args[args.length - 1]
    var isCallbackMode = typeof callback === 'function'

    if (isCallbackMode) {
      callback(error)
    } else {
      var ES6Promise = mongoose.Promise.ES6
      return new ES6Promise(function (resolve, reject) {
        reject(error)
      })
    }
  }
}
