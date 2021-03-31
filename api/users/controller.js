import _ from 'lodash'
import bcrypt from 'bcryptjs'
import {model} from './model'

export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const users = await model.find(querymen.query)
      console.log(users)
      return res.status(201).json(users)
    } catch (e) {
      console.log(e)
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
  async update ({ bodymen, params }, res, next) {
    try {
      const body = _.pickBy(bodymen.body, (v) => v !== undefined)
      await model.updateOne({ username: params.username }, body, { useFindAndModify: false })
      const user = await model.findOne({ username: params.username })
      return res.status(201).json(user)
    } catch (e) {
      console.log(e)
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
