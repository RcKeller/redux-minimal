const image = require('./image')
const javascript = require('./javascript')
const css = require('./css')
const less = require('./less')

module.exports = ({ production = false } = {}) => (
  [
    javascript({ production }),
    less(),
    css({ production }),
    image()
  ]
)
