import Promise from 'bluebird'
import jwt from 'jsonwebtoken'

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) => method({ id }, 'jwtSecret', options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = token => jwtVerify(token, 'jwtSecret')
