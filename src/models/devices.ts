import { IDevice } from './interfaces'

abstract class Device implements IDevice {
  id: string

  constructor(id: string) {
    this.id = id
  }

  abstract executeCommand(command: string, data?: any): Promise<void>
}

export class RelaySwitch extends Device {
  async executeCommand(command: string, data?: any): Promise<void> {}
}

export class WaterPump extends Device {
  async executeCommand(command: string, data?: any): Promise<void> {}
}

export class LCDDisplay extends Device {
  async executeCommand(command: string, data?: any): Promise<void> {}
}
