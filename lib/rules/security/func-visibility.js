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

  schema: {
    type: 'object',
    properties: {
      ignoreConstructors: {
        type: 'boolean'
      }
    }
  }
}

class FuncVisibilityChecker extends BaseChecker {
  constructor(reporter, config) {
    super(reporter, ruleId, meta)

    this.ignoreConstructors =
      config && config.getObjectPropertyBoolean(ruleId, 'ignoreConstructors', false)
  }

  FunctionDefinition(node) {
    if (node.isConstructor && this.ignoreConstructors) {
      return
    }

    if (node.visibility === 'default') {
      this.warn(node, 'Explicitly mark visibility in function')
    }
  }
}

module.exports = FuncVisibilityChecker
