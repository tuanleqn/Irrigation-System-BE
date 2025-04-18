import { Router } from 'express'
import {
  humidityController,
  logsController,
  soilMoistureController,
  statisticsController,
  temperatureController
} from '~/controllers/sensor.controllers'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const sensorsRouter = Router()

sensorsRouter.get('/', (req, res) => {
  res.send('Hello from sensor router')
})

/**
 * @swagger
 * /sensors/data/temperature:
 *   get:
 *     summary: Get temperature data
 *     description: Retrieve temperature statistics from sensor data.
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved temperature data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GET_TEMPERATURE_SUCCESS
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: mon
 *                       temperature:
 *                         type: number
 *                         example: 21
 */
sensorsRouter.get('/data/temperature', accessTokenValidator, wrapRequestHandler(temperatureController))

/**
 * @swagger
 * /sensors/data/humidity:
 *   get:
 *     summary: Get humidity data
 *     description: Retrieve humidity statistics from sensor data.
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved humidity data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GET_HUMIDITY_SUCCESS
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: mon
 *                       humidity:
 *                         type: number
 *                         example: 5
 */
sensorsRouter.get('/data/humidity', accessTokenValidator, wrapRequestHandler(humidityController))

/**
 * @swagger
 * /sensors/data/soil_moisture:
 *   get:
 *     summary: Get soil moisture data
 *     description: Retrieve soil moisture statistics from sensor data.
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved soil moisture data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GET_SOIL_MOISTURE_SUCCESS
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: mon
 *                       soil_moisture:
 *                         type: number
 *                         example: 60
 */
sensorsRouter.get('/data/soil_moisture', accessTokenValidator, wrapRequestHandler(soilMoistureController))

/**
 * @swagger
 * /sensors/data/statistics:
 *   get:
 *     summary: Get overall sensor statistics
 *     description: Retrieve combined statistics for temperature, soil moisture, and humidity.
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved overall statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GET_STATISTICS_SUCCESS
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: mon
 *                       temperature:
 *                         type: number
 *                         example: 21
 *                       moisture:
 *                         type: number
 *                         example: 60
 *                       humidity:
 *                         type: number
 *                         example: 5
 */
sensorsRouter.get('/data/statistics', accessTokenValidator, wrapRequestHandler(statisticsController))

/**
 * @swagger
 * /sensors/data/logs:
 *   get:
 *     summary: Get sensor logs
 *     description: Retrieve logs of sensor data entries.
 *     tags: [Sensor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved sensor logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GET_LOGS_SUCCESS
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       type:
 *                         type: string
 *                         example: "Temperature"
 *                       value:
 *                         type: number
 *                         example: 22.5
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-18T14:30:00Z"
 *                       sensorId:
 *                         type: string
 *                         example: "sensor1"
 */
sensorsRouter.get('/data/logs', accessTokenValidator, wrapRequestHandler(logsController))

export default sensorsRouter
