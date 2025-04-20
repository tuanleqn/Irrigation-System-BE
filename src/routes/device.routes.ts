import { Router } from 'express'
import {
  getPumpModeController,
  getPumpStateController,
  getRelayToPumpController,
  getSoilMoistureThresholdHighController,
  getSoilMoistureThresholdLowController,
  setPumpModeController,
  updateRelayToPumpController,
  updateSoilMoistureThresholdHighController,
  updateSoilMoistureThresholdLowController
} from '~/controllers/device.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const devicesRouter = Router()

devicesRouter.get('/', (req, res) => {
  res.send('Hello from device router')
})

devicesRouter.post('/pump_mode', accessTokenValidator, wrapRequestHandler(setPumpModeController))

devicesRouter.get('/pump_state', accessTokenValidator, wrapRequestHandler(getPumpStateController))

devicesRouter.get('/pump_mode', accessTokenValidator, wrapRequestHandler(getPumpModeController))

devicesRouter.get('/relay_to_pump', accessTokenValidator, wrapRequestHandler(getRelayToPumpController))

devicesRouter.post('/relay_to_pump', accessTokenValidator, wrapRequestHandler(updateRelayToPumpController))

devicesRouter.get(
  '/soil_moisture_threshold_high',
  accessTokenValidator,
  wrapRequestHandler(getSoilMoistureThresholdHighController)
)

devicesRouter.get(
  '/soil_moisture_threshold_low',
  accessTokenValidator,
  wrapRequestHandler(getSoilMoistureThresholdLowController)
)

devicesRouter.post(
  '/soil_moisture_threshold_high',
  accessTokenValidator,
  wrapRequestHandler(updateSoilMoistureThresholdHighController)
)

devicesRouter.post(
  '/soil_moisture_threshold_low',
  accessTokenValidator,
  wrapRequestHandler(updateSoilMoistureThresholdLowController)
)

export default devicesRouter
