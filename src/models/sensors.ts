import { Topic } from '~/constants/enums'
import dbInstance from './db'
import { ISensor } from './interfaces'

export class SensorData {
  private id: string
  private type: string
  private value: number
  private timestamp: Date
  private sensorId: string

  private constructor(id: string, type: string, value: number, timestamp: Date, sensorId: string) {
    this.id = id
    this.type = type
    this.value = value
    this.timestamp = timestamp
    this.sensorId = sensorId

    console.log('SensorData created:', {
      id: this.id,
      type: this.type,
      value: this.value,
      timestamp: this.timestamp,
      sensorId: this.sensorId
    })
  }

  public static async create(type: string, value: number, sensorId: string): Promise<SensorData> {
    try {
      const sensorDataRecord = await dbInstance.getClient().sensorData.create({
        data: { type, value, sensorId }
      })
      return new SensorData(sensorDataRecord.id, type, value, sensorDataRecord.timestamp, sensorId)
    } catch (error) {
      console.error('Error creating SensorData:', error)
      throw error
    }
  }

  public static async readSensorData(sensorId: string): Promise<SensorData[]> {
    try {
      const sensorDataRecords = await dbInstance.getClient().sensorData.findMany({
        where: { sensorId },
        orderBy: { timestamp: 'desc' }
      })
      return sensorDataRecords.map(
        (record) => new SensorData(record.id, record.type, record.value, record.timestamp, sensorId)
      )
    } catch (error) {
      console.error('Error reading SensorData:', error)
      throw error
    }
  }

  public async delete(): Promise<void> {
    try {
      const deletedData = await dbInstance.getClient().sensorData.delete({
        where: { id: this.id }
      })
      console.log(`SensorData ${this.id} deleted:`, deletedData)
    } catch (error) {
      console.error(`Error deleting SensorData ${this.id}:`, error)
      throw error
    }
  }

  public static async getStatistics(): Promise<
    { day: string; temperature: number; moisture: number; humidity: number }[]
  > {
    try {
      const [temperatureStats, soilMoistureStats, humidityStats] = await Promise.all([
        Temperature.getTemperatureStatistics(),
        SoilMoistureSensor.getSoilMoistureStatistics(),
        Humidity.getHumidityStatistics()
      ])

      const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

      const stats = orderedDays.map((day) => {
        const tempStat = temperatureStats.find((s) => s.day === day)
        const soilStat = soilMoistureStats.find((s) => s.day === day)
        const humidStat = humidityStats.find((s) => s.day === day)
        return {
          day,
          temperature: tempStat ? tempStat.temperature : 0,
          moisture: soilStat ? soilStat.soil_moisture : 0,
          humidity: humidStat ? humidStat.humidity : 0
        }
      })

      return stats
    } catch (error) {
      console.error('Error fetching overall statistics:', error)
      throw error
    }
  }

  public static async getLogs(): Promise<
    {
      id: string
      type: string
      value: number
      timestamp: string
      sensorId: string
    }[]
  > {
    try {
      const sensorDataRecords = await dbInstance.getClient().sensorData.findMany({
        orderBy: { timestamp: 'desc' }
      })
      return sensorDataRecords.map((record) => ({
        id: record.id,
        type: record.type,
        value: record.value,
        timestamp: record.timestamp.toLocaleDateString('vi-VN', {
          second: '2-digit',
          minute: '2-digit',
          hour: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        sensorId: record.sensorId || 'Unknown'
      }))
    } catch (error) {
      console.error('Error fetching logs:', error)
      throw error
    }
  }
}

abstract class Sensor implements ISensor {
  protected id: string
  protected stype: string
  protected location: string

  protected constructor(id: string, stype: string, location: string) {
    this.id = id
    this.stype = stype
    this.location = location
  }

  public async readData(): Promise<SensorData[]> {
    return SensorData.readSensorData(this.id)
  }

  public async updateLocation(newLocation: string): Promise<Sensor> {
    try {
      const updatedSensor = await dbInstance.getClient().sensor.update({
        where: { id: this.id },
        data: { location: newLocation }
      })
      this.location = updatedSensor.location
      console.log(`Sensor ${this.id} location updated to:`, this.location)
      return this
    } catch (error) {
      console.error(`Error updating location for Sensor ${this.id}:`, error)
      throw error
    }
  }

  public async delete(): Promise<void> {
    try {
      const deletedSensor = await dbInstance.getClient().sensor.delete({
        where: { id: this.id }
      })
      console.log(`Sensor ${this.id} deleted:`, deletedSensor)
    } catch (error) {
      console.error(`Error deleting Sensor ${this.id}:`, error)
      throw error
    }
  }
}

export class SoilMoistureSensor extends Sensor {
  private constructor(id: string, stype: string, location: string) {
    super(id, stype, location)
  }

  public static async create(stype: string, location: string): Promise<SoilMoistureSensor> {
    try {
      const sensorRecord = await dbInstance.getClient().sensor.create({
        data: { type: stype, location }
      })
      return new SoilMoistureSensor(sensorRecord.id, sensorRecord.type, sensorRecord.location)
    } catch (error) {
      console.error('Error creating SoilMoistureSensor:', error)
      throw error
    }
  }

  public static async getSoilMoistureStatistics(): Promise<{ day: string; soil_moisture: number }[]> {
    try {
      const sensorDataRecords = await dbInstance.getClient().sensorData.findMany({
        where: { type: Topic.SoilMoisture },
        select: { timestamp: true, value: true }
      })

      const dayMapping: { [key: number]: string } = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat'
      }
      const grouped: { [day: string]: number[] } = {}

      for (const record of sensorDataRecords) {
        const dayName = dayMapping[record.timestamp.getDay()]
        if (!grouped[dayName]) {
          grouped[dayName] = []
        }
        grouped[dayName].push(record.value)
      }

      const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

      return orderedDays.map((day) => {
        const values = grouped[day] || []
        // Calculate average, or default to 0 if no records
        const avg = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0
        return { day, soil_moisture: avg }
      })
    } catch (error) {
      console.error('Error fetching Soil Moisture statistics:', error)
      throw error
    }
  }
}

abstract class TemperatureHumiditySensor extends Sensor {
  protected constructor(id: string, stype: string, location: string) {
    super(id, stype, location)
  }
}

export class Temperature extends TemperatureHumiditySensor {
  private constructor(id: string, stype: string, location: string) {
    super(id, stype, location)
  }

  public static async create(stype: string, location: string): Promise<Temperature> {
    try {
      const sensorRecord = await dbInstance.getClient().sensor.create({
        data: { type: stype, location }
      })
      return new Temperature(sensorRecord.id, sensorRecord.type, sensorRecord.location)
    } catch (error) {
      console.error('Error creating Temperature sensor:', error)
      throw error
    }
  }

  public static async getTemperatureStatistics(): Promise<{ day: string; temperature: number }[]> {
    try {
      const sensorDataRecords = await dbInstance.getClient().sensorData.findMany({
        where: { type: Topic.Temperature },
        select: { timestamp: true, value: true }
      })

      const dayMapping: { [key: number]: string } = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat'
      }
      const grouped: { [day: string]: number[] } = {}

      for (const record of sensorDataRecords) {
        const dayName = dayMapping[record.timestamp.getDay()]
        if (!grouped[dayName]) {
          grouped[dayName] = []
        }
        grouped[dayName].push(record.value)
      }

      const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

      return orderedDays.map((day) => {
        const values = grouped[day] || []
        // Calculate average, or default to 0 if no records
        const avg = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0
        return { day, temperature: avg }
      })
    } catch (error) {
      console.error('Error fetching Temperature statistics:', error)
      throw error
    }
  }
}

export class Humidity extends TemperatureHumiditySensor {
  private constructor(id: string, stype: string, location: string) {
    super(id, stype, location)
  }

  public static async create(stype: string, location: string): Promise<Humidity> {
    try {
      const sensorRecord = await dbInstance.getClient().sensor.create({
        data: { type: stype, location }
      })
      return new Humidity(sensorRecord.id, sensorRecord.type, sensorRecord.location)
    } catch (error) {
      console.error('Error creating Humidity sensor:', error)
      throw error
    }
  }

  public static async getHumidityStatistics(): Promise<{ day: string; humidity: number }[]> {
    try {
      const sensorDataRecords = await dbInstance.getClient().sensorData.findMany({
        where: { type: Topic.Humidity },
        select: { timestamp: true, value: true }
      })

      const dayMapping: { [key: number]: string } = {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat'
      }
      const grouped: { [day: string]: number[] } = {}

      for (const record of sensorDataRecords) {
        const dayName = dayMapping[record.timestamp.getDay()]
        if (!grouped[dayName]) {
          grouped[dayName] = []
        }
        grouped[dayName].push(record.value)
      }

      const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

      return orderedDays.map((day) => {
        const values = grouped[day] || []
        // Calculate average, or default to 0 if no records
        const avg = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0
        return { day, humidity: avg }
      })
    } catch (error) {
      console.error('Error fetching Humidity statistics:', error)
      throw error
    }
  }
}
