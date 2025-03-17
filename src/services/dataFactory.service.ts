import dbInstance from '~/models/db'

/**
 * Interface định nghĩa các phương thức cần thiết cho các service lưu dữ liệu.
 */
export interface IDataService {
  save(payload: any): Promise<void>
}

/**
 * Service xử lý lưu dữ liệu của cảm biến (SensorData).
 */
export class SensorDataService implements IDataService {
  async save(payload: any): Promise<void> {
    try {
      await dbInstance.getClient().sensorData.create({
        data: {
          value: payload.value,
          sensorId: payload.sensorId,
          timestamp: payload.timestamp ? new Date(payload.timestamp) : undefined
        }
      })
      console.log('✅ Sensor data saved successfully.')
    } catch (error) {
      console.error('❌ Error saving sensor data:', error)
    }
  }
}

/**
 * Service xử lý lưu dữ liệu của sự kiện tưới nước (IrrigationEvent).
 */
export class IrrigationEventService implements IDataService {
  async save(payload: any): Promise<void> {
    try {
      await dbInstance.getClient().irrigationEvent.create({
        data: {
          activationMode: payload.activationMode,
          status: payload.status,
          sensorDataId: payload.sensorDataId,
          timestamp: payload.timestamp ? new Date(payload.timestamp) : undefined
        }
      })
      console.log('✅ Irrigation event saved successfully.')
    } catch (error) {
      console.error('❌ Error saving irrigation event:', error)
    }
  }
}

/**
 * Service mặc định khi không có service nào tương ứng với type nhận được.
 */
export class DefaultService implements IDataService {
  async save(payload: any): Promise<void> {
    console.warn('⚠️ No matching service found. Payload not saved:', payload)
  }
}

/**
 * Factory sử dụng để trả về service tương ứng dựa trên type.
 */
export class DataServiceFactory {
  static getService(type: string): IDataService {
    switch (type) {
      case 'SENSOR_DATA':
        return new SensorDataService()
      case 'IRRIGATION_EVENT':
        return new IrrigationEventService()
      default:
        return new DefaultService()
    }
  }
}
