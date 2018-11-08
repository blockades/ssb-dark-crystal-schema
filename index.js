const getContent = require('ssb-msg-content')
const v1 = require('./v1')
const v2 = require('./v2')

const versionMap = {
  [v1.SCHEMA_VERSION]: v1,
  [v2.SCHEMA_VERSION]: v2,
}

module.exports = {
  v1,
  v2,
  isRoot: function isRoot(root) {
    const versionNumber = getContent(root).version
    const vx = versionMap[versionNumber]
    if (!!vx) {
      const ret = vx.isRoot(root)
      isRoot.errors = vx.isRoot.errors
      return [ret, versionNumber]
    } else {
      isRoot.errors = [{ field: 'data.version', message: 'not recognised' }]
      return [false, versionNumber]
    }
  }
}
