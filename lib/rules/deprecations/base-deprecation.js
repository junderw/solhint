const semver = require('semver')
const BaseChecker = require('./../base-checker')

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
      this.active = semver.gte(value.replace(/[^0-9.]/g, ''), this.deprecationVersion())
      this.version = value
    }
  }

  deprecationVersion() {
    throw new Error('Implementations must supply a deprecation version!')
  }
}

module.exports = BaseDeprecation
