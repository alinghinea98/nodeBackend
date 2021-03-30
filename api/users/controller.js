import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { model } from './model'
export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const users = await model.find(querymen.query)
      return res.status(201).json(users)
    } catch (e) {
      next()
    }
  },
  async create ({ bodymen }, res, next) {
    try {
      const password = await bcrypt.hash(bodymen.body.password, 4).catch(next)
      const obj = { ...(bodymen.body), createdAt: _.now(), password }
      const user = await model.create(obj)
      return res.status(201).json(user)
    } catch (e) {
      next()
    }
  },
  delete ({ params }, res, next) {
    try {
      model.delete({ params })
      return res.status(201).json({ status: 'done' })
    } catch (e) {
      next()
    }
  }
}
