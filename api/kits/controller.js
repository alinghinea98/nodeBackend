import { model } from './model'

export const actions = {
  async get ({ querymen }, res, next) {
    try {
      const kits = await model.find(querymen.query).populate('sensorsIds', '_id name value', 'sensors')
        .exec()
      return res.status(200).json(kits)
    } catch (e) {
      console.log(e)
      console.log(e)
      next()
    }
  },
  async getOne ({ bodymen, params }, res, next) {
    try {
      const kits = await model.findOne({ _id: params.id }).populate('sensorsIds', '_id name value', 'sensors')
        .exec()
      return res.status(200).json(kits)
    } catch (e) {
      console.log(e)
      next()
    }
  },
  async show ({ querymen, params }, res, next) {
    try {
      const kits = await model.findById(params.id, querymen.query)
      return res.status(200).json(kits)
    } catch (e) {
      console.log(e)
      next()
    }
  },
  async create ({ bodymen }, res, next) {
    try {
      console.log(bodymen.body)
      const kit = await model.create(bodymen.body)
      return res.status(201).json(kit)
    } catch (e) {
      console.log(e)
      console.log(e)
      next()
    }
  },
  delete ({ params }, res, next) {
    try {
      model.delete({ params })
      return res.json({ status: 'done' })
    } catch (e) {
      console.log(e)
      next()
    }
  }
}
