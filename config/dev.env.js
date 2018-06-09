'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEB_SOCKET_URL: '"ws://127.0.0.1:60000/"',
  // WEB_SOCKET_URL: '"ws://192.168.2.110:60000/"',
})
