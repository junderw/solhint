const { contractWith } = require('./../../common/contract-builder')

module.exports = contractWith(`
                function () public payable {}
                constructor() public {}
            `)
