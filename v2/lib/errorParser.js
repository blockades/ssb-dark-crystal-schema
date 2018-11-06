module.exports = function errorParser (obj) {
  var errors = obj.errors || []
  return errors.map(e => `${e.field}: ${e.message}`)
}
