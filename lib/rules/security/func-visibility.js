const semver = require('semver')
const BaseChecker = require('./../base-checker')

const ruleId = 'func-visibility'
const meta = {
  type: 'security',

  docs: {
    description: `Explicitly mark visibility in function.`,
    category: 'Security Rules',
    examples: {
      good: [
        {
          description: 'Functions explicitly marked with visibility',
          code: require('../../../test/fixtures/security/functions-with-visibility').join('\n')
        }
      ],
      bad: [
        {
          description: 'Functions without explicitly marked visibility',
          code: require('../../../test/fixtures/security/functions-without-visibility').join('\n')
        }
      ]
    }
  },

  isDefault: false,
  recommended: true,
  defaultSetup: 'warn',

  schema: null
}

class FuncVisibilityChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  PragmaDirective(node) {
    const pragma = node.name
    const value = node.value
    if (pragma === 'solidity') {
      this.past070 = semver.gte(value.replace(/[^0-9.]/g, ''), '0.7.0')
    }
  }

  FunctionDefinition(node) {
    if (node.visibility === 'default' && !(node.isConstructor && this.past070)) {
      this.warn(node, 'Explicitly mark visibility in function')
    }
  }
}

module.exports = FuncVisibilityChecker
