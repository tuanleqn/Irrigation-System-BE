import { Humidity, SensorData, SoilMoistureSensor, Temperature } from '~/models/sensors'

class SensorService {
  async getTemperature() {
    return await Temperature.getTemperatureStatistics()
  }

  async getSoilMoisture() {
    return await SoilMoistureSensor.getSoilMoistureStatistics()
  }
  async getHumidity() {
    return await Humidity.getHumidityStatistics()
  }

  async getStatistics() {
    return await SensorData.getStatistics()
  }

  async getLogs() {
    return await SensorData.getLogs()
  }
}

const sensorService = new SensorService()
export default sensorService
