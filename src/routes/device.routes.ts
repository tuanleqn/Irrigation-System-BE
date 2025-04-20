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

/**
 * @swagger
 * /devices/:
 *   get:
 *     summary: Device router root
 *     description: Returns a greeting from the device router.
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: A greeting message.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello from device router
 */
devicesRouter.get('/', (req, res) => {
  res.send('Hello from device router')
})

/**
 * @swagger
 * /devices/pump_mode:
 *   post:
 *     summary: Set Pump Mode
 *     description: Update the pump mode for a specific water pump device.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: waterpump01
 *               mode:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Pump mode updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pump mode updated successfully
 *                 result:
 *                   type: object
 */
devicesRouter.post('/pump_mode', accessTokenValidator, wrapRequestHandler(setPumpModeController))

/**
 * @swagger
 * /devices/pump_state:
 *   get:
 *     summary: Get Pump State
 *     description: Retrieves the current pump state.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the water pump device.
 *     responses:
 *       200:
 *         description: Successfully retrieved pump state.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pump state retrieved successfully
 *                 result:
 *                   type: boolean
 *                   example: true
 */
devicesRouter.get('/pump_state', accessTokenValidator, wrapRequestHandler(getPumpStateController))

/**
 * @swagger
 * /devices/pump_mode:
 *   get:
 *     summary: Get Pump Mode
 *     description: Retrieves the pump mode status.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the water pump device.
 *     responses:
 *       200:
 *         description: Successfully retrieved pump mode.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pump mode retrieved successfully
 *                 result:
 *                   type: boolean
 *                   example: true
 */
devicesRouter.get('/pump_mode', accessTokenValidator, wrapRequestHandler(getPumpModeController))

/**
 * @swagger
 * /devices/relay_to_pump:
 *   get:
 *     summary: Get Relay To Pump status
 *     description: Retrieves the status of relay-to-pump.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the relay device.
 *     responses:
 *       200:
 *         description: Successfully retrieved relay to pump status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Relay to pump status retrieved successfully
 *                 result:
 *                   type: boolean
 *                   example: true
 */
devicesRouter.get('/relay_to_pump', accessTokenValidator, wrapRequestHandler(getRelayToPumpController))

/**
 * @swagger
 * /devices/relay_to_pump:
 *   post:
 *     summary: Update Relay To Pump status
 *     description: Updates the relay-to-pump status for a specific device.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: relay01
 *               relayToPump:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Relay to pump updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Relay to pump updated successfully
 *                 result:
 *                   type: object
 */
devicesRouter.post('/relay_to_pump', accessTokenValidator, wrapRequestHandler(updateRelayToPumpController))

/**
 * @swagger
 * /devices/soil_moisture_threshold_high:
 *   get:
 *     summary: Get Soil Moisture Threshold High
 *     description: Retrieves the high soil moisture threshold value for a device.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the device.
 *     responses:
 *       200:
 *         description: Successfully retrieved soil moisture threshold high.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Soil moisture threshold high retrieved successfully
 *                 result:
 *                   type: number
 *                   example: 500
 */
devicesRouter.get(
  '/soil_moisture_threshold_high',
  accessTokenValidator,
  wrapRequestHandler(getSoilMoistureThresholdHighController)
)

/**
 * @swagger
 * /devices/soil_moisture_threshold_low:
 *   get:
 *     summary: Get Soil Moisture Threshold Low
 *     description: Retrieves the low soil moisture threshold value for a device.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the device.
 *     responses:
 *       200:
 *         description: Successfully retrieved soil moisture threshold low.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Soil moisture threshold low retrieved successfully
 *                 result:
 *                   type: number
 *                   example: 250
 */
devicesRouter.get(
  '/soil_moisture_threshold_low',
  accessTokenValidator,
  wrapRequestHandler(getSoilMoistureThresholdLowController)
)

/**
 * @swagger
 * /devices/soil_moisture_threshold_high:
 *   post:
 *     summary: Update Soil Moisture Threshold High
 *     description: Updates the high soil moisture threshold value for a device and all RelaySwitch devices.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: waterpump01
 *               threshold:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Soil moisture threshold high updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Soil moisture threshold high updated successfully
 *                 result:
 *                   type: object
 */
devicesRouter.post(
  '/soil_moisture_threshold_high',
  accessTokenValidator,
  wrapRequestHandler(updateSoilMoistureThresholdHighController)
)

/**
 * @swagger
 * /devices/soil_moisture_threshold_low:
 *   post:
 *     summary: Update Soil Moisture Threshold Low
 *     description: Updates the low soil moisture threshold value for a device and all RelaySwitch devices.
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deviceId:
 *                 type: string
 *                 example: waterpump01
 *               threshold:
 *                 type: number
 *                 example: 250
 *     responses:
 *       200:
 *         description: Soil moisture threshold low updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Soil moisture threshold low updated successfully
 *                 result:
 *                   type: object
 */
devicesRouter.post(
  '/soil_moisture_threshold_low',
  accessTokenValidator,
  wrapRequestHandler(updateSoilMoistureThresholdLowController)
)

export default devicesRouter
