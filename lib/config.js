const _ = require('lodash')

module.exports = {
  compareSemVer(a, b) {
    const pa = a.split('.')
    const pb = b.split('.')
    for (let i = 0; i < 3; i++) {
      const na = Number(pa[i])
      const nb = Number(pb[i])
      if (na > nb) return 1
      if (nb > na) return -1
      /* eslint-disable no-restricted-globals */
      if (!isNaN(na) && isNaN(nb)) return 1
      if (isNaN(na) && !isNaN(nb)) return -1
      /* eslint-enable no-restricted-globals */
    }
    return 0
  },

  from(configVals) {
    return _.assign({ rules: {} }, configVals, this)
  },

  getNumberByPath(path, defaultValue) {
    const configVal = _.get(this, path)
    return _.isNumber(configVal) && configVal > 0 ? configVal : defaultValue
  },

  getBooleanByPath(path, defaultValue) {
    const configVal = _.get(this, path)
    return _.isBoolean(configVal) ? configVal : defaultValue
  },

  getStringByPath(path, defaultValue) {
    const configVal = _.get(this, path)
    return _.isString(configVal) ? configVal : defaultValue
  },

  getNumber(ruleName, defaultValue) {
    return this.getNumberByPath(`rules["${ruleName}"][1]`, defaultValue)
  },

  getObjectPropertyNumber(ruleName, ruleProperty, defaultValue) {
    return this.getNumberByPath(`rules["${ruleName}"][1][${ruleProperty}]`, defaultValue)
  },

  getObjectPropertyBoolean(ruleName, ruleProperty, defaultValue) {
    return this.getBooleanByPath(`rules["${ruleName}"][1][${ruleProperty}]`, defaultValue)
  },

  getString(ruleName, defaultValue) {
    return this.getStringByPath(`rules["${ruleName}"][1]`, defaultValue)
  }
}
