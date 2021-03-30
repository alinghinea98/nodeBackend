import mongoose from 'mongoose'
import Promise from 'bluebird'

const mongo = {
  options: {
    useUnifiedTopology: true
  }
}

Object.keys(mongo.options).forEach(key => {
  if (key === 'debug' && mongo.options[key]) {
  } else {
    mongoose.set(key, mongo.options[key])
  }
})

mongoose.Promise = Promise

/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() }
}

/* istanbul ignore next */
mongoose.connection.on('error', err => {
  process.exit(-1)
})

// Fix 'DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.' - see https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true)

export default mongoose
