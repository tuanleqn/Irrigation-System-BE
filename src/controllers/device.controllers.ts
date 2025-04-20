import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { DEVICE_MESSAGES } from '~/constants/messages'
import deviceService from '~/services/device.service'

export const setPumpModeController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { mode, deviceId } = req.body
  const result = await deviceService.setPumpMode(deviceId, mode)
  return res.json({
    message: DEVICE_MESSAGES.SET_PUMP_MODE_SUCCESS,
    result
  })
}

export const getPumpStateController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { deviceId } = req.body
  const result = await deviceService.getPumpState(deviceId)
  return res.json({
    message: DEVICE_MESSAGES.GET_PUMP_STATE_SUCCESS,
    result
  })
}

export const getPumpModeController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { deviceId } = req.body
  const result = await deviceService.getPumpMode(deviceId)
  return res.json({
    message: DEVICE_MESSAGES.GET_PUMP_MODE_SUCCESS,
    result
  })
}

export const getRelayToPumpController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { deviceId } = req.body
  const result = await deviceService.getRelayToPump(deviceId)
  return res.json({
    message: DEVICE_MESSAGES.GET_RELAY_TO_PUMP_SUCCESS,
    result
  })
}

export const updateRelayToPumpController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { relayToPump, deviceId } = req.body
  const result = await deviceService.updateRelayToPump(deviceId, relayToPump)
  return res.json({
    message: DEVICE_MESSAGES.UPDATE_RELAY_TO_PUMP_SUCCESS,
    result
  })
}

export const getSoilMoistureThresholdHighController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  const { deviceId } = req.body
  const result = await deviceService.getSoilMoistureThresholdHigh(deviceId)
  return res.json({
    message: DEVICE_MESSAGES.GET_SOIL_MOISTURE_THRESHOLD_HIGH_SUCCESS,
    result
  })
}

export const getSoilMoistureThresholdLowController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  const { deviceId } = req.body
  const result = await deviceService.getSoilMoistureThresholdLow(deviceId)
  return res.json({
    message: DEVICE_MESSAGES.GET_SOIL_MOISTURE_THRESHOLD_LOW_SUCCESS,
    result
  })
}

export const updateSoilMoistureThresholdHighController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  const { threshold, deviceId } = req.body
  const result = await deviceService.updateSoilMoistureThresholdHigh(deviceId, threshold)
  return res.json({
    message: DEVICE_MESSAGES.UPDATE_SOIL_MOISTURE_THRESHOLD_HIGH_SUCCESS,
    result
  })
}

export const updateSoilMoistureThresholdLowController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response
) => {
  const { deviceId, threshold } = req.body
  const result = await deviceService.updateSoilMoistureThresholdLow(deviceId, threshold)
  return res.json({
    message: DEVICE_MESSAGES.UPDATE_SOIL_MOISTURE_THRESHOLD_LOW_SUCCESS,
    result
  })
}
