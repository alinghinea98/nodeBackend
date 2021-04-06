import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { model } from './model'

export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const alerts = await model.find(querymen.query).populate([{ path: 'userId', model: 'users' }])
        .exec()
      return res.status(200).json(alerts)
    } catch (e) {
      console.log(e)
      next()
    }
  },
  async create ({ bodymen }, res, next) {
    try {
      const alert = await model.create(bodymen.body)
      return res.status(201).json(alert)
    } catch (e) {
      console.log(e)
      next()
    }
  },
  async update ({ bodymen, params }, res, next) {
    try {
      const body = _.pickBy(bodymen.body, (v) => v !== undefined)
      await model.updateOne({ _id: params.id }, body, { useFindAndModify: false })
      const user = await model.findOne({ _id: params.id }).populate([{ path: 'userId', model: 'users' }])
        .exec()
      return res.status(201).json(user)
    } catch (e) {
      console.log(e)
      console.log(e)
      next()
    }
  },
  delete ({ params }, res, next) {
    try {
      model.delete({ params })
      return res.status(201).json({ status: 'done' })
    } catch (e) {
      console.log(e)
      next()
    }
  }
}
