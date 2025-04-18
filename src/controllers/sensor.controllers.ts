import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SENSOR_MESSAGES } from '~/constants/messages'
import sensorService from '~/services/sensor.services'

export const temperatureController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await sensorService.getTemperature()

  return res.json({
    message: SENSOR_MESSAGES.GET_TEMPERATURE_SUCCESS,
    result
  })
}

export const humidityController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await sensorService.getHumidity()

  return res.json({
    message: SENSOR_MESSAGES.GET_HUMIDITY_SUCCESS,
    result
  })
}

export const soilMoistureController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await sensorService.getSoilMoisture()

  return res.json({
    message: SENSOR_MESSAGES.GET_SOIL_MOISTURE_SUCCESS,
    result
  })
}

export const statisticsController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await sensorService.getStatistics()

  return res.json({
    message: SENSOR_MESSAGES.GET_STATISTICS_SUCCESS,
    result
  })
}

export const logsController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const result = await sensorService.getLogs()

  return res.json({
    message: SENSOR_MESSAGES.GET_LOGS_SUCCESS,
    result
  })
}
