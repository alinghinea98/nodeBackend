import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { model } from './model'
export const actions = {
    async get ({ querymen }, res, next) {
        try {
            const alerts = await model.find(querymen.query)
            return res.status(201).json(alerts)
        } catch (e) { console.log(e)
            next()
        }
    },
    async create ({ bodymen }, res, next) {
        try {
            const alert = await model.create(bodymen.body)
            return res.status(201).json(alert)
        } catch (e) { console.log(e)
            next()
        }
    },
    delete ({ params }, res, next) {
        try {
            model.delete({ params })
            return res.status(201).json({ status: 'done' })
        } catch (e) { console.log(e)
            next()
        }
    }
}
