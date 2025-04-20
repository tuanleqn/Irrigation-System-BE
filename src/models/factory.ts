import { DefaultSensorId, DeviceType, SensorType, Topic } from '~/constants/enums'
import { Humidity, SensorData, SoilMoistureSensor, Temperature } from './sensors'
import { IDevice } from './interfaces'
import { LCDDisplay, RelaySwitch, WaterPump } from './devices'

export class DeviceFactory {
  static async createDevice(type: DeviceType, id: string): Promise<IDevice> {
    switch (type) {
      case DeviceType.RELAY:
        return RelaySwitch.create(id, type)
      case DeviceType.WATER_PUMP:
        return WaterPump.create(id, type)
      case DeviceType.LCD:
        return LCDDisplay.create(id, type)
      default:
        throw new Error(`Unknown device type: ${type}`)
    }
  }
}

export class SensorFactory {
  static async createSensor(
    type: SensorType,
    location: string = 'Unknown'
  ): Promise<SoilMoistureSensor | Temperature | Humidity> {
    switch (type) {
      case SensorType.SOIL_MOISTURE:
        return await SoilMoistureSensor.create(type, location)
      case SensorType.TEMPERATURE:
        return await Temperature.create(type, location)
      case SensorType.HUMIDITY:
        return await Humidity.create(type, location)
      default:
        throw new Error(`Unknown sensor type: ${type}`)
    }
  }

  static async createSensorData(type: Topic, value: number, sensorId?: string): Promise<SensorData> {
    switch (type) {
      case Topic.Temperature:
        return await SensorData.create(type, value, sensorId || DefaultSensorId.TEMPERATURE)
      case Topic.SoilMoisture:
        return await SensorData.create(type, value, sensorId || DefaultSensorId.SOIL_MOISTURE)
      case Topic.Humidity:
        return await SensorData.create(type, value, sensorId || DefaultSensorId.HUMIDITY)
      default:
        throw new Error(`Unknown sensor type: ${type}`)
    }
  }
}
