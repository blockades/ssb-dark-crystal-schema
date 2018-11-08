
const getContent = require('ssb-msg-content')

module.exports = {
  v1: require('./v1'),
  v2: require('./v2'),
  isRoot: function (root) {
    if (getContent(root).version === '1.0.0') {
      return require('./v1/root/sync/isRoot')(root)
    } else return require('./v2/root/sync/isRoot')(root)
  }
}
