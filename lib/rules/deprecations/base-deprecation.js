const BaseChecker = require('./../base-checker')
const config = require('./../../config')

class BaseDeprecation extends BaseChecker {
  constructor(reporter, ruleId, meta) {
    super(reporter, ruleId, meta)
    this.active = false
    this.deprecationVersion() // to ensure we have one.
  }

  PragmaDirective(node) {
    const pragma = node.name
    const value = node.value
    if (pragma === 'solidity') {
      this.active =
        config.compareSemVer(value.replace(/[^0-9.]/g, ''), this.deprecationVersion()) >= 0
      this.version = value
    }
  }

  deprecationVersion() {
    throw new Error('Implementations must supply a deprecation version!')
  }
}

module.exports = BaseDeprecation
