import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { model } from './model'
export const actions = {
    async get ({ querymen }, res, next) {
        try {
            const alerts = await model.find(querymen.query)
            return res.status(201).json(alerts)
        } catch (e) {
            next()
        }
    },
    async create ({ bodymen }, res, next) {
        try {
            const alert = await model.create(bodymen.body)
            return res.status(201).json(alert)
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
