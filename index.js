const versions = require('./versions')
const getContent = require('ssb-msg-content')

const isRoot = (msg) => {
  const content = getContent(msg)
  return version !== undefined && version.isRoot(msg)
}

const isRitual = (msg) => {
  const content = getContent(msg)
  const version = versions[content.message]
  return version !== undefined && version.isRitual(msg)
}

const isShard = (msg) => {
  const content = getContent(msg)
  const version = versions[content.message]
  return version !== undefined && version.isShard(msg)
}

// %%TODO%% Refactor into a fn that returns the correct fn

module.exports = {
  isShard,
  isRoot,
  isRitual
}
