const V1_SCHEMA_VERSION = "1.0.0"
const V2_SCHEMA_VERSION = "2.0.0"

const versions = {
  "1.0.0": require('./v1'),
}

module.exports = (version) => versions[version]
