import { SensorData } from './sensors'

export interface ISensor {
  readData(): Promise<SensorData[]>
  updateLocation(newLocation: string): Promise<ISensor>
  delete(): Promise<void>
}

export interface IDevice {
  executeCommand(command: string, data?: any): Promise<void>
}
