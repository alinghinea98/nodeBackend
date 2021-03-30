import Promise from 'bluebird'
import * as User from '../users/model'
import { sign } from '../../services/jwt'

const actions = {}

actions.login = ({ user }, res, next) => Promise.all([sign(user.id), (user.view(true, null, null))])
  .then(([token, userView]) => res.send({
    token,
    user: userView
  }))
  .catch(next)

actions.checkJWT = (req, res) => res.sendStatus(200)

export default actions
