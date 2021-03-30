import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './api'
import {errorHandler as queryErrorHandler} from 'querymen'
import {errorHandler as bodyErrorHandler} from 'bodymen'
import mongoose from './services/mongoose'

require("dotenv").config()

const index = express()
const genericErrorHandler = (err, req, res, next) => {
  if (req.querymen && req.querymen.error) {
    res.status(400).json({ error: req.querymen.error })
  } else if (req.bodymen && req.bodymen.error) {
    res.status(400).json({ error: req.bodymen.error })
  } else if (err.errors) {
    res.status(400).json({
      error: {
        valid: false,
        param: Object.keys(err.errors).join(','),
        message: err.message
      }
    })
  } else {
    res.status(400).json({ error: err.message ? err.message : `Undefined error: ${err}` })
  }
}

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true }
)

index.use(bodyParser.json())
index.use(bodyParser.urlencoded())
index.use(cors())
index.use(api)
index.use(queryErrorHandler())
index.use(bodyErrorHandler())
index.use(genericErrorHandler)
index.listen(process.env.PORT || 3000, () => {
  console.log('Server started!')
})
