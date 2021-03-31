import { model } from './model'

export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const sensors = await model.find(querymen.query).populate('values', '_id value createdAt', 'sensorsValues')
        .exec()
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
  async create ({ bodymen }, res, next) {
    try {
      const sensor = await model.create(bodymen.body)
      return res.status(201).send(sensor)
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
