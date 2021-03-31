import { model } from './model'
import { model as sensors } from '../sensors/model'

export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const sensors = await model.find(querymen.query)
      return res.json(sensors)
    } catch (e) { console.log(e)
      next()
    }
  },
  async show ({ querymen, params }, res, next) {
    try {
      const sensors = await model.findById(params.id, querymen.query)
      return res.status(201).json(sensors)
    } catch (e) { console.log(e)
      next()
    }
  },
  async create ({ bodymen, params }, res, next) {
    try {
      const sensorsValues = await model.create(bodymen.body)
      sensors.findById(params.sensor).then(s => {
        s.values = [...s.values, sensorsValues._id]
        s.save()
      })
      return res.status(201).send(sensorsValues)
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
