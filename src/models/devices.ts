import { IDevice } from './interfaces'
import dbInstance from './db'
import axios from 'axios'
import { DefaultConfigId, DefaultDeviceId, DefaultMemberId, DeviceType, FeedKey } from '~/constants/enums'

export class Config {
  protected id: string
  protected parameter_name: string
  protected parameter_value: string
  protected description: string
  protected member_id: string
  protected device_id: string

  private constructor(
    id: string,
    parameter_name: string,
    parameter_value: string,
    description: string,
    member_id: string,
    device_id: string
  ) {
    this.id = id
    this.parameter_name = parameter_name
    this.parameter_value = parameter_value
    this.description = description
    this.member_id = member_id
    this.device_id = device_id
  }

  public async updatePumpMode(): Promise<void> {
    try {
      await dbInstance.getClient().configuration.update({
        where: {
          id: DefaultConfigId.PUMP_MODE
        },
        data: {
          parameterName: this.parameter_name,
          parameterValue: this.parameter_value,
          description: this.description,
          memberId: this.member_id,
          deviceId: this.device_id
        }
      })
    } catch (error) {
      console.error('Error updating config:', error)
      throw error
    }
  }

  public async updateRelayToPump(): Promise<void> {
    try {
      await dbInstance.getClient().configuration.update({
        where: {
          id: DefaultConfigId.RELAY_TO_PUMP
        },
        data: {
          parameterName: this.parameter_name,
          parameterValue: this.parameter_value,
          description: this.description,
          memberId: this.member_id,
          deviceId: this.device_id
        }
      })
    } catch (error) {
      console.error('Error updating config:', error)
      throw error
    }
  }

  public async updateMoistureThresholdHigh(): Promise<void> {
    try {
      await dbInstance.getClient().configuration.update({
        where: {
          id: DefaultConfigId.MOISTURE_THRESHOLD_HIGH
        },
        data: {
          parameterName: this.parameter_name,
          parameterValue: this.parameter_value,
          description: this.description,
          memberId: this.member_id,
          deviceId: this.device_id
        }
      })
    } catch (error) {
      console.error('Error updating config:', error)
      throw error
    }
  }

  public async updateMoistureThresholdLow(): Promise<void> {
    try {
      await dbInstance.getClient().configuration.update({
        where: {
          id: DefaultConfigId.MOISTURE_THRESHOLD_LOW
        },
        data: {
          parameterName: this.parameter_name,
          parameterValue: this.parameter_value,
          description: this.description,
          memberId: this.member_id,
          deviceId: this.device_id
        }
      })
    } catch (error) {
      console.error('Error updating config:', error)
      throw error
    }
  }

  public static async create(
    parameterName: string,
    parameterValue: string,
    description: string,
    memberId: string,
    deviceId: string
  ): Promise<Config> {
    try {
      const config = await dbInstance.getClient().configuration.create({
        data: {
          parameterName,
          parameterValue,
          description,
          deviceId,
          memberId
        }
      })
      return new Config(
        config.id,
        config.parameterName,
        config.parameterValue,
        config.description || '',
        config.memberId || '',
        config.deviceId || ''
      )
    } catch (error) {
      console.error('Error creating config:', error)
      throw error
    }
  }
}

abstract class Device implements IDevice {
  protected id: string
  protected type: string

  protected constructor(id: string, type: string) {
    this.id = id
    this.type = type
  }

  abstract executeCommand(command: string, data?: any): Promise<void>
}

export class RelaySwitch extends Device {
  protected relayToPump: boolean
  protected moisture_threshold_high: number
  protected moisture_threshold_low: number

  private constructor(
    id: string,
    type: string,
    relayToPump: boolean = false,
    moisture_threshold_high: number,
    moisture_threshold_low: number
  ) {
    super(id, type)
    this.relayToPump = relayToPump
    this.moisture_threshold_high = moisture_threshold_high
    this.moisture_threshold_low = moisture_threshold_low
  }

  public static async create(
    id: string,
    type: string,
    relayToPump: boolean = false,
    moisture_threshold_high: number = 0,
    moisture_threshold_low: number = 0
  ): Promise<RelaySwitch> {
    try {
      const relaySwitch = await dbInstance.getClient().device.create({
        data: {
          id,
          type,
          relayToPump,
          moistureThresholdHigh: moisture_threshold_high,
          moistureThresholdLow: moisture_threshold_low
        }
      })
      return new RelaySwitch(
        relaySwitch.id,
        relaySwitch.type,
        relaySwitch.relayToPump || false,
        relaySwitch.moistureThresholdHigh || 0,
        relaySwitch.moistureThresholdLow || 0
      )
    } catch (error) {
      console.error('Error creating relay switch:', error)
      throw error
    }
  }

  public static async getRelayToPump(id: string): Promise<boolean> {
    try {
      const relayToPump = await dbInstance.getClient().device.findUnique({
        where: {
          id
        },
        select: {
          relayToPump: true
        }
      })
      if (!relayToPump) {
        throw new Error('Relay to pump not found')
      }
      return relayToPump.relayToPump || false
    } catch (error) {
      console.error('Error getting relay to pump:', error)
      throw error
    }
  }

  public static async getMoistureThresholdHigh(id: string): Promise<number> {
    try {
      const moistureThresholdHigh = await dbInstance.getClient().configuration.findUnique({
        where: {
          id: DefaultConfigId.MOISTURE_THRESHOLD_HIGH
        },
        select: {
          parameterName: true,
          parameterValue: true
        }
      })
      if (!moistureThresholdHigh) {
        throw new Error('Moisture threshold high not found')
      }
      return moistureThresholdHigh.parameterValue ? parseInt(moistureThresholdHigh.parameterValue) : 0
    } catch (error) {
      console.error('Error getting moisture threshold high:', error)
      throw error
    }
  }

  public static async getMoistureThresholdLow(id: string): Promise<number> {
    try {
      const moistureThresholdLow = await dbInstance.getClient().configuration.findUnique({
        where: {
          id: DefaultConfigId.MOISTURE_THRESHOLD_LOW
        },
        select: {
          parameterName: true,
          parameterValue: true
        }
      })
      if (!moistureThresholdLow) {
        throw new Error('Moisture threshold low not found')
      }
      return moistureThresholdLow.parameterValue ? parseInt(moistureThresholdLow.parameterValue) : 0
    } catch (error) {
      console.error('Error getting moisture threshold low:', error)
      throw error
    }
  }

  public static async updateRelayToPump(id: string, relayToPump: number): Promise<void> {
    try {
      console.log(
        'Adafruit update response:',
        (
          await axios.post(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/${FeedKey.RelayToPump}/data`,
            {
              value: relayToPump == 1 ? '1' : '0'
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': process.env.ADAFRUIT_IO_KEY as string
              }
            }
          )
        ).data
      )

      console.log(
        'Config created:',
        (
          await Config.create(FeedKey.RelayToPump, relayToPump.toString(), 'Relay to Pump', DefaultMemberId.USER, id)
        ).updateRelayToPump()
      )

      console.log(
        'Updating relay to pump:',
        await dbInstance.getClient().device.updateMany({
          where: {
            type: DeviceType.RELAY
          },
          data: {
            relayToPump: relayToPump == 1 ? true : false
          }
        })
      )
    } catch (error) {
      console.error('Error updating relay to pump:', error)
      throw error
    }
  }

  public static async updateMoistureThresholdHigh(id: string, threshold: number): Promise<void> {
    try {
      console.log(
        'Adafruit update response:',
        (
          await axios.post(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/${FeedKey.MoistureThresholdHigh}/data`,
            {
              value: threshold.toString()
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': process.env.ADAFRUIT_IO_KEY as string
              }
            }
          )
        ).data
      )

      console.log(
        'Config created:',
        (
          await Config.create(
            FeedKey.MoistureThresholdHigh,
            threshold.toString(),
            'Moisture Threshold High',
            DefaultMemberId.ADMIN,
            id
          )
        ).updateMoistureThresholdHigh()
      )

      console.log(
        'Updating moisture threshold high for all RelaySwitch devices:',
        await dbInstance.getClient().device.updateMany({
          where: { type: DeviceType.RELAY },
          data: { moistureThresholdHigh: threshold * 1 }
        })
      )
    } catch (error) {
      console.error('Error updating moisture threshold high:', error)
      throw error
    }
  }

  public static async updateMoistureThresholdLow(id: string, threshold: number): Promise<void> {
    try {
      console.log(
        'Adafruit update response:',
        (
          await axios.post(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/${FeedKey.MoistureThresholdLow}/data`,
            {
              value: threshold.toString()
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': process.env.ADAFRUIT_IO_KEY as string
              }
            }
          )
        ).data
      )

      console.log(
        'Config created:',
        (
          await Config.create(
            FeedKey.MoistureThresholdLow,
            threshold.toString(),
            'Moisture Threshold Low',
            DefaultMemberId.ADMIN,
            id
          )
        ).updateMoistureThresholdLow()
      )

      console.log(
        'Updating moisture threshold low for all RelaySwitch devices:',
        await dbInstance.getClient().device.updateMany({
          where: { type: DeviceType.RELAY },
          data: { moistureThresholdLow: threshold * 1 }
        })
      )
    } catch (error) {
      console.error('Error updating moisture threshold low:', error)
      throw error
    }
  }

  async executeCommand(command: string, data?: any): Promise<void> {}
}

export class WaterPump extends Device {
  protected pump_mode: boolean
  protected pump_state: boolean

  private constructor(id: string, type: string, pump_mode: boolean = false, pump_state: boolean = false) {
    super(id, type)
    this.pump_mode = pump_mode
    this.pump_state = pump_state
  }

  public static async create(
    id: string,
    type: string,
    pump_mode: boolean = false,
    pump_state: boolean = false
  ): Promise<WaterPump> {
    try {
      const waterPump = await dbInstance.getClient().device.create({
        data: {
          id,
          type,
          pumpMode: pump_mode,
          pumpState: pump_state
        }
      })
      return new WaterPump(waterPump.id, waterPump.type, waterPump.pumpMode || false, waterPump.pumpState || false)
    } catch (error) {
      console.error('Error creating water pump:', error)
      throw error
    }
  }

  public static async updatePumpMode(id: string, mode: number): Promise<void> {
    try {
      console.log(
        'Adafruit update response:',
        (
          await axios.post(
            `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/${FeedKey.PumpMode}/data`,
            {
              value: mode == 1 ? '1' : '0'
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-AIO-Key': process.env.ADAFRUIT_IO_KEY as string
              }
            }
          )
        ).data
      )

      console.log(
        'Config created:',
        (await Config.create(FeedKey.PumpMode, mode.toString(), 'Pump Mode', DefaultMemberId.USER, id)).updatePumpMode()
      )

      console.log(
        'Updating pump mode:',
        await dbInstance.getClient().device.updateMany({
          where: {
            type: DeviceType.WATER_PUMP
          },
          data: {
            pumpMode: mode == 1 ? true : false
          }
        })
      )
    } catch (error) {
      console.error('Error updating pump mode:', error)
      throw error
    }
  }

  public static async getPumpState(id: string): Promise<boolean> {
    try {
      const pump_state = await axios.get(
        `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/${FeedKey.PumpState}/data`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': process.env.ADAFRUIT_IO_KEY as string
          }
        }
      )
      console.log('Adafruit update response:', pump_state.data)

      await dbInstance.getClient().device.updateMany({
        where: {
          type: DeviceType.WATER_PUMP
        },
        data: {
          pumpState: pump_state.data[0].value === '1' ? true : false
        }
      })

      return pump_state.data[0].value === '1' ? true : false
    } catch (error) {
      console.error('Error getting pump state:', error)
      throw error
    }
  }

  public static async getPumpMode(id: string): Promise<boolean> {
    try {
      const pumpMode = await dbInstance.getClient().device.findUnique({
        where: {
          id
        },
        select: {
          pumpMode: true
        }
      })
      if (!pumpMode) {
        throw new Error('Pump mode not found')
      }
      return pumpMode.pumpMode || false
    } catch (error) {
      console.error('Error getting pump mode:', error)
      throw error
    }
  }

  async executeCommand(command: string, data?: any): Promise<void> {}
}

export class LCDDisplay extends Device {
  protected display_message: string

  private constructor(id: string, type: string, display_message: string = '') {
    super(id, type)
    this.display_message = display_message
  }

  public static async create(id: string, type: string, display_message: string = ''): Promise<LCDDisplay> {
    return new LCDDisplay(id, type, display_message)
  }

  async executeCommand(command: string, data?: any): Promise<void> {}
}
