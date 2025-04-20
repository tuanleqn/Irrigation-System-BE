import { DefaultDeviceId } from '~/constants/enums'
import { RelaySwitch, WaterPump } from '~/models/devices'

class DeviceService {
  async setPumpMode(deviceId: string = DefaultDeviceId.WATER_PUMP, mode: number) {
    return await WaterPump.updatePumpMode(deviceId, mode)
  }

  async getPumpState(deviceId: string = DefaultDeviceId.WATER_PUMP) {
    return await WaterPump.getPumpState(deviceId)
  }

  async getPumpMode(deviceId: string = DefaultDeviceId.WATER_PUMP) {
    return await WaterPump.getPumpMode(deviceId)
  }

  async getRelayToPump(deviceId: string = DefaultDeviceId.RELAY) {
    return await RelaySwitch.getRelayToPump(deviceId)
  }

  async updateRelayToPump(deviceId: string = DefaultDeviceId.RELAY, relayToPump: number) {
    return await RelaySwitch.updateRelayToPump(deviceId, relayToPump)
  }

  async getSoilMoistureThresholdHigh(deviceId: string = DefaultDeviceId.WATER_PUMP) {
    return await RelaySwitch.getMoistureThresholdHigh(deviceId)
  }

  async getSoilMoistureThresholdLow(deviceId: string = DefaultDeviceId.WATER_PUMP) {
    return await RelaySwitch.getMoistureThresholdLow(deviceId)
  }

  async updateSoilMoistureThresholdHigh(deviceId: string = DefaultDeviceId.WATER_PUMP, threshold: number) {
    return await RelaySwitch.updateMoistureThresholdHigh(deviceId, threshold)
  }

  async updateSoilMoistureThresholdLow(deviceId: string = DefaultDeviceId.WATER_PUMP, threshold: number) {
    return await RelaySwitch.updateMoistureThresholdLow(deviceId, threshold)
  }
}

const deviceService = new DeviceService()
export default deviceService
