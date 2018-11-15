module.exports = {
  [require('./v1/version')]: require('./v1'),
  [require('./v2/version')]: require('./v2')
}
