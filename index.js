const { currentVersion, versions }= require('./versions')
const getContent = require('ssb-msg-content')

const getValidator = (fn) => {
  return (msg) => {
    const content = getContent(msg)
    const version = versions[content.message]
    return version !== undefined && version[fn](msg)
  }
}

const validators = ['isRoot', 'isRitual', 'isShard'].reduce((obj, fn) => {
  obj[fn] = getValidator(fn)
  return obj
}, {})

module.exports = {
  ...validators,
  SCHEMA_VERSION: currentVersion()
}
